import { Flex, Input, Button, Box } from "@chakra-ui/react";
import React from "react";
import VideoCard from "./VideoCard";

function App() {
  const array = ["test", "test2", "test3", "test4"];
  return (
    <>
      {/* Input panel */}
      <Flex justifyContent="center">
        <Flex w="100%" maxW="1000px" m="10px">
          <Input placeholder="Paste video URL" />
          <Button colorScheme="green" ml="10px">
            Add Video
          </Button>
        </Flex>
      </Flex>
      {/* board */}
      <Box maxW="1000px" m="0 auto 0">
        <Flex
          w="100%"
          background="rgba(0,0,0,0.1)"
          borderRadius="var(--chakra-radii-md)"
        >
          <Flex>
            {array.map((element) => {
              return <VideoCard element={element} />;
            })}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default App;
