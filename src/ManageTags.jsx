import React, { useState } from "react";
import postToDB from "./postToDB";
import useFetch from "./useFetch";
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
  const { getDisclosureProps, getButtonProps } = useDisclosure();
  const [tag, setTag] = useState("");
  const { data, refetch } = useFetch("tags");

  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  async function handleClick() {
    let tagObj = {
      tag: tag,
      color: "gray",
    };
    await postToDB(tagObj, "tags");
    refetch();
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
      <TagList {...disclosureProps} data={data} />
    </>
  );
}

export default ManageTags;
