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
import {
  getTaggedVideos,
  emptyInput,
  renameTagSet,
  tagIsAssigned,
} from "./updateTagSet";

function TagMenu({ element }) {
  const [renamedTag, setRenamedTag] = useState("");
  const outDatedTag = element.tag;

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

  function handleRename(renamedTag, outDatedTag) {
    const taggedVideos = getTaggedVideos(videoData, outDatedTag);
    if (!emptyInput(renamedTag)) {
      if (tagIsAssigned(taggedVideos)) {
        // Rename tag under every video and return updated array
        const updatedVideos = renameTagSet(
          getTaggedVideos(videoData, outDatedTag),
          outDatedTag,
          renamedTag
        );

        // Make patch requests for every video
        updatedVideos.forEach((video, index) => {
          // setTimeout solved server crashing
          // TODO find out how to tweak a server to get rid of a timeout
          setTimeout(() => {
            const updatedVideoTags = { tags: video.tags };
            mutateRenameAllTags({
              data: updatedVideoTags,
              elementID: video.id,
            });

            console.log(`renamed ${index + 1} out of ${updatedVideos.length}`);
            const isDone = index + 1 === updatedVideos.length;
            // At the end, rename tag in TagList
            if (isDone) {
              const updatedTagName = {
                tag: renamedTag,
              };

              mutateRenameTag({ data: updatedTagName, elementID: element.id });
            }
          }, index * 100);
        });
      } else {
        const updatedTagName = {
          tag: renamedTag,
        };

        mutateRenameTag({ data: updatedTagName, elementID: element.id });
      }
    } else {
      // TODO make component
      alert("empty input");
    }
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
            onChange={(e) => setRenamedTag(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              icon={<CheckIcon />}
              size="xs"
              variant="ghost"
              onClick={() => handleRename(renamedTag, outDatedTag)}
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
