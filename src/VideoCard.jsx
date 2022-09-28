import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useUpdate } from "./useQueries";

import {
  Flex,
  Image,
  Link,
  Tag,
  useDisclosure,
  keyframes,
} from "@chakra-ui/react";
import RemoveModal from "./RemoveModal";
import thumbnailSource from "./thumbnailSource";
import VideoMenu from "./VideoMenu";

function VideoCard({ video }) {
  const tagsCopy = video.tags.slice();

  const [counter, setCounter] = useState(false);
  const [visibleTags, setVisibleTags] = useState(tagsCopy);

  const tagBox = useRef(null);
  const countBox = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: mutateRemoveVideo } = useUpdate({
    key: "videos",
    endpoint: "videos",
    invalidate: true,
  });

  useEffect(() => {
    setVisibleTags(video.tags);
  }, [video.tags]);

  useLayoutEffect(() => {
    function handleOverflow() {
      const overflow = checkOverflow(
        getRefBoxWidth(tagBox),
        getRefBoxWidth(countBox)
      );
      if (overflow) {
        setVisibleTags(visibleTags.slice(0, -1));
        setCounter(true);
      }
    }
    handleOverflow();
  }, [visibleTags, counter]);

  function checkOverflow(tagBoxWidth, countBoxWidth = 0) {
    if (tagBoxWidth + countBoxWidth > 219) {
      return true;
    } else {
      return false;
    }
  }

  function getRefBoxWidth(refBox) {
    if (refBox.current !== null) {
      return refBox.current.offsetWidth;
    } else {
      return 0;
    }
  }

  function countNotVisible() {
    return tagsCopy.length - visibleTags.length;
  }

  function handleRemoveVideo(patchObject) {
    // patch object { data, elementID }
    mutateRemoveVideo(patchObject);
    onClose();
  }

  return (
    <>
      <Flex
        w="235px"
        h="200px"
        rounded="lg"
        direction="column"
        boxShadow="lg"
        bgGradient="linear(to-tr, gray.300,yellow.400, pink.400)"
        bgAttachment="fixed"
      >
        <Link href={video.url} isExternal>
          <Image
            //thumbnail size is 1280x720. To scale it properly with fixed width... (235*720)/1280 = 132.2
            h="132.2px"
            w="235px"
            objectFit="cover"
            roundedTop="lg"
            src={thumbnailSource(video.url)}
            alt="thumbnail"
          />
        </Link>
        <Flex
          h="45.2px"
          mx="2"
          justifyContent="space-between"
          alignItems="center"
        >
          Title
          <VideoMenu
            onOpen={onOpen}
            elementID={video.id}
            elementTags={video.tags}
          />
        </Flex>
        <Flex mx="2" pb="2">
          <Flex ref={tagBox}>
            {visibleTags.map((videoTag) => {
              return (
                <Tag key={videoTag} mx="0.5" size="sm" flex="none">
                  {videoTag}
                </Tag>
              );
            })}
          </Flex>
          {counter && (
            <Flex ref={countBox}>
              <Tag size="sm" mx="0.5">{`+${countNotVisible()}`}</Tag>
            </Flex>
          )}
        </Flex>
        <RemoveModal
          isOpen={isOpen}
          onClose={onClose}
          onRemove={handleRemoveVideo}
          elementID={video.id}
        />
      </Flex>
    </>
  );
}

export default VideoCard;
