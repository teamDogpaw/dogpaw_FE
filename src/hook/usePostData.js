import { useMutation, useQuery } from "react-query";
import { postApis } from "../api/post";

export function useGetPost(postId) {
  return useQuery(["detailPost"], () => {
    return postApis.getPostList(postId);
  });
}

export function useDeletePost() {
  return useMutation(postApis.deletePost);
}

export function useGetBookmarkRank() {
  return useQuery("bookmarkRank",postApis.getBookmarkRank);
}
