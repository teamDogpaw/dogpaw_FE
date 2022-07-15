import { useQuery } from "react-query";
import { detailApis } from "../api/detail";

export default function useDetailQuery(postId) {
    return useQuery(["detailpost"], () => {
      return detailApis.getPostList(postId);
    });
    
  }
