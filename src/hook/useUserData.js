import { useMutation, useQuery } from "react-query";
import { bookmarkApis, userApis } from "../api/user";

export function useGetBookmarkRank() {
  return useQuery(["bookmarkRank"], () => {
    return bookmarkApis.getBookmarkRank();
  });
}

export function usePostBookmark() {
  return useMutation((data) => {
    return bookmarkApis.postBookmark(data);
  });
}

export function usePostApply() {
  return useMutation((data) => {
    return bookmarkApis.postApply(data);
  });
}


