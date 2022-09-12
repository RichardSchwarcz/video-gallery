import React, { useState } from "react";
import { useAddVideo } from "./useVideo";

import {
  Button,
  Flex,
  IconButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { ChevronDownIcon, AddIcon } from "@chakra-ui/icons";

function AddVideo() {
  const [url, setUrl] = useState("");
  const { mutate } = useAddVideo();

  const { getDisclosureProps, getButtonProps } = useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  function handleChange(e) {
    setUrl(e.target.value);
  }

  function handleClick() {
    const video = {
      name: "",
      url: url,
      tags: [],
      deleted: "false",
    };
    mutate(video);
    const urlInput = document.getElementById("urlInput");
    urlInput.value = "";
  }

  /* TODO 
??? button props
??? disclosure props
*/

  return (
    <>
      <Button variant="ghost" {...buttonProps} justifyContent="flex-start">
        <ChevronDownIcon mr="4" />
        Add new video
      </Button>
      <Flex {...disclosureProps}>
        <IconButton icon={<AddIcon />} onClick={handleClick} variant="ghost" />
        <Input
          ml="4"
          variant="flushed"
          placeholder="Paste video URL"
          onChange={handleChange}
          id="urlInput"
        />
      </Flex>
    </>
  );
}

export default AddVideo;
