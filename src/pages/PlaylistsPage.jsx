import React from "react";
import { useGet } from "../useQueries";
import { Flex } from "@chakra-ui/react";

import PlaylistCard from "../PlaylistCard";
import SearchBar from "../SearchBar";

function VideosPage() {
  const { data: playlistData } = useGet({
    key: "playlists",
    endpoint: "playlists",
  });
  return (
    <Flex justifyContent="center" flexDir="column" maxW="1000px" mx="auto">
      <Flex justifyContent="space-between">
        <SearchBar
          placeholder={"./playlists/"}
          leftPadding={"6rem"}
          width={"1000px"}
        />
      </Flex>

      <Flex w="100%" flexWrap="wrap" gap={5}>
        {playlistData?.data.map((element) => {
          if (element.deleted === "false") {
            return <PlaylistCard key={element.playlist} />;
          } else {
            return null;
          }
        })}
      </Flex>
    </Flex>
  );
}

export default VideosPage;
