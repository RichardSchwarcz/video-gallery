import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(endpoint) {
  const [data, setData] = useState([]);

  // fetch videos
  useEffect(() => {
    axios
      .get(`http://localhost:8000/${endpoint}`)
      .then((response) => setData(response.data));
  }, []);

  // triggered after submit, to refetch updated list of videos
  function refetch() {
    axios
      .get(`http://localhost:8000/${endpoint}`)
      .then((response) => setData(response.data));
  }

  return { data, refetch };
}

export default useFetch;
