import React from "react";
import { Flex, Image, Link, useDisclosure } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import RemoveModal from "./RemoveModal";
import thumbnailSource from "./thumbnailSource";

function VideoCard({ url }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const src = thumbnailSource(url);

  return (
    <>
      <Flex
        position="relative"
        w="235px"
        h="200px"
        bg="gray.400"
        rounded="lg"
        direction="column"
        justifyContent="space-between"
      >
        <SmallCloseIcon
          onClick={onOpen}
          position="absolute"
          top="2px"
          right="2px"
          _hover={{
            border: "2px",
            borderRadius: "5px",
            bg: "red",
          }}
        />
        <Link href={url} isExternal>
          <Image
            //thumbnail size is 1280x720. To scale it properly with fixed width... (235*720)/1280 = 132.2
            h="132.2px"
            w="235px"
            objectFit="cover"
            roundedTop="lg"
            src={src}
            alt="thumbnail"
          />
          <Flex h="50px" justifyContent="left" alignItems="center">
            Title
          </Flex>
        </Link>
        <RemoveModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </>
  );
}

export default VideoCard;
