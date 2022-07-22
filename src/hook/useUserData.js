import { useMutation, useQueryClient } from "react-query";
import { userApis } from "../api/user";

export function usePostBookmark() {
  const queryClient = useQueryClient();
  return useMutation(userApis.postBookmark, 
    {onSuccess: () => {
          queryClient.invalidateQueries("applyproject");
          queryClient.invalidateQueries("joinproject");
          queryClient.invalidateQueries("mybookmark");
        },
  });
}

export function useWithdrawPartici() {
  const queryClient = useQueryClient();
  return useMutation(userApis.withdrawParticipate,
    {onSuccess:()=>{
      queryClient.invalidateQueries("joinproject");
    }
  })
}

