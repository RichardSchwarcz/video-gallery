import React from "react";
import { Flex, Input, Button, Box } from "@chakra-ui/react";

import useFetch from "./useFetch";

import VideoCard from "./VideoCard";
import ControlsDrawer from "./ControlsDrawer";

function App() {
  const { data, refetch } = useFetch("videos");

  return (
    <>
      {/* Input panel */}
      <Flex justifyContent="center">
        <ControlsDrawer refetch={refetch} />
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
      <Box maxW="1000px" m="auto">
        <Flex w="100%" flexWrap="wrap" gap={5}>
          {data.map((element) => {
            return <VideoCard url={element.url} key={element.id} />;
          })}
        </Flex>
      </Box>
    </>
  );
}

export default App;
