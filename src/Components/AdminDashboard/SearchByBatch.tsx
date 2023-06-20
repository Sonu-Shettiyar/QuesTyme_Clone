import React, { useCallback,  useState } from "react";
import { Box, Button, Flex, FormLabel,  useToast } from "@chakra-ui/react";

import { useSearch } from "../../utils/SetParams";
import SearchComponent from "../SearchComponents/SearchComponent";
import { CountByBatchStatusService } from "../../Services/AdminSideServices/GetEventsService";
import { IntervieStatusByBatch } from "../../Assets/Assets";
import TableForStats from "./TableForStats";

const SearchByBatch = ({ batchName, setBatchName }: any) => {
  const [totalInterviews, setTotalInterviews] = useState(IntervieStatusByBatch);
  const [search, updateSearch] = useSearch();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // if batchname then call the api to get details on batch
  const GetBatchStatus = useCallback(async () => {
    if (batchName !== "") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);

      try {
        const response = await CountByBatchStatusService(batchName);
        if (response.results) {
          setTotalInterviews(response);
        }
      } catch (err) {
        toast({
          title: "Something Went Wrong",
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  }, [toast, batchName]);

  return (
    <div>
      <Box
        w="80%"
        ml="10%"
        mt="30px"
        minH="200px"
        h="auto"
        p="2%"
        bg="white"
        borderRadius="10px"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Box w="60%" ml="20%">
          <Flex justifyItems="center" mb="20px">
            <FormLabel fontSize="18px" style={{ margin: "0 auto" }}>
              The Status of Interviews in a Particular Batch
            </FormLabel>
          </Flex>
          <FormLabel>Search By Batch</FormLabel>
          <Flex w="100%" justifyContent="space-between">
            <SearchComponent
              search={search}
              updateSearch={updateSearch}
              value={batchName}
              name="batch"
            />{" "}
            <Button
              isLoading={loading}
              colorScheme="blue"
              mt="10px"
              onClick={GetBatchStatus}
            >
              Search
            </Button>{" "}
          </Flex>

          <Box w="100%">
            <TableForStats totalInterviews={totalInterviews} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SearchByBatch;
