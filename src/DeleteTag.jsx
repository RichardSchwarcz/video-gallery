import React, { useState } from "react";
import { useGet, useDelete, useUpdate } from "./useQueries";

import { IconButton, useDisclosure } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

import RemoveTagModal from "./RemoveTagModal";
import { getTaggedVideos, reduceTagSet, tagIsAssigned } from "./updateTagSet";

function DeleteTag({ element }) {
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
    <>
      <IconButton
        icon={<SmallCloseIcon />}
        mr="5"
        variant="ghost"
        size="sm"
        // TODO on hover Red
        colorScheme="red"
        onClick={() => handleClick(element)}
      />

      <RemoveTagModal
        isOpen={isOpen}
        onClose={onClose}
        element={outDatedElement}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default DeleteTag;
