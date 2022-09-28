import { Flex, Text } from "@chakra-ui/react";
function UnderConstruction() {
  return (
    <Flex
      mx="auto"
      mt="20"
      bg="red.100 "
      w="96"
      justifyContent="center"
      h="20"
      alignItems="center"
      rounded="lg"
      textAlign="center"
    >
      <Text as="b" fontSize="xl">
        Sorry,
        <br /> page under construction 👷
      </Text>
    </Flex>
  );
}

export default UnderConstruction;
