import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export function useAddVideo() {
  function postVideo(video) {
    return axios.post("http://localhost:8000/videos", video);
  }

  const queryClient = useQueryClient();

  return useMutation(postVideo, {
    onSuccess: () => {
      queryClient.invalidateQueries("videos");
    },
  });
}

export function useGetVideo() {
  return useQuery(
    "videos",
    () => {
      return axios.get("http://localhost:8000/videos");
    },
    {
      enabled: false,
    }
  );
}

export function useRemoveVideo() {
  function removeVideo(elementID) {
    return axios.patch(`http://localhost:8000/videos/${elementID}`, {
      deleted: "true",
    });
  }

  const queryClient = useQueryClient();

  return useMutation(removeVideo, {
    onSuccess: () => {
      queryClient.invalidateQueries("videos");
    },
  });
}

export function useUpdateTags() {
  function patch(obj) {
    const updatedTags = obj.updatedTags;
    const elementID = obj.elementID;

    axios.patch(`http://localhost:8000/videos/${elementID}`, {
      tags: updatedTags,
    });
  }

  // const queryClient = useQueryClient();

  return useMutation(patch);
  // onSuccess: () => {
  //   queryClient.invalidateQueries("videos");
  // },);
}
