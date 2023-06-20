import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const OneOnOneCreateNav = ({NavText}:any) => {
  const navigate = useNavigate();

  return (
    <div>
      <Box
        position="absolute"
        h="auto"
        marginTop="62px"
        bg="whiteAlpha.900"
        w="100%"
       
      >
        <Box boxShadow="sm">
          <Flex
            position={"relative"}
            w={"97%"}
            align="center"
            m="auto"
            h={"60px"}
            justifyContent={"space-around"}
            color={"gray.600"}
          >
            <Button
              borderRadius="15px"
              colorScheme="blue"
              onClick={() => navigate("/admin/one-on-one-interviews")}
            >
              Back
            </Button>

            <Text fontWeight="bold" fontSize="medium">
              {" "}
             {NavText}{" "}
            </Text>

          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default OneOnOneCreateNav;
