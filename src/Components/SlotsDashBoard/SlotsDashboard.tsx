import {
  CountByAdminSlotsStatusService,
  CountBySlotsStatusService,
} from "../../Services/UserSideServices/SlotBookingServices";
import { SlotsStatus } from "../../Assets/Assets";
import { Box, Flex, FormLabel, SkeletonCircle, SkeletonText, useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import SlotsStatsTable from "./SlotsStatsTable";
import {id,token} from "../../Assets/Assets"

const SlotsDashboard = () => {
  const [totalSlots, setTotalSlots] = useState(SlotsStatus);
  const [adminSlots, setAdminSlots] = useState(SlotsStatus);

  const toast = useToast();
  const [isLoading,setIsLoading] = useState(true)




  const GetEvents = useCallback(async () => {
    try {
      const response = await CountBySlotsStatusService(token);
    
      if (response.results) {
        setIsLoading(false)
        setTotalSlots(response);
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

  const GetAdminSlots = useCallback(async () => {
    try {
         const adminSlotsResponse = await CountByAdminSlotsStatusService(
        id,
        token
      )
      if (adminSlotsResponse.results) {
        setIsLoading(false)
        setAdminSlots(adminSlotsResponse);
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
    GetAdminSlots();
  }, [GetEvents,GetAdminSlots]);

  return (
    <div>
      <Box
        w="80%"
        ml="10%"
        mt="130px"
        minH="120px"
        h="auto"
        p="2%"
        bg="white"
        borderRadius="10px"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Box w="60%" ml="20%">
          <Flex justifyItems="center">
            <FormLabel fontSize="16px" style={{ margin: "0 auto" }}>
              Update on Slot Availability
            </FormLabel>
          </Flex>
          {isLoading ?
        <Box>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
        :
          <SlotsStatsTable totalInterviews={totalSlots} />}
        </Box>
      </Box>

      <Box
        w="80%"
        ml="10%"
        mt="20px"
        minH="120px"
        h="auto"
        p="2%"
        bg="white"
        borderRadius="10px"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Box w="60%" ml="20%">
          <Flex justifyItems="center">
            <FormLabel fontSize="16px" style={{ margin: "0 auto" }}>
              Current Availability of All Your Slots
            </FormLabel>
          </Flex>
          {isLoading ?
        <Box>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
        :
          <SlotsStatsTable totalInterviews={adminSlots} />}
        </Box>
      </Box>
    </div>
  );
};

export default SlotsDashboard;
