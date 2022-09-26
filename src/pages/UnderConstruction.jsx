import { Flex, Text } from "@chakra-ui/react";
function UnderConstruction() {
  return (
    <Flex
      mx="auto"
      mt="20"
      bg="red.300 "
      w="80"
      justifyContent="center"
      h="20"
      alignItems="center"
      rounded="lg"
    >
      <Text as="b" fontSize="xl">
        Sorry, I'm working on that :)
      </Text>
    </Flex>
  );
}

export default UnderConstruction;
