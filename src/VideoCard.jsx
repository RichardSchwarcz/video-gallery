import React from "react";
import axios from "axios";
import { Flex, Image, Link, Tag, useDisclosure } from "@chakra-ui/react";

import RemoveModal from "./RemoveModal";
import thumbnailSource from "./thumbnailSource";
import VideoMenu from "./VideoMenu";
import useFetch from "./useFetch";

function VideoCard({ element, refetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useFetch("tags");

  const src = thumbnailSource(element.url);

  async function remove(element) {
    await axios.put(`http://localhost:8000/videos/${element.id}`, {
      ...element,
      deleted: "true",
    });
    console.log(element.id);
    await refetch();
  }

  function findTag(tags, videoTag) {
    if (!isLoading) {
      const tagColorObj = tags.find((tag) => {
        if (tag.tag === videoTag) {
          return tag;
        } else {
          return null;
        }
      });
      return tagColorObj.color;
    }
  }

  return (
    <>
      <Flex
        w="235px"
        h="200px"
        bg="gray.400"
        rounded="lg"
        direction="column"
        justifyContent=""
      >
        <Link href={element.url} isExternal>
          <Image
            //thumbnail size is 1280x720. To scale it properly with fixed width... (235*720)/1280 = 132.2
            h="132.2px"
            w="235px"
            objectFit="cover"
            roundedTop="lg"
            src={src}
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
          <VideoMenu element={element} refetch={refetch} onOpen={onOpen} />
        </Flex>
        <Flex mx="2" pb="2">
          {element.tags.map((videoTag) => {
            return (
              <Tag
                key={videoTag}
                colorScheme={findTag(data, videoTag)}
                mx="0.5"
                size="sm"
              >
                {videoTag}
              </Tag>
            );
          })}
        </Flex>
        <RemoveModal
          isOpen={isOpen}
          onClose={onClose}
          onRemove={remove}
          element={element}
        />
      </Flex>
    </>
  );
}

export default VideoCard;
