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
import { useLocation } from "react-router-dom";

function CreationInput() {
  const [switchButton, setSwitchButton] = useState(true);
  const [input, setInput] = useState("");
  const location = useLocation();

  const { mutate: mutateAddVideo } = usePost({
    endpoint: "videos",
    key: "videos",
  });

  const { mutate: mutateAddTag } = usePost({
    endpoint: "tags",
    key: "tags",
  });

  function handleToggleClick() {
    setSwitchButton(!switchButton);
  }

  function handleCreateClick() {
    if (location.pathname === "/videos") {
      addVideo();
    } else if (location.pathname === "/tags") {
      createTag();
    }
    clearInput();
    handleToggleClick();
  }

  function createTag() {
    let tagObj = {
      tag: input,
      color: "gray",
    };
    console.log("hej");
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

  function buttonName(pathname) {
    if (pathname === "/videos") {
      return "Add new Video";
    } else if (pathname === "/tags") {
      return "Create new Tag";
    }
    return;
  }

  function placeholder(pathname) {
    if (pathname === "/videos") {
      return "Paste URL";
    } else if (pathname === "/tags") {
      return "Enter name";
    }
    return;
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
          {buttonName(location.pathname)}
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
            placeholder={placeholder(location.pathname)}
            id="input"
          />
        </InputGroup>
      )}
    </>
  );
}

export default CreationInput;
