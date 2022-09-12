import React, { useRef, useState, useLayoutEffect } from "react";
import { Flex, Image, Link, Tag, useDisclosure } from "@chakra-ui/react";

import RemoveModal from "./RemoveModal";
import thumbnailSource from "./thumbnailSource";
import VideoMenu from "./VideoMenu";
import { useRemoveVideo } from "./useVideo";
import { useGetTags } from "./useTags";
import { useEffect } from "react";

function VideoCard({ element }) {
  const tagsCopy = element.tags.slice();

  const [counter, setCounter] = useState(false);
  const [visibleTags, setVisibleTags] = useState(tagsCopy);

  const tagbox = useRef(null);
  const countbox = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: tagsData, isLoading } = useGetTags();
  const { mutate: mutateRemoveVideo } = useRemoveVideo();

  useEffect(() => {
    setVisibleTags(tagsCopy);
  }, [element.tags]);

  useLayoutEffect(() => {
    handleOverflow();
    //eslint-disable-next-line
  }, [visibleTags, counter]);

  function checkOverflow(tagboxWidth, countboxWidth = 0) {
    if (tagboxWidth + countboxWidth > 219) {
      return true;
    } else {
      return false;
    }
  }

  function getRefboxWidth(refbox) {
    if (refbox.current !== null) {
      return refbox.current.offsetWidth;
    } else {
      return 0;
    }
  }

  function handleOverflow() {
    const overflow = checkOverflow(
      getRefboxWidth(tagbox),
      getRefboxWidth(countbox)
    );
    if (overflow) {
      setVisibleTags(visibleTags.slice(0, -1));
      setCounter(true);
    }
  }

  function countNotVisible() {
    return tagsCopy.length - visibleTags.length;
  }

  function findTagColor(fetchedTags, videoTag) {
    if (!isLoading) {
      const matchingTag = fetchedTags.find((tag) => {
        if (tag.tag === videoTag) {
          return tag;
        } else {
          return null;
        }
      });
      return matchingTag.color;
    }
  }

  return (
    <>
      <Flex w="235px" h="200px" bg="gray.400" rounded="lg" direction="column">
        <Link href={element.url} isExternal>
          <Image
            //thumbnail size is 1280x720. To scale it properly with fixed width... (235*720)/1280 = 132.2
            h="132.2px"
            w="235px"
            objectFit="cover"
            roundedTop="lg"
            src={thumbnailSource(element.url)}
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
            element={element}
            onOpen={onOpen}
            elementID={element.id}
            tags={element.tags}
          />
        </Flex>
        <Flex mx="2" pb="2">
          <Flex ref={tagbox}>
            {visibleTags.map((videoTag) => {
              return (
                <Tag
                  key={videoTag}
                  colorScheme={findTagColor(tagsData?.data, videoTag)}
                  mx="0.5"
                  size="sm"
                  flex="none"
                >
                  {videoTag}
                </Tag>
              );
            })}
          </Flex>
          {counter && (
            <Flex ref={countbox}>
              <Tag size="sm" mx="0.5">{`+${countNotVisible()}`}</Tag>
            </Flex>
          )}
        </Flex>
        <RemoveModal
          isOpen={isOpen}
          onClose={onClose}
          onRemove={mutateRemoveVideo}
          elementID={element.id}
        />
      </Flex>
    </>
  );
}

export default VideoCard;
