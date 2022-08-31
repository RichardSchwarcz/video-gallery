import React from "react";
import axios from "axios";

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
import useFetch from "./useFetch";

function VideoMenu({ element, refetch, onOpen }) {
  const { data: tagsData } = useFetch("tags");

  async function putTag(tag, element) {
    await axios.put(`http://localhost:8000/videos/${element.id}`, {
      ...element,
      tags: tag,
    });
    refetch(); // videos
  }

  function handleClick(tag, element) {
    const dbTags = element.tags.slice();
    if (dbTags.includes(tag)) {
      const filtered = dbTags.filter((item) => item !== tag);
      putTag(filtered, element);
    } else {
      dbTags.push(tag);
      putTag(dbTags, element);
    }
  }

  return (
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
          {tagsData.map((tag) => {
            return (
              <MenuItemOption
                value={tag.tag}
                key={tag.tag}
                onClick={() => handleClick(tag.tag, element)}
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
