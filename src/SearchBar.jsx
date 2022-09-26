import React from "react";

import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";

function SearchBar({ placeholder, leftPadding, width }) {
  return (
    <InputGroup mb="5" borderColor="gray.400" w={width}>
      <InputLeftElement
        children={placeholder}
        w="24"
        color="gray.500"
        pl="5"
        justifyContent="flex-start"
      />
      <Input placeholder="Search" pl={leftPadding} borderRadius="16px" />
    </InputGroup>
  );
}

export default SearchBar;
