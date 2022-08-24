import React, { useState } from "react";

import { Flex, IconButton, Tag, Box, useDisclosure } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import TagMenu from "./TagMenu";
import RemoveTagModal from "./RemoveTagModal";

function TagList({ data, refetch, ...disclosureProps }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [elementId, setElementId] = useState();

  function handleClick(id) {
    setElementId(id);
    onOpen();
  }

  return (
    <Box {...disclosureProps}>
      {data.map((element) => {
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
                onClick={() => handleClick(element.id)}
              />
              <Tag colorScheme={element.color} w="fit-content">
                {element.tag}
              </Tag>
            </Flex>
            {/* Drop down menu next to tag */}
            <TagMenu element={element} refetch={refetch} />
          </Flex>
        );
      })}
      <RemoveTagModal
        isOpen={isOpen}
        onClose={onClose}
        elementId={elementId}
        refetch={refetch}
      />
    </Box>
  );
}

export default TagList;
