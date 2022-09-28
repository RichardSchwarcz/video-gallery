import React from "react";

import { Flex } from "@chakra-ui/react";

function PlaylistCard() {
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
        <Flex
          h="45.2px"
          mx="2"
          justifyContent="space-between"
          alignItems="center"
        >
          Title
          {/* <VideoMenu
            onOpen={onOpen}
            elementID={video.id}
            elementTags={video.tags}
          /> */}
        </Flex>
      </Flex>
    </>
  );
}

export default PlaylistCard;
