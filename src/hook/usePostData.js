import { useMutation, useQuery } from "react-query";
import {  PostApis } from "../api/post";

export function useGetPost(postId) {
    return useQuery(["detailPost"], () => {
      return PostApis.getPostList(postId);
    });
  }

export function useDeletePost(){
  return useMutation(postId => {
    return PostApis.deletePost(postId)
  });
}