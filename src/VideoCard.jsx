import { Flex } from "@chakra-ui/react";
import React from "react";

function VideoCard({ element }) {
  return (
    <Flex
      w="235px"
      h="200px"
      mr="20px"
      background="rgba(0,0,0,0.3)"
      borderRadius="var(--chakra-radii-md)"
      direction="column"
      justifyContent="space-between"
    >
      image
      {element}
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
