import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export function usePost({ endpoint, key }) {
  function post(data) {
    return axios.post(`http://localhost:8000/${endpoint}`, data);
  }

  const queryClient = useQueryClient();

  return useMutation(post, {
    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },
  });
}

export function useGet({ enableQuery = true, key, endpoint }) {
  return useQuery(
    key,
    () => {
      return axios.get(`http://localhost:8000/${endpoint}`);
    },
    {
      enabled: enableQuery,
    }
  );
}

export function useDelete({ key, endpoint }) {
  function deleteElement(elementID) {
    return axios.delete(`http://localhost:8000/${endpoint}/${elementID}`);
  }

  const queryClient = useQueryClient();

  return useMutation(deleteElement, {
    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },
  });
}

export function useUpdate({ key, endpoint, invalidate }) {
  function patch({ data, elementID }) {
    return axios.patch(`http://localhost:8000/${endpoint}/${elementID}`, data);
  }
  const queryClient = useQueryClient();

  return useMutation(patch, {
    onSuccess: () => {
      if (invalidate) {
        queryClient.invalidateQueries(key);
      } else {
        return null;
      }
    },
  });
}
