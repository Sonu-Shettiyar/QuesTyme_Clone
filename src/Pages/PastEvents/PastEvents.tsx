import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  Text,
  Flex,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { interview } from "../UserDashboard/UserDashboard";
import { Link } from "react-router-dom";
import Header from "../../Components/CommonComponents/Header";
import Navbar from "../../Components/Navbar/Navbar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { convertTimeFormat } from "../../utils/index";
import { Action } from "../../Redux/PastInterviewReducer/Action";
import { Dispatch } from "redux";
import { getAllPastInterviewService } from "../../Services/UserSideServices/GetAllPastInterviewServices/GetAllPastInterviewService";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearch } from "../../utils/SetParams";
import Pagination from "../../Components/AdminDashboard/Pagination";
import { useCallback } from "react";
const PastEvents = () => {
  const interviews = useSelector(
    (state: RootState) => state.PastInterViewReducer.interviews
  );
  const dispatch: Dispatch<Action> = useDispatch();
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const userId: number = userDetails?.user?.id;
  const [search, updateSearch] = useSearch();
  const [searchName, setSearchName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [PaginatedInterviewsData, setPaginatedInterviewsData] = useState<
    interview[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItem, setFilteredItem] = useState<interview[]>([]);
  const [startIndex, setStartIndex] = useState<any>(1);
  const [endIndex, setEndIndex] = useState<number>();
  const location = useLocation();
  const token: string = userDetails.token;
  const itemsPerPage = 9;
  //for getting interview data
  useEffect(() => {
    if (interviews?.length === 0) {
      getAllPastInterviewService(userId, token)(dispatch);
      console.log("hi am useEffect");
    }
    if (interviews.length > 0 && searchTerm == "") {
      setFilteredItem(interviews);
      console.log("filtered", filteredItem);
    }
    if (searchTerm == "") {
      setFilteredItem(interviews);
    }
  }, [dispatch, interviews?.length, setFilteredItem, searchTerm]);
//for set param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    const page = params.get("page");
    if (name) {
      setSearchName(name);
      setCurrentPage(1);
    } else {
      setSearchName("");
    }
    if (page) {
      setCurrentPage(page);
    }
  }, [
    setSearchName,
    currentPage,
    updateSearch,
    search,
    searchName,
    location.search,
  ]);
//for searching 
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log("searchTerm", searchTerm);
    if (searchTerm) {
      const temp = interviews.filter((item: interview) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("temp", temp);
      temp.length > 0 && setFilteredItem(temp);
      setPaginatedInterviewsData(filteredItem);
      setTotalPages(Math.ceil(filteredItem?.length / itemsPerPage));
    }
  };
//get pagination
  const GetPagination = useCallback(() => {
    if (filteredItem) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setStartIndex(startIndex + 1);
      setEndIndex(endIndex);
      const Paginatedinterviewsdata = filteredItem?.slice(startIndex, endIndex);
      if (endIndex > filteredItem.length) {
        setEndIndex(filteredItem.length);
      } else {
        setEndIndex(endIndex);
      }
      setPaginatedInterviewsData(Paginatedinterviewsdata);
      setTotalPages(Math.ceil(filteredItem?.length / itemsPerPage));
    }
  }, [currentPage, itemsPerPage, filteredItem]);

  useEffect(() => {
    GetPagination();
  }, [GetPagination]);
  const handlePageChange = (page: any) => {
    updateSearch({
      ...search,
      page: page,
    });
  };
 
  return (
    <div className="container">
      <Navbar />
      <Header title={"Past Events"} buttonName={"Back"} />
      <br/>
      <main>
        <Box bg={"#f1f5f9"}>
          <Box h={"auto"} w={"75%"} margin={"auto"} mt="130px" pt={"20px"}>
            <Box mt="10px" mb="10px">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  type="tel"
                  placeholder="search"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Box>
            <Box
              w={"100%"}
              h={"auto"}
              m={"auto"}
              mt={"5px"}
              pl={"20px"}
              pr={"20px"}
              pt={"30px"}
              pb={"30px"}
              bg={"white"}
              boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
              borderRadius={"10px"}
            >
              {/* grid layout of scheduled interview */}
              <Grid templateColumns={"repeat(3,1fr)"} gap={6}>
                {PaginatedInterviewsData.length > 0 &&
                  PaginatedInterviewsData.map((item: interview) => {
                    return (
                      <GridItem
                        key={item.interviewId}
                        w={"100%"}
                        h={"auto"}
                        border={" 1px solid indigo"}
                        bg={"white"}
                        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                        borderRadius={"10px"}
                        cursor={"pointer"}
                      >
                        <Box>
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Box>
                              <Text
                                fontSize={"18px"}
                                fontWeight={"500"}
                                ml={"15px"}
                                mt={"10px"}
                                maxW={"200px"}
                                isTruncated
                              >
                                {item.title}
                              </Text>
                            </Box>
                          </Flex>
                          <Stack>
                            <Flex
                              justifyContent={"space-between"}
                              mt={"10px"}
                              pl={"15px"}
                              pr={"15px"}
                            >
                              <Box>
                                <Text>Start Time</Text>
                                <Text>{convertTimeFormat(item.startTime)}</Text>
                              </Box>
                              <Box>
                                <Text>Start Time</Text>
                                <Text>{convertTimeFormat(item.endTime)}</Text>
                              </Box>
                            </Flex>
                            <Divider orientation="horizontal" mt={"10px"} />
                            <Flex
                              justifyContent={"space-between"}
                              mt={"10px"}
                              pr={"15px"}
                              pl={"15px"}
                            >
                              <Text>{item.interviewerName}</Text>
                              <Text>{item.category}</Text>
                            </Flex>
                          </Stack>
                          <Flex
                            justifyContent={"space-between"}
                            borderTop={"1px solid gray"}
                            alignItems={"center"}
                            mt={"10px"}
                            w={"100%"}
                            p={"10px"}
                          >
                            <Box></Box>
                            <Box>
                              <Link
                                to={`/dashboard/interview/${item.interviewId}`}
                              >
                                <Button
                                  variant={"link"}
                                  float={"right"}
                                  mt={"1px"}
                                >
                                  Details &gt;
                                </Button>
                              </Link>
                            </Box>
                          </Flex>
                        </Box>
                      </GridItem>
                    );
                  })}
              </Grid>
            </Box>
          </Box>
          <Flex
        justifyContent="space-between"
        alignItems={"center"}
        w={"75%"}
        m={"auto"}
        h={"100px"}
      >
        <Text ml="30px">
          Showing {startIndex} to {endIndex} of {filteredItem?.length} results
        </Text>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={handlePageChange}
          setPage={setCurrentPage}
          interviewsData={interviews}
          setPaginatedData={setPaginatedInterviewsData}
          perPage={itemsPerPage}
        />
      </Flex>
        </Box>
      </main>
      
    </div>
  );
};

export default PastEvents;
