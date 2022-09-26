import React from "react";

import { IconButton, useDisclosure } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

import RemoveTagModal from "./RemoveTagModal";

function DeleteTag() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        icon={<SmallCloseIcon />}
        mr="5"
        variant="ghost"
        size="sm"
        // TODO on hover Red
        colorScheme="red"
        onClick={() => onOpen()}
      />
      <RemoveTagModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default DeleteTag;
