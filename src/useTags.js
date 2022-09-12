import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export function useGetTags() {
  return useQuery("tags", () => {
    return axios.get("http://localhost:8000/tags");
  });
}

export function useAddTag() {
  function postTag(tag) {
    return axios.post("http://localhost:8000/tags", tag);
  }

  const queryClient = useQueryClient();

  return useMutation(postTag, {
    onSuccess: () => {
      queryClient.invalidateQueries("tags");
    },
  });
}

export function useDeleteTags() {
  function deleteTag(elementId) {
    return axios.delete(`http://localhost:8000/tags/${elementId}`);
  }

  const queryClient = useQueryClient();

  return useMutation(deleteTag, {
    onSuccess: () => {
      queryClient.invalidateQueries("tags");
    },
  });
}

export function useChangeColor(element) {
  function changeColor(color) {
    return axios.put(`http://localhost:8000/tags/${element.id}`, {
      ...element,
      color: color,
    });
  }

  const queryClient = useQueryClient();

  return useMutation(changeColor, {
    onSuccess: () => {
      queryClient.invalidateQueries("tags");
    },
  });
}

export function useRenameTag(element) {
  function renameTag(rename) {
    return axios.put(`http://localhost:8000/tags/${element.id}`, {
      ...element,
      tag: rename,
    });
  }

  const queryClient = useQueryClient();

  return useMutation(renameTag, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
