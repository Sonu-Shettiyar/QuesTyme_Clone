import React from 'react';
import { Box,Text,Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = ({title,buttonName}:any) => {
  return (
    <div>
      <header>
                <Box  w="100%" bg={"white"}>
                    <Box bg="white" h={"auto"} w="100%" mt={"62px"} position="absolute">
                        <Box
                           
                            h={"60px"}
                            m={"auto"}
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            w="80%"
                            ml="10%"
                           
                        >
                            <Text
                                fontSize={"1.7rem"}
                                fontWeight={"500"}
                                fontFamily={"sans-serif"}
                            >
                            {title}
                            </Text>
                            
                            {title=="Upcoming Events"? <Link to={buttonName=="+ Book 1-1"?"/dashboard/past-events":"#"}><Button colorScheme="blue">Old Events</Button></Link>:""}
                            <Link to={buttonName=="+ Book 1-1"?"/dashboard/book-one-on-One":buttonName=="Back"?"/dashboard":"#"}><Button colorScheme="blue">{buttonName}</Button></Link>
                        </Box>
                      
                    </Box>
                </Box>
            </header>
    </div>
  )
}

export default Header
