import React, { useState } from "react";
import { useGet } from "./useQueries";

import { Flex, IconButton, Tag, Box, useDisclosure } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import TagMenu from "./TagMenu";
import RemoveTagModal from "./RemoveTagModal";

function TagList({ ...disclosureProps }) {
  const { data: tagsData } = useGet({
    enableQuery: false,
    key: "tags",
    endpoint: "tags",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [elementID, setElementID] = useState();

  function getTagID(id) {
    setElementID(id);
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
                onClick={() => getTagID(element.id)}
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
      <RemoveTagModal isOpen={isOpen} onClose={onClose} elementId={elementID} />
    </Box>
  );
}

export default TagList;
