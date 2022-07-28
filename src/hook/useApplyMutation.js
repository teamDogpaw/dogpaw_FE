import { useMutation, useQueryClient } from "react-query";
import { userApis } from "../api/user";

export function usePostApply() {
    const queryClient = useQueryClient();
    return useMutation(userApis.postApply, {
        onSuccess: () => {
            queryClient.invalidateQueries("applyproject"); 
            queryClient.invalidateQueries("detailPost"); 
          },
          onError:()=>{
            alert("해당 모집글의 정원이 다 찼습니다")
          }
    })
}