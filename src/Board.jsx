import React from "react";

import { Flex } from "@chakra-ui/react";

import Videos from "./Videos";
import Tags from "./Tags";

function Board({ state, query }) {
  return (
    <Flex w="100%" flexWrap="wrap" gap={5}>
      {state.videos && <Videos />}
      {state.tags && <Tags query={query} />}
    </Flex>
  );
}

export default Board;
