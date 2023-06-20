import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";



const BatchSearch = ({search,updateSearch,value,name}:any) => {
  const [searchTerm, setSearchTerm] = useState("");

useEffect(()=>{
setSearchTerm(value)
},[value])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    if(name ==="batch"){
      updateSearch({
        ...search,
      "batch":event.target.value
      });
    }else if(name==="name"){
      updateSearch({
        ...search,
      "name":event.target.value
      });
    }else{
        updateSearch({
            ...search,
          "category":event.target.value
          });
    }
   
   
  };

 
  return (
    <div>
      <Box mt="10px" mb="10px">
      <InputGroup>
    <InputLeftElement
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}
    />
    <Input type='tel' value={searchTerm} placeholder="search " onChange={handleInputChange} />
  </InputGroup>
      </Box>
    </div>
  );
};

export default BatchSearch;
