import React from "react";

import { Tag, HStack, TagLabel, TagCloseButton } from "@chakra-ui/react";

function TagsStack({ tags, setTags }) {
  function handleRemove(tag) {
    setTags(tags.filter((item) => item !== tag));
  }

  function handleDuplicates(tags) {
    return [...new Set(tags)];
  }

  return (
    <HStack mb="5">
      {handleDuplicates(tags).map((tag) => {
        return (
          <Tag
            key={tag.tag}
            borderRadius="full"
            variant="subtle"
            colorScheme={tag.color}
          >
            <TagLabel>{tag.tag}</TagLabel>
            <TagCloseButton
              onClick={() => {
                handleRemove(tag);
              }}
            />
          </Tag>
        );
      })}
    </HStack>
  );
}

export default TagsStack;
