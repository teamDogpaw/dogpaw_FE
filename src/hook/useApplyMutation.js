import { useMutation, useQueryClient } from "react-query";
import { userApis } from "../api/user";

export function usePostApply() {
    const queryClient = useQueryClient();
    return useMutation(userApis.postApply, {
        onSuccess: () => {
            queryClient.invalidateQueries("applyproject"); // 새로 추가 요청을 했기 때문에 상한 쿼리는 무효화 시켜
          },
    })
}