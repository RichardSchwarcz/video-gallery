import React from "react";

import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";

function SearchBar({ handleQuery, tabProps }) {
  return (
    <InputGroup mb="2" borderColor="gray.400" w={tabProps.inputWidth} mx="auto">
      <InputLeftElement
        children={`./${tabProps.tab}/`}
        w="24"
        color="gray.500"
        pl="5"
        justifyContent="flex-start"
      />
      <Input
        placeholder="Search"
        pl={tabProps.placeholderPadding}
        borderRadius="16px"
        onChange={(e) => handleQuery(e.target.value)}
      />
    </InputGroup>
  );
}

export default SearchBar;
