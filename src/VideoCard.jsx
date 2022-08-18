import { Flex } from "@chakra-ui/react";
import React from "react";

function VideoCard() {
  return (
    <Flex
      w="200px"
      h="200px"
      border="2px solid red"
      borderRadius="var(--chakra-radii-md)"
      direction="column"
      justifyContent="space-between"
    >
      image
      <Flex
        h="50px"
        borderTop="1px solid black"
        justifyContent="left"
        alignItems="center"
      >
        Title
      </Flex>
    </Flex>
  );
}

export default VideoCard;
