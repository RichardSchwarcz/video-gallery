import React from "react";
import AddVideo from "./AddVideo";
import ManageTags from "./ManageTags";

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function ControlsDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        variant="ghost"
        onClick={onOpen}
        my="5"
        mr="5"
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Stack spacing="2">
              <AddVideo />
              <ManageTags />
            </Stack>
          </DrawerBody>

          <DrawerFooter>ryso</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ControlsDrawer;
