import { useGet } from "./useQueries";

import { Flex, Tag } from "@chakra-ui/react";

import TagMenu from "./TagMenu";
import DeleteTag from "./DeleteTag";
import filterTags from "./filterTags";

function Tags({ query }) {
  const { data: tagsData } = useGet({
    key: "tags",
    endpoint: "tags",
  });

  return (
    <Flex
      flexDir="column"
      w="300px"
      mx="auto"
      p="5"
      border="1px solid gray"
      borderRadius="15px"
    >
      {filterTags(query, tagsData).map((element) => {
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
  );
}

export default Tags;
