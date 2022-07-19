import { useMutation, useQueryClient } from "react-query";
import { userApis } from "../api/user";

export function useMyProfileReset() {
    const queryClient = useQueryClient();
    return useMutation(userApis.putMyProfileReset, {
        onSuccess: () => {
            queryClient.invalidateQueries("userinfo"); // 새로 추가 요청을 했기 때문에 상한 쿼리는 무효화 시켜
          },
    })
}


export function useMyProfileEdit() {
    const queryClient = useQueryClient();
    return useMutation(userApis.putMyProfile, {
        onSuccess: () => {
            queryClient.invalidateQueries("userinfo"); // 새로 추가 요청을 했기 때문에 상한 쿼리는 무효화 시켜
          },
    })
}