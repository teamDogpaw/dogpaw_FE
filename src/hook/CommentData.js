import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const getCommentList = () => {
  return axios.get("http://localhost:5001/comment/");
};
const addComment = (comment) => {
  return axios.post("http://localhost:5001/comment/", comment);
};
const removeComment = (id) => {
    return axios.delete("http://localhost:5001/comment", id);
  };
const editComment = (id) => {
    return axios.put("http://localhost:5001/comment", id);
};

export const useCommentData = (onSuccess, onError) => {
  return useQuery("commentList", getCommentList, {
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
  });
};

export const useAddCommentData = () => {
  const queryClient = useQueryClient();
  return useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("commentList"); // 새로 추가 요청을 했기 때문에 상한 쿼리는 무효화 시켜
    },
  });
};

export const useDeleteCommentData = () => {
  return useMutation(removeComment);
};

export const useEditCommentData = () => {
    return useMutation(removeComment);
  };
