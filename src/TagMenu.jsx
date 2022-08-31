import React, { useState } from "react";
import axios from "axios";

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

function TagMenu({ element, refetch }) {
  const [rename, setRename] = useState("");
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

  async function changeColor(color) {
    await axios.put(`http://localhost:8000/tags/${element.id}`, {
      ...element,
      color: color,
    });
    refetch();
  }

  async function putRename(rename) {
    await axios.put(`http://localhost:8000/tags/${element.id}`, {
      ...element,
      tag: rename,
    });
    refetch();
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
            onChange={(e) => setRename(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              icon={<CheckIcon />}
              size="xs"
              variant="ghost"
              onClick={() => putRename(rename)}
            />
          </InputRightElement>
        </InputGroup>

        <MenuOptionGroup title="Colors" type="radio">
          {colors.map((color) => {
            return (
              <MenuItemOption
                value={color}
                onClick={() => changeColor(color)}
                key={color}
              >
                <Tag colorScheme={color}>{color}</Tag>
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default TagMenu;
