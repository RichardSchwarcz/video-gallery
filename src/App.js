import { Flex, Input, Button } from "@chakra-ui/react";
import React from "react";
import VideoCard from "./VideoCard";

function App() {
  return (
    <>
      {/* Input panel */}
      <Flex justifyContent="center">
        <Flex w="100%" maxW="960px" m="10px">
          <Input placeholder="Paste video URL" />
          <Button colorScheme="green" ml="10px">
            Add Video
          </Button>
        </Flex>
      </Flex>
      {/* board */}
      <Flex justifyContent="center">
        <Flex
          w="100%"
          maxW="960px"
          h="1000px"
          border="1px solid black"
          borderRadius="var(--chakra-radii-md)"
        >
          <VideoCard />
        </Flex>
      </Flex>
    </>
  );
}

export default App;
