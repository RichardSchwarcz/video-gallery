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
    <Menu flip="true" closeOnSelect={false} isLazy>
      <MenuButton
        as={IconButton}
        rightIcon={<ChevronDownIcon mr="2" />}
        variant="ghost"
        size="xs"
        w="5"
        // TODO get rid of `mr` and `w` workaround.
        // Arrow is not horizontaly centered within its background
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
          <MenuItemOption value="red" onClick={() => changeColor("red")}>
            <Tag colorScheme="red">red</Tag>
          </MenuItemOption>
          <MenuItemOption value="green" onClick={() => changeColor("green")}>
            <Tag colorScheme="green">green</Tag>
          </MenuItemOption>
          <MenuItemOption value="blue" onClick={() => changeColor("blue")}>
            <Tag colorScheme="blue">blue</Tag>
          </MenuItemOption>
          <MenuItemOption value="purple" onClick={() => changeColor("purple")}>
            <Tag colorScheme="purple">purple</Tag>
          </MenuItemOption>
          <MenuItemOption value="yellow" onClick={() => changeColor("yellow")}>
            <Tag colorScheme="yellow">yellow</Tag>
          </MenuItemOption>
          <MenuItemOption value="gray" onClick={() => changeColor("gray")}>
            <Tag colorScheme="gray">gray</Tag>
          </MenuItemOption>
          <MenuItemOption value="orange" onClick={() => changeColor("orange")}>
            <Tag colorScheme="orange">orange</Tag>
          </MenuItemOption>
          <MenuItemOption value="teal" onClick={() => changeColor("teal")}>
            <Tag colorScheme="teal">teal</Tag>
          </MenuItemOption>
          <MenuItemOption value="cyan" onClick={() => changeColor("cyan")}>
            <Tag colorScheme="cyan">cyan</Tag>
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default TagMenu;
