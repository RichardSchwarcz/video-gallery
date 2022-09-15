import React, { useState } from "react";
import { useGet, useUpdate } from "./useQueries";

import {
  IconButton,
  Input,
  Tag,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ChevronDownIcon, CheckIcon } from "@chakra-ui/icons";
import { useQueryClient } from "react-query";

function TagMenu({ element }) {
  const [rename, setRename] = useState("");

  const { mutate: mutateColor } = useUpdate({
    // change tag color
    key: "tags",
    endpoint: "tags",
    invalidate: true,
  });

  const { mutate: mutateRenameTag } = useUpdate({
    // rename tag
    key: "tags",
    endpoint: "tags",
    invalidate: true,
  });

  const { mutate: mutateRenameAllTags } = useUpdate({
    // rename tags assigned to videos
    key: "videos",
    endpoint: "videos",
    invalidate: false,
  });

  const { data: videoData } = useGet({
    key: "videos",
    endpoint: "videos",
    enableQuery: false,
  });

  const queryClient = useQueryClient();

  const colors = [
    "red",
    "green",
    "blue",
    "purple",
    "yellow",
    "gray",
    "orange",
    "teal",
    "cyan",
  ];

  function findTaggedVideos() {
    // find all videos which have element.tag and return them
    return videoData?.data
      .map((video) => {
        if (video.tags.includes(element.tag)) {
          return video;
        } else {
          return null;
        }
      })
      .filter((tag) => tag != null);
  }

  function emptyInput(rename) {
    if (rename === "") {
      return true;
    } else {
      return false;
    }
  }

  function handleRename(rename) {
    if (!emptyInput(rename)) {
      const updatedVideos = replaceTags(findTaggedVideos());
      // Rename tag under every video

      updatedVideos.forEach((video, i) => {
        setTimeout(() => {
          const updatedVideoTags = { tags: video.tags };

          mutateRenameAllTags({
            data: updatedVideoTags,
            elementID: video.id,
          });

          // console.log(i, "Delayed for 100ms");
          console.log(`renaming ${i + 1} out of ${updatedVideos.length}`);
          const isDone = i + 1 === updatedVideos.length;
          if (isDone) {
            const updatedTagName = {
              tag: rename,
            };

            mutateRenameTag({ data: updatedTagName, elementID: element.id });
          }
        }, i * 100);
      });
    } else {
      alert("empty input");
    }
  }

  function replaceTags(taggedVideos) {
    // taggedVideos: array of objects
    taggedVideos.forEach((video) => {
      const toRenameIndex = video.tags.indexOf(element.tag);
      video.tags[toRenameIndex] = rename;
    });
    return taggedVideos;
    // returns array of objects (videos)
  }

  return (
    <Menu closeOnSelect={false} isLazy>
      <MenuButton
        as={IconButton}
        icon={<ChevronDownIcon />}
        variant="ghost"
        size="xs"
      />
      <MenuList>
        <InputGroup>
          <Input
            px="4"
            variant="flushed"
            placeholder="Rename"
            //TODO prefill existing name
            // on click close popup
            onChange={(e) => setRename(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              icon={<CheckIcon />}
              size="xs"
              variant="ghost"
              onClick={() => handleRename(rename)}
            />
          </InputRightElement>
        </InputGroup>

        <MenuOptionGroup title="Colors" type="radio">
          {colors.map((color) => {
            const updatedColor = { color: color };
            return (
              <MenuItemOption
                value={color}
                onClick={() =>
                  mutateColor({ data: updatedColor, elementID: element.id })
                }
                key={color}
              >
                <Tag colorScheme={color} size="sm" mx="4" mt="2px">
                  {element.tag}
                </Tag>
                {color}
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default TagMenu;
