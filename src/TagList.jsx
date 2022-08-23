import {
  Flex,
  IconButton,
  Input,
  Tag,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon, SmallCloseIcon } from "@chakra-ui/icons";

function TagList({ data, ...disclosureProps }) {
  // async function remove(element, type) {
  //     await axios.put(`http://localhost:8000/${type}/${element.id}`, {
  //       ...element,
  //       deleted: "Deleted",
  //     });
  //     await refetch(type);
  //   }

  function handleRemove(e) {
    e.preventdefault();
  }

  return (
    <Box {...disclosureProps}>
      {data.map((element) => {
        return (
          <Flex
            key={element.tag}
            justifyContent="space-between"
            // TODO on hover bg
            // bg="red"
            mx="10"
            my="2"
          >
            <Flex justifyContent="flex-start">
              <IconButton
                icon={<SmallCloseIcon />}
                variant="ghost"
                size="xs"
                // TODO on hover Red
              />
              <Tag colorScheme={element.color} w="fit-content">
                {element.tag}
              </Tag>
            </Flex>
            <Menu closeOnSelect={false}>
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
                <Input px="4" variant="flushed" placeholder="Rename" />

                <MenuOptionGroup title="Colors" type="radio">
                  <MenuItemOption
                    value="red"
                    onClick={() => console.log("red")}
                  >
                    <Tag colorScheme="red">red</Tag>
                  </MenuItemOption>
                  <MenuItemOption value="green">
                    <Tag colorScheme="green">green</Tag>
                  </MenuItemOption>
                  <MenuItemOption value="blue">
                    <Tag colorScheme="blue">blue</Tag>
                  </MenuItemOption>
                  <MenuItemOption value="purple">
                    <Tag colorScheme="purple">purple</Tag>
                  </MenuItemOption>
                  <MenuItemOption value="yellow">
                    <Tag colorScheme="yellow">yellow</Tag>
                  </MenuItemOption>
                  <MenuItemOption value="gray">
                    <Tag colorScheme="gray">gray</Tag>
                  </MenuItemOption>
                  <MenuItemOption value="orange">
                    <Tag colorScheme="orange">orange</Tag>
                  </MenuItemOption>
                  <MenuItemOption value="teal">
                    <Tag colorScheme="teal">teal</Tag>
                  </MenuItemOption>
                  <MenuItemOption value="cyan">
                    <Tag colorScheme="cyan">cyan</Tag>
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Flex>
        );
      })}
    </Box>
  );
}

export default TagList;
