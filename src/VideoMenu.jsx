import React from "react";
import { useGet, useUpdate } from "./useQueries";

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

function VideoMenu({ onOpen, elementID, elementTags }) {
  const { data: tagsData } = useGet({
    enableQuery: false,
    key: "tags",
    endpoint: "tags",
  });

  const { mutate: mutateUpdateTagList } = useUpdate({
    key: "videos",
    endpoint: "videos",
    invalidate: "true",
  });

  function handleUpdateTags(newTag) {
    const oldTags = elementTags.slice();

    if (oldTags.includes(newTag)) {
      const updatedTagsArray = oldTags.filter((item) => item !== newTag);
      const data = { tags: updatedTagsArray };

      mutateUpdateTagList({ data: data, elementID: elementID });
    } else {
      oldTags.push(newTag);
      const updatedTagsArray = oldTags;
      const data = { tags: updatedTagsArray };

      mutateUpdateTagList({ data: data, elementID: elementID });
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
