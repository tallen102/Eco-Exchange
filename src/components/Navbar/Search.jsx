import React from 'react';
import { Input, Flex, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import useSearchStore from '../../store/searchStore';

const Search = () => {
  const { searchTerm, setSearchTerm } = useSearchStore();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      alignItems="center"
      width="100%"
      px={{ base: 2, sm: 4 }}  // Padding adjusted for responsiveness
    >
      <InputGroup size="lg" width="100%">
        <InputLeftElement pointerEvents="none">
          <Icon as={Search2Icon} color="gray.500" w={5} h={5} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search for 'desk'"
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          width="100%"
          maxWidth="100%"
          borderRadius="md"
          borderColor="gray.300"
          _hover={{ borderColor: 'gray.400' }}
          _focus={{ borderColor: 'blue.500', boxShadow: 'sm' }}
          size={{ base: "sm", md: "lg" }}  // Adjust size responsively
        />
      </InputGroup>
    </Flex>
  );
};

export default Search;

