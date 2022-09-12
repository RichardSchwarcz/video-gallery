import React from "react";

import {
  IconButton,
  Tag,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { MdMoreVert } from "react-icons/md";
import { DeleteIcon } from "@chakra-ui/icons";
import { useGetTags } from "./useTags";
import { useGetVideo, useUpdateTags } from "./useVideo";

function VideoMenu({ onOpen, elementID, tags }) {
  const { data: tagsData } = useGetTags();
  const { refetch } = useGetVideo();
  const { mutate: updateTags } = useUpdateTags();
  console.log(tags);

  function handleUpdateTags(newTag) {
    refetch();
    const oldTags = tags.slice();
    if (oldTags.includes(newTag)) {
      const updatedTags = oldTags.filter((item) => item !== newTag);
      updateTags({ updatedTags, elementID });
    } else {
      oldTags.push(newTag);
      const updatedTags = oldTags;
      updateTags({ updatedTags, elementID });
    }
  }

  return (
    // TODO chakra should remember which tags are assigned to video and
    // ! keep checkmark next to each tag
    <Menu closeOnSelect={false} isLazy>
      <MenuButton
        as={IconButton}
        icon={<MdMoreVert />}
        variant="ghost"
        size="xs"
      />
      <MenuList>
        <MenuItem
          icon={<DeleteIcon />}
          onClick={onOpen}
          _hover={{ bg: "red.200", boxShadow: "md" }}
        >
          Remove
        </MenuItem>
        <MenuItem onClick={() => refetch()}>Update</MenuItem>
        <MenuDivider />
        <MenuOptionGroup title="Tags" type="checkbox">
          {tagsData?.data.map((tag) => {
            return (
              <MenuItemOption
                value={tag.tag}
                key={tag.tag}
                onClick={() => handleUpdateTags(tag.tag)}
              >
                <Tag colorScheme={tag.color}>{tag.tag}</Tag>
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default VideoMenu;
