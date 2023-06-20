import {
  Box,
  Button,
  Divider,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Iinterviews } from "../../Services/AdminSideServices/GetEventsInterface";
import { useNavigate } from "react-router-dom";

interface ProfilecomponentProps {
  event: Iinterviews;
  GetEvents: any;
}

const AdminInterviewBox = ({ event, GetEvents }: ProfilecomponentProps) => {
  const [isCopied, setCopied] = useState(false);
  const [uniquelink, setuniqueLink] = useState<string | null>("");
  const navigate = useNavigate();

  // based on meeting status set interview pending on compleated
  const getMeetingStatusText = (status: string) => {
    switch (status) {
      case "E":
        return "Completed";
      case "P":
        return "Pending";
      case "C":
        return "Cancelled";
      case "S":
        return "Started";
      case "SS":
        return "Started by Student";
      case "IS":
        return "Started by Interviewer";
      case "SE":
        return "Ended by Student";
      case "IE":
        return "Ended by Interviewer";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    setuniqueLink(event.meetingLink);
  }, [event.meetingLink]);

  //for copying link when click on copylink
  const handleCopyLink = () => {
    if (uniquelink != null) {
      navigator.clipboard.writeText(uniquelink);
    }
  };

  const GotoDetails = (id: number) => {
    navigate(`/admin/dashboard/interview/${id}`);
  };

  return (
    <div>
      <Box
        w="100%"
        h="auto"
        p="10px"
        boxShadow="0 5px 15px rgba(0,0,0,0.06)"
        border="1px solid grey"
        borderRadius="10px"
      >
        <Box>
          <Popover>
            <PopoverTrigger>
              <Flex
                cursor="pointer"
                pt="10px"
                pl="20px"
                pr="20px"
                justifyContent="flex-end"
              >
                <i
                  className="fa-solid fa-gear"
                  style={{ color: "#778087" }}
                ></i>{" "}
                <i
                  style={{ marginLeft: "10px", color: "#778087" }}
                  className="fa-solid fa-caret-down"
                ></i>{" "}
              </Flex>
            </PopoverTrigger>
            <PopoverContent  border="1px solid grey">
              <PopoverBody>
                <Box
                  cursor="pointer"
                  onClick={() =>
                    navigate(`/admin/inteviews/${event.interviewId}/edit`)
                  }
                >
               <Flex>
                <Box ml="20px" >
               <i className="fa-solid fa-pen-to-square"></i></Box>
                  <Text ml="20px" color="black" fontSize="16px">
                    Event Edit
                  </Text>
                  </Flex>
                </Box>
                <Divider mt="5px" />
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Text color="#474747">{event.title}</Text>
          <Flex mt="10px" justifyContent="space-between">
            <Text color="#778087">{event.date} </Text>{" "}
            <Text color="#778087">{event.startTime} </Text>{" "}
          </Flex>
          <Flex mt="10px" justifyContent="space-between">
            <Text color="#778087">{event.batch}</Text>{" "}
            <Text color="#778087">{event.category} </Text>{" "}
          </Flex>
          <Flex mt="10px" justifyContent="space-between">
            {" "}
            <Text color="#778087">Meeting Status</Text>
            <Text color="blue">
              {getMeetingStatusText(event?.meetingStatus)}
            </Text>
          </Flex>
        </Box>

        <Divider mb="10px" mt="10px" />

        <Flex justifyContent="space-between" p="10px">
          {isCopied ? (
            <Flex cursor="pointer" onClick={() => setCopied(!isCopied)}>
              {" "}
              <i
                style={{ padding: "5px", color: "grren" }}
                className="fa-solid fa-check"
              ></i>{" "}
              <Text>Copied</Text>
            </Flex>
          ) : (
            <Flex cursor="pointer" onClick={() => setCopied(!isCopied)}>
              <i
                className="fa-regular fa-copy"
                style={{
                  margin: "5px 5px ",
                  cursor: "pointer",
                  color: "#778087",
                }}
              ></i>{" "}
              <Text color="#778087" onClick={handleCopyLink}>
                Copy Link
              </Text>
            </Flex>
          )}

          <Button
            variant="link"
            onClick={() => GotoDetails(event.interviewId)}
            color="blue"
          >
            View Details
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default AdminInterviewBox;
