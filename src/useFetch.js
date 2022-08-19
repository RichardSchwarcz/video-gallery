import { useState, useEffect } from "react";

function useFetch() {
  const [videos, setVideos] = useState([]);

  // fetch videos
  useEffect(() => {
    fetch("http://localhost:8000/videos")
      .then((response) => response.json())
      .then((json) => setVideos(json));
  }, []);

  // triggered after submit, to refetch updated list of videos
  function refetch() {
    fetch("http://localhost:8000/videos")
      .then((response) => response.json())
      .then((json) => setVideos(json));
  }

  return { videos, refetch };
}

export default useFetch;
