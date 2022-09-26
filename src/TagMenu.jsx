import React from "react";
import { useUpdate } from "./useQueries";

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
  const { mutate: mutateColor } = useUpdate({
    // change tag color
    key: "tags",
    endpoint: "tags",
    invalidate: true,
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
          />
          <InputRightElement>
            <IconButton icon={<CheckIcon />} size="xs" variant="ghost" />
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
