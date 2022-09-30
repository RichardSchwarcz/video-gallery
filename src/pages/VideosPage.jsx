import React, { useState } from "react";
import { useGet } from "../useQueries";
import { Flex } from "@chakra-ui/react";

import VideoCard from "../VideoCard";
import TagsStack from "../TagsStack";
import Filter from "../Filter";
import SearchBar from "../SearchBar";

function VideosPage() {
  const [tags, setTags] = useState([]);

  const { data: videoData } = useGet({
    key: "videos",
    endpoint: "videos",
  });

  return (
    <Flex justifyContent="center" flexDir="column" maxW="1000px" mx="auto">
      <Flex justifyContent="space-between">
        <SearchBar
          placeholder={"./videos/"}
          leftPadding={"5.25rem"}
          width={"745px"}
        />
        <Filter setTags={setTags} tags={tags} />
      </Flex>
      {tags.length !== 0 && <TagsStack tags={tags} setTags={setTags} />}

      <Flex w="100%" flexWrap="wrap" gap={5}>
        {videoData?.data.map((element) => {
          if (element.deleted === "false") {
            return <VideoCard key={element.url} video={element} />;
          } else {
            return null;
          }
        })}
      </Flex>
    </Flex>
  );
}

export default VideosPage;
