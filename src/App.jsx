import React from "react";
import { useGet } from "./useQueries";

import { Flex, Input, Button, Box, Spinner } from "@chakra-ui/react";

import VideoCard from "./VideoCard";
import ControlsDrawer from "./ControlsDrawer";

function App() {
  const { data: videoData } = useGet({
    key: "videos",
    endpoint: "videos",
  });

  return (
    <>
      {/* Search panel */}
      <Flex justifyContent="center">
        <ControlsDrawer />
        <Flex w="100%" maxW="940px" mt="5" mb="5">
          <Input placeholder="Search" />
          {/* TODO add search icon */}
          <Button colorScheme="green" ml="5">
            Search
          </Button>
          {/* TODO add filter */}
          {/* <Spinner size="sm" /> */}
        </Flex>
      </Flex>
      {/* board */}
      <Box maxW="1000px" mx="auto" mb="5">
        <Flex w="100%" flexWrap="wrap" gap={5}>
          {videoData?.data.map((element) => {
            if (element.deleted === "false") {
              return <VideoCard key={element.url} video={element} />;
            } else {
              return null;
            }
          })}
        </Flex>
      </Box>
    </>
  );
}

export default App;
