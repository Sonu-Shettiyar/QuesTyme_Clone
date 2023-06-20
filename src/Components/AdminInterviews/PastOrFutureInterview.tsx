
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  FormLabel,
  Grid,
  Image,
  SkeletonCircle,
  SkeletonText,
  Text,
  useToast,
} from "@chakra-ui/react";
import AdminInterviewBox from "./InterviewsComponent";
import { useLocation } from "react-router-dom";
import SearchComponent from "../SearchComponents/SearchComponent";
import { useSearch } from "../../utils/SetParams";
import Pagination from "../AdminDashboard/Pagination";
import { Iinterviews } from "../../Services/AdminSideServices/GetEventsInterface";
import { GetFutureInterviewService, GetPastInterviewService } from "../../Services/UserSideServices/GetInterviewsServices";
import OneonOneEventComponent from "../OneonOneEventComponent";
import { GetRecurringListService } from "../../Services/AdminSideServices/GetEventsService";
import BatchSearch from "../SearchComponents/BatchSearch";
import { itemsPerPage ,token,id} from "../../Assets/Assets";
import { setLocale } from "yup";

const FutureOrPastInterviewsComponent = ( ) => {
  const [futureInterviews, setfutureInterviews] = useState<Iinterviews[]>([]);
  const [allData,setAllData] = useState<Iinterviews[]>([]);
  const [PaginatedInterviewsData,setPaginatedInterviewsData] = useState<Iinterviews[]>([])
  const [searchName,setSearchName] = useState("")
  const [batchName,setBatchName] = useState("")
  const [search, updateSearch] = useSearch();
  const [currentPage, setCurrentPage] = useState<any >(1);
  const [startIndex, setStartIndex] = useState<number>(1);
  const [endIndex, setEndIndex] = useState<number>();
  const [totalPages,setTotalPages] = useState(0)
  const toast = useToast();
  const location = useLocation();
const [isLoading,setIsLoading] = useState(true)



  const path = window.location.pathname;
  const segments = path.split('/');
  const InterviewsValueUrl= segments[segments.length - 1];
 
    const GetPagination =useCallback(()=>{
  if (futureInterviews) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  setStartIndex(startIndex + 1);
  setEndIndex(endIndex);
  const Paginatedinterviewsdata = futureInterviews?.slice(startIndex, endIndex);
  if (endIndex > futureInterviews.length) {
    setEndIndex(futureInterviews.length);
  } else {
    setEndIndex(endIndex);
  }
  setPaginatedInterviewsData(Paginatedinterviewsdata);
}
  },[currentPage,  futureInterviews])

  useEffect(() => {
    GetPagination()
  }, [GetPagination]);

  //function for filter data 
  useEffect(()=>{
if(searchName || batchName){
  const interviews = allData.filter((el:any) => el.title?.toLowerCase().includes(searchName?.toLowerCase()) && 
  el.batch?.toLowerCase().includes(batchName?.toLowerCase()));
    setfutureInterviews(interviews)
    setTotalPages(Math.ceil(interviews?.length/itemsPerPage));
    if(interviews.length===0){
      setStartIndex(0)
    }
  }else if(batchName==="" || searchName===""){
    setfutureInterviews(allData)
    setTotalPages(Math.ceil(futureInterviews?.length/itemsPerPage));
  }
 
},[allData,searchName,batchName,futureInterviews])
  


// get interviews data
  const GetEvents = useCallback(async () => {
    try {
        var response;
     if(InterviewsValueUrl==="upcoming-interviews"){
        response = await GetFutureInterviewService(id,token)
     }else if(InterviewsValueUrl==="past-interviews"){
        response = await GetPastInterviewService(id,token)  
     }else{
      response = await GetRecurringListService(token,id)
    
     }

     if(response.length){
      setIsLoading(false)
      setTotalPages(Math.ceil(response?.length/itemsPerPage));
        setAllData(response);
        setfutureInterviews(response)
   }else{
    setStartIndex(0)
   }
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      })
    }
  }, [toast,InterviewsValueUrl]);

  
 
  useEffect(() => {
    GetEvents();
  }, [GetEvents]);

  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    const page = params.get("page")
    const batch =params.get("batch")
    if(name){
      setSearchName(name)
      setCurrentPage(1)
    }else{
      setSearchName("")
    }
    if(page){
      setCurrentPage(page)
    }
    if(batch){
      setBatchName(batch)
      setCurrentPage(1)
    }else{
      setBatchName("")
    }
   
  },[setSearchName,currentPage, batchName,updateSearch,search,searchName,location.search])
 

   // for handling page buttn value
   const handlePageChange = (page: any) => {
    updateSearch({
      ...search,
      page: page,
    });
  };



  return (
    <div className="container">
    
      <Box
        w="80%"
        ml="10%"
        mt="130px"
        minH="200px"
        h="auto"
        p="5%"
        bg="white"
        borderRadius="10px"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
       
        <Flex justifyContent="space-between" w="100%">
          <Box w="50%" mr="10px">
          <FormLabel>Search By Title</FormLabel>
        <SearchComponent value={searchName} search={search} updateSearch={updateSearch} name="name"/>
        </Box>
        <Box w="50%">
        <FormLabel>Search By BatchName</FormLabel>
       <BatchSearch  value={batchName} search={search} updateSearch={updateSearch} name="batch" />
       </Box>
       </Flex>
       {
  isLoading ? (
    <Box>
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  ) : PaginatedInterviewsData?.length <= 0 ? (
    <Box>
      <Image
        w="40%"
        h="200px"
        ml="30%"
        src={
          "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=2000"
        }
      />
      <Text fontSize="20px" mt="20px" ml="40%">
        No Events were Found
      </Text>
    </Box>
  ) : (
    <Grid
      mt={4}
      templateColumns={{
        base: "1fr",
        md: "1fr 1fr 1fr",
        lg: "1fr 1fr 1fr",
      }}
      gap={4}
    >
      {PaginatedInterviewsData?.map((el) => (
        <Box key={el.interviewId}>
          {InterviewsValueUrl === "one-on-one-interviews" ? (
            <OneonOneEventComponent event={el} GetEvents={GetEvents} />
          ) : (
            <AdminInterviewBox event={el} GetEvents={GetEvents} />
          )}
        </Box>
      ))}
    </Grid>
  )
}

      </Box>

      <Box w="80%" ml="10%" mt="30px">
        <Box mt="20px" display="flex" justifyContent="space-between">
          <Text ml="30px">
            Showing {startIndex} to {endIndex} of {futureInterviews?.length} results
          </Text>
          <Pagination
            currentPage={currentPage}
              totalPages={totalPages}
            onChange={handlePageChange}
           
            interviewsData={futureInterviews}
            setPage={setCurrentPage}
            setPaginatedData={setPaginatedInterviewsData}
            perPage={itemsPerPage}
          />
        </Box>
      </Box>
    </div>
  );
};

export default FutureOrPastInterviewsComponent;
