import { Flex, Text } from "@chakra-ui/react";
function SomeDefaultHomePage() {
  return (
    <Flex
      mx="auto"
      mt="20"
      bg="red.300 "
      w="60"
      justifyContent="center"
      h="20"
      alignItems="center"
      rounded="lg"
    >
      <Text as="b" fontSize="xl">
        Hello there!
      </Text>
    </Flex>
  );
}

export default SomeDefaultHomePage;
