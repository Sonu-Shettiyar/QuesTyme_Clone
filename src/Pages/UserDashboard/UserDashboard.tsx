import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  Flex,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { MdSettings } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import { FaRegClone } from "react-icons/fa";
import Header from "../../Components/CommonComponents/Header";
import { GetAllScheduledInterView } from "../../Services/UserSideServices/GetAllScheduledInterviewServices/GetInterviewsServices";
import { convertTimeFormat } from "../../utils/index";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Dispatch } from "redux";
import {
  scheduledInterviewFailure,
  scheduledInterviewLoading,
  scheduledInterviewSuccess,
} from "@/Redux/ScheduledInterviewUser/Action";
import Pagination from "../../Components/AdminDashboard/Pagination";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useCallback } from "react";
import { useSearch } from "../../utils/SetParams";
export interface interview {
  interviewId: number;
  interviewerName: string;
  intervieweeName: string;
  startTime: string;
  endTime: string;
  date: string;
  category: string;
  instructions: string;
  title: string;
  meetingLink: string;
  batch: string;
  meetingStatus: string;
  studentNote: string;
  adminFeedback: string;
}
const UserDashboard = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [search, updateSearch] = useSearch();
  const interviews = useSelector(
    (state: RootState) => state.ScheduledInterviewReducer.interviews
  );
  const [copyText, setCopyText] = useState("");
  const dispatch: Dispatch<
    | scheduledInterviewSuccess
    | scheduledInterviewLoading
    | scheduledInterviewFailure
  > = useDispatch();
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [PaginatedInterviewsData, setPaginatedInterviewsData] = useState<
    interview[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItem, setFilteredItem] = useState<interview[]>([]);
  const [startIndex, setStartIndex] = useState<any>(1);
  const [endIndex, setEndIndex] = useState<number>();
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const [searchName, setSearchName] = useState<string>("");
  const location = useLocation();
  const userId: number = userDetails?.user?.id;
  const token: string = userDetails?.token;
  const itemsPerPage = 9;

  useEffect(() => {
    if (interviews?.length === 0) {
      GetAllScheduledInterView(userId, token)(dispatch);
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
      <Header title={"Upcoming Events"} buttonName={"+ Book 1-1"} />
      <br/>
      <main>
        <Box bg={"#f1f5f9"}>
          <Box h={"auto"} w={"75%"} margin={"130px"} pt={"20px"}>
            <Box mt="10px" mb="10px">
              <InputGroup   border={"none"}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                  outline={"none"}
                  border={"none"}
                />
                <Input
                  type="tel"
                  placeholder="search"
                  value={searchTerm}
                  onChange={handleInputChange}
                  outline={"none"}
                  border={"none"}
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
                {PaginatedInterviewsData.length != 0 &&
                  PaginatedInterviewsData.map((item) => {
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
                            <Box w={"100%"}>
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
                                <Text>Date</Text>
                                <Text>{item.date}</Text>
                              </Box>
                              <Box>
                                <Text>Start Time</Text>
                                <Text>{convertTimeFormat(item.startTime)}</Text>
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
                                  colorScheme="blue"
                                >
                                  View Details &gt;
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

export default UserDashboard;
