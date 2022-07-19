import { useMutation, useQueryClient } from "react-query";
import { userApis } from "../api/user";

export function usePostApply() {
    const queryClient = useQueryClient();
    return useMutation(userApis.postApply, {
        onSuccess: () => {
            queryClient.invalidateQueries("applyproject"); 
          },
    })
}