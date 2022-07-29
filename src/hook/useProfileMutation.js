import { useMutation, useQueryClient } from "react-query";
import { userApis } from "../api/user";

export function useMyProfileReset() {
    return useMutation(userApis.putMyProfileReset)
}

export function useMyProfileEdit() {
    return useMutation(userApis.putMyProfile)
}