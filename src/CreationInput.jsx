import React, { useState } from "react";
import { usePost } from "./useQueries";

import {
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, ArrowLeftIcon } from "@chakra-ui/icons";

function CreationInput({ tabProps }) {
  const [switchButton, setSwitchButton] = useState(true);
  const [input, setInput] = useState("");

  const { mutate: mutateAddVideo } = usePost({
    endpoint: "videos",
    key: "videos",
  });
  const { mutate: mutateAddTag } = usePost({ endpoint: "tags", key: "tags" });

  function handleToggleClick() {
    setSwitchButton(!switchButton);
  }

  function handleCreateClick() {
    if (tabProps.buttonText === "Add new video") {
      addVideo();
    } else if (tabProps.buttonText === "Create new tag") {
      createTag();
    }
    clearInput();
  }

  function createTag() {
    let tagObj = {
      tag: input,
      color: "gray",
    };
    mutateAddTag(tagObj);
  }

  function addVideo() {
    const video = {
      name: "",
      url: input,
      tags: [],
      deleted: "false",
    };
    mutateAddVideo(video);
  }

  function clearInput() {
    const input = document.getElementById("input");
    input.value = "";
  }

  return (
    <>
      {switchButton && (
        <Button
          onClick={() => handleToggleClick()}
          ml="5"
          borderRadius="16px"
          leftIcon={<AddIcon />}
          colorScheme="green"
          variant="outline"
        >
          {tabProps.buttonText}
        </Button>
      )}
      {!switchButton && (
        <InputGroup ml="5">
          <InputLeftElement
            children={
              <IconButton
                size="sm"
                icon={<ArrowLeftIcon color="gray.500" />}
                onClick={() => handleToggleClick()}
                isRound="true"
                variant="ghost"
              />
            }
          />
          <InputRightElement
            children={
              <IconButton
                size="sm"
                icon={<CheckIcon color="gray.100" />}
                onClick={() => handleCreateClick()}
                isRound="true"
                colorScheme="green"
              />
            }
          />
          <Input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            pl="14"
            borderRadius="16px"
            borderColor="gray.400"
            variant="outline"
            placeholder={tabProps.inputPlaceholder}
            id="input"
          />
        </InputGroup>
      )}
    </>
  );
}

export default CreationInput;
