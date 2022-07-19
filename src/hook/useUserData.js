import { useMutation, useQuery } from "react-query";
import { userApis } from "../api/user";

export function useGetBookmarkRank() {
  return useQuery(["bookmarkRank"], () => {
    return userApis.getBookmarkRank();
  });
}

export function usePostBookmark() {
  return useMutation((data) => {
    return userApis.postBookmark(data);
  });
}

export function usePostApply() {
  return useMutation((data) => {
    return userApis.postApply(data);
  });
}


