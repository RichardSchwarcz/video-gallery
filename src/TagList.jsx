import React, { useState } from "react";

import { Flex, IconButton, Tag, Box, useDisclosure } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import TagMenu from "./TagMenu";
import RemoveTagModal from "./RemoveTagModal";
import { useGetTags } from "./useTags";

function TagList({ ...disclosureProps }) {
  const { data: tagsData } = useGetTags();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [elementId, setElementId] = useState();

  function handleRemove(id) {
    setElementId(id);
    onOpen();
  }

  return (
    <Box {...disclosureProps}>
      {tagsData?.data.map((element) => {
        return (
          <Flex
            key={element.tag}
            justifyContent="space-between"
            // TODO on hover bg
            mx="10"
            my="2"
          >
            <Flex justifyContent="flex-start">
              <IconButton
                icon={<SmallCloseIcon />}
                variant="ghost"
                size="xs"
                // TODO on hover Red
                onClick={() => handleRemove(element.id)}
              />
              <Tag colorScheme={element.color} w="fit-content">
                {element.tag}
              </Tag>
            </Flex>
            {/* Drop down menu next to tag */}
            <TagMenu element={element} />
          </Flex>
        );
      })}
      <RemoveTagModal isOpen={isOpen} onClose={onClose} elementId={elementId} />
    </Box>
  );
}

export default TagList;
