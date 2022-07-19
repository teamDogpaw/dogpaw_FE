import { useMutation } from "react-query";
import { userApis } from "../api/user";

export function usePostBookmark() {
  return useMutation(userApis.postBookmark);
}

 
