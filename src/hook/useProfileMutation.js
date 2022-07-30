import { useMutation, useQueryClient } from "react-query";
import { userApis } from "../api/user";

export function useMyProfileReset() {
    const queryClient = useQueryClient()
    return useMutation(userApis.putMyProfileReset,
        {
            onSuccess:()=>{
                queryClient.invalidateQueries("userInfo");
            }
        })
   
}

export function useMyProfileEdit() {
    return useMutation(userApis.putMyProfile)
}