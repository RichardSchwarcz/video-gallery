import React, { useState } from "react";
import { useAddTag } from "./useTags";
import {
  Button,
  Flex,
  IconButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { ChevronDownIcon, AddIcon } from "@chakra-ui/icons";
import TagList from "./TagList";

function ManageTags() {
  const [tag, setTag] = useState("");
  const { mutate: mutateAddTag } = useAddTag();

  const { getDisclosureProps, getButtonProps } = useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  function handleClick() {
    let tagObj = {
      tag: tag,
      color: "gray",
    };
    mutateAddTag(tagObj);
    const tagInput = document.getElementById("tagInput");
    tagInput.value = "";
  }

  function handleChange(e) {
    setTag(e.target.value);
  }

  return (
    <>
      <Button variant="ghost" {...buttonProps} justifyContent="flex-start">
        <ChevronDownIcon mr="4" />
        Manage Tags
      </Button>

      <Flex {...disclosureProps}>
        <IconButton icon={<AddIcon />} onClick={handleClick} variant="ghost" />
        <Input
          ml="4"
          variant="flushed"
          placeholder="Add new Tag"
          onChange={handleChange}
          id="tagInput"
        />
      </Flex>
      <TagList {...disclosureProps} />
    </>
  );
}

export default ManageTags;
