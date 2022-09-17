import React, { useState } from "react";
import { useGet, useDelete, useUpdate } from "./useQueries";

import { Flex, IconButton, Tag, Box, useDisclosure } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import TagMenu from "./TagMenu";
import RemoveTagModal from "./RemoveTagModal";
import { getTaggedVideos, reduceTagSet, tagIsAssigned } from "./updateTagSet";

function TagList({ ...disclosureProps }) {
  const { data: tagsData } = useGet({
    enableQuery: false,
    key: "tags",
    endpoint: "tags",
  });

  const { data: videoData } = useGet({
    key: "videos",
    endpoint: "videos",
    enableQuery: false,
  });

  const { mutate: mutateDeleteTag } = useDelete({
    key: "tags",
    endpoint: "tags",
  });

  const { mutate: mutateRemoveAllTags } = useUpdate({
    // rename tags assigned to videos
    key: "videos",
    endpoint: "videos",
    invalidate: false,
  });

  const genericElement = { tag: "tag" };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [outDatedElement, setOutDatedElement] = useState(genericElement);

  function handleClick(element) {
    setOutDatedElement(element);
    onOpen();
  }

  function handleDelete(outDatedElement) {
    const taggedVideos = getTaggedVideos(videoData, outDatedElement.tag);
    if (tagIsAssigned(taggedVideos)) {
      const updatedVideos = reduceTagSet(taggedVideos, outDatedElement.tag);

      updatedVideos.forEach((video, index) => {
        setTimeout(() => {
          const updatedVideoTags = { tags: video.tags };

          mutateRemoveAllTags({
            data: updatedVideoTags,
            elementID: video.id,
          });

          console.log(`deleted ${index + 1} out of ${updatedVideos.length}`);
          const isDone = index + 1 === updatedVideos.length;
          if (isDone) {
            mutateDeleteTag(outDatedElement.id);
            onClose();
          }
        }, index * 100);
      });
    } else {
      mutateDeleteTag(outDatedElement.id);
      onClose();
    }
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
                onClick={() => handleClick(element)}
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
      <RemoveTagModal
        isOpen={isOpen}
        onClose={onClose}
        element={outDatedElement}
        handleDelete={handleDelete}
      />
    </Box>
  );
}

export default TagList;
