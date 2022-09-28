import React from "react";

import { IconButton, Flex, useColorMode, Box } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

import Navbar from "./Navbar";
import SomDefaultHomePage from "./pages/SomDefaultHomePage";
import { Outlet } from "react-router-dom";
import CreationInput from "./CreationInput";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();

  function currentPageHomePage() {
    return location.pathname === "/";
  }

  return (
    <>
      <Flex justifyContent="center" flexDir="column" maxW="1000px" mx="auto">
        <Flex my="5">
          <Navbar />
          <IconButton
            aria-label="Search database"
            borderRadius="16px"
            variant="primary"
            icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
          />
          <CreationInput />
        </Flex>
      </Flex>
      {currentPageHomePage() && <SomDefaultHomePage />}
      <Outlet />
    </>
  );
}

export default App;
