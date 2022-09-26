import React from "react";

import { Tag, HStack, TagLabel, TagCloseButton } from "@chakra-ui/react";

function TagsStack() {
  return (
    <HStack mb="5">
      <Tag borderRadius="full" variant="solid" colorScheme="red">
        <TagLabel>React</TagLabel>
        <TagCloseButton />
      </Tag>
    </HStack>
  );
}

export default TagsStack;
