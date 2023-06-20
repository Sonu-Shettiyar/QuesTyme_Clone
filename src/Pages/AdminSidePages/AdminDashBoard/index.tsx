import Navbar from "../../../Components/Navbar/Navbar";
import React, { useCallback, useEffect, useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Box, Flex, FormLabel,  SkeletonCircle,  SkeletonText,  useToast } from "@chakra-ui/react";
import SearchByBatch from "../../../Components/AdminDashboard/SearchByBatch";
import SearchByPendingStauts from "../../../Components/AdminDashboard/SearchByPendingStauts";
import { CountByMeetingStatusService } from "../../../Services/AdminSideServices/GetEventsService";
import { useSearch } from "../../../utils/SetParams";
import { useLocation, useNavigate } from "react-router-dom";
import { interviewsStatus } from "../../../Assets/Assets";
import TableForStats from "../../../Components/AdminDashboard/TableForStats";
import { token,id} from "../../../Assets/Assets";


const AdminDashBoard = () => {
  const [totalInterviews, setTotalInterviews] = useState(interviewsStatus);
  const [search, updateSearch] = useSearch();
  const [batchName, setBatchName] = useState<string | null>("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get("batch");
  const toast = useToast();
  const [isLoading,setIsLoading] = useState(true)

 

  

  useEffect(() => {
    setBatchName(name);
  }, [name]);

  const GetEvents = useCallback(async () => {
    try {
      const response = await CountByMeetingStatusService(id, token);
      if (response.results) {
        setIsLoading(false)
        setTotalInterviews(response);
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    GetEvents();
  }, [GetEvents]);

  const clearUrl = () => {
    navigate("");
    setBatchName("");
  };

  return (
    <div className="container">
      <Navbar />
      <DashboardNavbar />
      <br/>
      <Box
        w="80%"
        ml="10%"
        mt="130px"
        minH="120px"
        h="auto"
        p="3%"
        bg="white"
        borderRadius="10px"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Box w="60%" ml="20%">
          <Flex justifyItems="center" mb="20px">
            <FormLabel fontSize="18px" style={{ margin: "0 auto" }}>
              The Status of All Interviews
            </FormLabel>
          </Flex>

        {isLoading ?
        <Box>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
        :
        <TableForStats totalInterviews={totalInterviews} />}
        </Box>
      </Box>
      {/* search by batch name component */}

      
      <SearchByBatch batchName={batchName} setBatchName={setBatchName} />
      {/* search by batch name and  pendingstaus component */}
      <SearchByPendingStauts
        clearUrl={clearUrl}
        search={search}
        updateSearch={updateSearch}
      />
    </div>
  );
};

export default AdminDashBoard;
