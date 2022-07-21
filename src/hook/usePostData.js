import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { postApis } from "../api/post";

export function useGetPost(postId) {
  return useQuery("detailPost", () => {
    return postApis.getPostList(postId);
  });
}

export function useDeletePost() {
  return useMutation(postApis.deletePost);
}

export function useGetBookmarkRank() {
  return useQuery("bookmarkRank",postApis.getBookmarkRank);
}

export function usePostDeadline(){
  return useMutation(postApis.postDeadlineProject);
}

export function useGetKeepPostList() {
  return useInfiniteQuery(
    "postList",
    ({ pageParam = 0 }) => postApis.getKeepPostList(pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
    }
  );
}