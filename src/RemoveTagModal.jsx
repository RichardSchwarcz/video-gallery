import React from "react";
import { useDeleteTags } from "./useTags";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

function RemoveTagModal({ isOpen, onClose, elementId }) {
  const { mutate } = useDeleteTags();

  function handleDelete(elementId) {
    mutate(elementId);
    onClose();
  }

  // axios base
  // package json proxy
  // setup proxy.js
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete this tag?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Do you want to delete this tag?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => handleDelete(elementId)}
            >
              Remove
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RemoveTagModal;
