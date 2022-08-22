import { useState, useEffect } from "react";
import axios from "axios";

function useFetch() {
  const [videos, setVideos] = useState([]);

  // fetch videos
  useEffect(() => {
    axios
      .get("http://localhost:8000/videos")
      .then((response) => setVideos(response.data));
  }, []);

  // triggered after submit, to refetch updated list of videos
  function refetch() {
    axios
      .get("http://localhost:8000/videos")
      .then((response) => setVideos(response.data));
  }

  return { videos, refetch };
}

export default useFetch;
