import React, { useState } from "react";
import {
  Input,
  Flex,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import useSearchStore from "../../store/searchStore";

const Search = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  const { searchTerm, setSearchTerm } = useSearchStore();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} alignItems="center">
      <InputGroup width="100%">  
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          width="100%"  
          maxWidth="600px"  
        />
      </InputGroup>
    </Flex>
  );
};

export default Search;