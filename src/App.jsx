import React from "react";
import { useGetVideo } from "./useVideo";

import { Flex, Input, Button, Box } from "@chakra-ui/react";

import VideoCard from "./VideoCard";
import ControlsDrawer from "./ControlsDrawer";
import { useEffect } from "react";

function App() {
  const { data: videoData, refetch } = useGetVideo();

  useEffect(() => {
    refetch();
  }, []);

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
        </Flex>
      </Flex>
      {/* board */}
      <Box maxW="1000px" mx="auto" mb="5">
        <Flex w="100%" flexWrap="wrap" gap={5}>
          {videoData?.data.map((element) => {
            if (element.deleted === "false") {
              return <VideoCard key={element.url} element={element} />;
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
