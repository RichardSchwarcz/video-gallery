import React from "react";

import { Tabs, TabList, Tab, Icon } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { VscHome } from "react-icons/vsc";

function Navbar() {
  return (
    <Tabs variant="soft-rounded" colorScheme="green">
      <TabList>
        <Link to="/">
          <Tab borderRadius="16px">
            <Icon as={VscHome} mr="2" />
            Home
          </Tab>
        </Link>
        <Link to="videos">
          <Tab borderRadius="16px">Videos</Tab>
        </Link>
        <Link to="/playlists">
          <Tab borderRadius="16px">Playlists</Tab>
        </Link>
        <Link to="/groups">
          <Tab borderRadius="16px">Groups</Tab>
        </Link>
        <Link to="tags">
          <Tab borderRadius="16px">Tags</Tab>
        </Link>
      </TabList>
    </Tabs>
  );
}

export default Navbar;
