import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(endpoint) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch videos
  useEffect(() => {
    axios
      .get(`http://localhost:8000/${endpoint}`)
      .then((response) => setData(response.data))
      .finally(() => setIsLoading(false));
  }, []);

  // triggered after submit, to refetch updated list of videos
  function refetch() {
    axios
      .get(`http://localhost:8000/${endpoint}`)
      .then((response) => setData(response.data));
  }

  return { data, refetch, isLoading };
}

export default useFetch;
