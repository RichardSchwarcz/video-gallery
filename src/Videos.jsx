import React from "react";
import { useGet } from "./useQueries";

import VideoCard from "./VideoCard";

function Videos() {
  const { data: videoData } = useGet({
    key: "videos",
    endpoint: "videos",
  });

  return (
    <>
      {videoData?.data.map((element) => {
        if (element.deleted === "false") {
          return <VideoCard key={element.url} video={element} />;
        } else {
          return null;
        }
      })}
    </>
  );
}

export default Videos;
