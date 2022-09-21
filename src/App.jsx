import React from "react";

import { Flex, Box, Tabs, TabList, Tab, Tag, HStack } from "@chakra-ui/react";

import { useState } from "react";

import CreationInput from "./CreationInput";
import SearchBar from "./SearchBar";
import { useReducer } from "react";
import Board from "./Board";
import reducer from "./reducer";
import Filter from "./Filter";
import { Router } from "@tanstack/react-location";

function App() {
  //queries set in searchBar and passed to Board
  const [queryTags, setQueryTags] = useState("");
  const [queryVideos, setQueryVideos] = useState("");
  const [tagSet, setTagSet] = useState([]);
  // console.log(tagSet);

  const initialState = {
    videos: true,
    playlists: false,
    tags: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  function selectedTabProps(state) {
    if (state.videos) {
      const obj = {
        tab: "videos",
        buttonText: "Add new video",
        inputPlaceholder: "Paste URL",
        placeholderPadding: "5.25rem",
        inputWidth: "765px",
      };
      return obj;
    } else if (state.playlists) {
      const obj = {
        tab: "playlists",
        buttonText: "Create new playlist",
        inputPlaceholder: "Enter playlist name",
        placeholderPadding: "6rem",
        inputWidth: "1000px",
      };
      return obj;
    } else if (state.tags) {
      const obj = {
        tab: "tags",
        buttonText: "Create new tag",
        inputPlaceholder: "Enter tag name",
        placeholderPadding: "4.25rem",
        inputWidth: "300px",
      };
      return obj;
    }
  }

  function handleQuery(selectedTabProps) {
    // in searchBar
    const selectedTab = selectedTabProps(state).tab;
    let queryFunction;
    if (selectedTab === "tags") {
      return (queryFunction = setQueryTags);
    }
    return queryFunction;
  }

  function query(selectedTabProps) {
    // result of queries set in searchBar
    const selectedTab = selectedTabProps(state).tab;
    let query;
    if (selectedTab === "tags") {
      return (query = queryTags);
    }
    return query;
  }

  function handleUpdateFilter(newTag) {
    setTagSet((x) => [...x, newTag]);
  }

  return (
    <>
      {/* Search panel */}
      <Flex justifyContent="center" flexDir="column" maxW="1000px" mx="auto">
        <Flex my="5">
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab
                onClick={() => dispatch({ type: "switchVideos" })}
                borderRadius="16px"
              >
                Videos
              </Tab>
              <Tab
                onClick={() => dispatch({ type: "switchPlaylists" })}
                borderRadius="16px"
              >
                Playlists
              </Tab>
              <Tab borderRadius="16px">Groups</Tab>
              <Tab
                onClick={() => dispatch({ type: "switchTags" })}
                borderRadius="16px"
              >
                Tags
              </Tab>
            </TabList>
          </Tabs>
          <CreationInput tabProps={selectedTabProps(state)} />
          {/* <Spinner size="sm" /> */}
        </Flex>

        <Flex>
          <SearchBar
            handleQuery={handleQuery(selectedTabProps)}
            tabProps={selectedTabProps(state)}
          />
          <Filter handleUpdateFilter={handleUpdateFilter} />
        </Flex>
        <HStack mb="2">
          {tagSet.map((element) => {
            return (
              <Tag key={element.tag} colorScheme={element.color}>
                {element.tag}
              </Tag>
            );
          })}
        </HStack>
      </Flex>
      {/* board */}
      <Box maxW="1000px" mx="auto" mb="5">
        <Board state={state} query={query(selectedTabProps)} />
      </Box>
    </>
  );
}

export default App;
