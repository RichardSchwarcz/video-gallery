import React, { useState } from "react";
import { useChangeColor, useRenameTag } from "./useTags";

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

function TagMenu({ element }) {
  const [rename, setRename] = useState("");
  const { mutate: mutateRename } = useRenameTag(element);
  const { mutate: mutateColor } = useChangeColor(element);

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
              onClick={() => mutateRename(rename)}
            />
          </InputRightElement>
        </InputGroup>

        <MenuOptionGroup title="Colors" type="radio">
          {colors.map((color) => {
            return (
              <MenuItemOption
                value={color}
                onClick={() => mutateColor(color)}
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
