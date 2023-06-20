import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const BulkEventNav = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Box position="fixed" h="auto" marginTop="62px" bg="whiteAlpha.900" w="100%">
                <Box boxShadow="sm">
                    <Flex position={"relative"} w={"97%"} align="center" m="auto" h={"60px"} justifyContent={"space-around"} color={"gray.600"}>
                        <Button colorScheme="blue" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                        <Text fontWeight="bold" position={"relative"} fontSize="medium">
                            Create Bulk Interviews
                        </Text>

                    </Flex>
                </Box>
            </Box>
        </div>
    );
};

export default BulkEventNav;
