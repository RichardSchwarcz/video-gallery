import React from "react";

import { Flex } from "@chakra-ui/react";

import Navbar from "./Navbar";
import SomDefaultHomePage from "./pages/SomDefaultHomePage";
import { Outlet } from "react-router-dom";
import CreationInput from "./CreationInput";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  function currentPageHomePage() {
    return location.pathname === "/";
  }

  return (
    <>
      <Flex justifyContent="center" flexDir="column" maxW="1000px" mx="auto">
        <Flex my="5">
          <Navbar />
          <CreationInput />
        </Flex>
      </Flex>
      {currentPageHomePage() && <SomDefaultHomePage />}
      <Outlet />
    </>
  );
}

export default App;
