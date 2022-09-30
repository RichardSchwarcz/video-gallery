import React, { useState, useEffect, useRef } from "react";

import { useGet } from "./useQueries";

import { Input, Flex, Tag, VStack } from "@chakra-ui/react";

function Filter({ setTags }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const { data: tagsData } = useGet({
    key: "tags",
    endpoint: "tags",
  });

  useEffect(() => {
    function closeDropdown(e) {
      if (e.target !== inputRef.current) {
        setShowDropdown(false);
      }
    }

    document.body.addEventListener("click", closeDropdown);
    return () => {
      document.body.removeEventListener("click", closeDropdown);
    };
  }, [showDropdown]);

  return (
    <Flex direction="column" w="235px" position="relative">
      <Input
        ref={inputRef}
        placeholder="Filter"
        borderRadius="16px"
        borderColor="gray.500"
        onClick={() => setShowDropdown(true)}
      />
      {showDropdown && (
        <VStack
          ref={menuRef}
          position="absolute"
          top="50px"
          bg="white"
          zIndex="overlay"
          w="235px"
          border="1px"
          borderRadius="16px"
          borderColor="gray.400"
          p="2"
          alignItems="flex-start"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {tagsData?.data.map((element) => {
            return (
              <Flex
                key={element.tag}
                w="100%"
                p="1"
                justifyContent="space-between"
                borderRadius="0.375rem"
                _hover={{
                  background: "gray.50",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setTags((tag) => [...tag, element]);
                }}
              >
                <Tag colorScheme={element.color}>{element.tag}</Tag>
              </Flex>
            );
          })}
        </VStack>
      )}
    </Flex>
  );
}

export default Filter;
