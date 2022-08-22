import React, { useState } from "react";
import { Flex, Input, Button, Box } from "@chakra-ui/react";
import useFetch from "./useFetch";
import postToDB from "./postToDB";
import VideoCard from "./VideoCard";

function App() {
  const [url, setUrl] = useState("");
  const { videos, refetch } = useFetch();

  function handleChange(e) {
    setUrl(e.target.value);
  }

  async function handleClick() {
    const video = {
      name: "",
      url: url,
      tags: "",
      deleted: "false",
    };
    await postToDB(video);
    refetch();
    const urlInput = document.getElementById("urlInput");
    urlInput.value = "";
  }

  return (
    <>
      {/* Input panel */}
      <Flex justifyContent="center">
        <Flex w="100%" maxW="1000px" m="10px">
          <Input
            placeholder="Paste video URL"
            onChange={handleChange}
            id="urlInput"
          />
          <Button colorScheme="green" ml="10px" onClick={handleClick}>
            Add Video
          </Button>
        </Flex>
      </Flex>
      {/* board */}
      <Box maxW="1000px" m="0 auto 0">
        <Flex w="100%" flexWrap="wrap" gap="20px">
          {videos.map((element) => {
            return <VideoCard url={element.url} key={element.id} />;
          })}
        </Flex>
      </Box>
    </>
  );
}

export default App;
