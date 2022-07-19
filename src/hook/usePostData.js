import { useMutation, useQuery } from "react-query";
import {  postApiss } from "../api/post";

export function useGetPost(postId) {
    return useQuery(["detailPost"], () => {
      return postApiss.getPostList(postId);
    });
  }

export function useDeletePost(){
  return useMutation(postId => {
    return postApiss.deletePost(postId)
  });
}