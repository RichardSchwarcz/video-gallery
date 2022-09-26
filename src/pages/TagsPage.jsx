import React from "react";
import { useGet } from "../useQueries";
import { Flex, Tag } from "@chakra-ui/react";

import SearchBar from "../SearchBar";
import TagMenu from "../TagMenu";
import DeleteTag from "../DeleteTag";

function TagsPage() {
  const { data: tagsData } = useGet({
    key: "tags",
    endpoint: "tags",
  });
  return (
    <Flex
      justifyContent="center"
      flexDir="column"
      maxW="1000px"
      mx="auto"
      alignItems="center"
    >
      <SearchBar
        placeholder={"./tags/"}
        leftPadding={"4.25rem"}
        width={"300px"}
      />
      <Flex w="100%" flexWrap="wrap" gap={5}>
        <Flex
          flexDir="column"
          w="300px"
          mx="auto"
          p="5"
          border="1px solid gray"
          borderRadius="15px"
        >
          {tagsData?.data.map((element) => {
            return (
              <Flex
                key={element.tag}
                justifyContent="space-between"
                // TODO on hover bg
                my="2"
              >
                <Flex justifyContent="flex-start">
                  <DeleteTag element={element} />
                  <Tag size="lg" colorScheme={element.color} w="fit-content">
                    {element.tag}
                  </Tag>
                </Flex>
                {/* Drop down menu next to tag */}
                <TagMenu element={element} />
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default TagsPage;
