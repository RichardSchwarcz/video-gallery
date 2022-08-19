import { Flex, Image, Link } from "@chakra-ui/react";
import React from "react";

function VideoCard({ url }) {
  function getYTID(url) {
    // https://www.youtube.com/watch?v=Y7cw-ziofkY&ab_channel=CodingShiksha
    // youtube video ID starts after `?v=` and ends before `&` => `Y7cw-ziofkY`
    // youtube video ID is 11 characters long
    return url.split("v=")[1].substring(0, 11);
  }

  function getImageSource(id) {
    // youtube thumbnail API
    return `https://img.youtube.com/vi/${id}/0.jpg`;
  }

  const src = getImageSource(getYTID(url));

  return (
    <Link href={url}>
      <Flex
        w="235px"
        h="200px"
        background="rgba(0,0,0,0.3)"
        borderRadius="var(--chakra-radii-md)"
        direction="column"
        justifyContent="space-between"
      >
        <Image
          h="150px"
          objectFit="cover"
          borderTopRadius="var(--chakra-radii-md)"
          src={src}
          alt="thumbnail"
        />
        <Flex
          h="50px"
          borderTop="1px solid black"
          justifyContent="left"
          alignItems="center"
        >
          Title
        </Flex>
      </Flex>
    </Link>
  );
}

export default VideoCard;
