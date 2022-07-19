import { useMutation, useQueryClient } from "react-query";
import { projectApis } from "../api/project";

export function useRejectApply() {
    const queryClient = useQueryClient();
    return useMutation((userId, postId) =>
        projectApis.rejectApply(userId,postId), {
        onSuccess: () => {
            queryClient.invalidateQueries("applyList");
          },
    })
};

export function useAcceptApply(userId, postId) {
    const queryClient = useQueryClient();
    return useMutation((userId,postId) =>
    projectApis.acceptApply(userId,postId),{
        onSuccess: () => {
            queryClient.invalidateQueries("applyList");
          },
    })
};

export function useExplusionMateMutation(){
    const queryClient = useQueryClient();
    return useMutation((userId, postId) =>
    projectApis.explusionMate(userId, postId),{
        onSuccess: () => {
            queryClient.invalidateQueries("applyList");
          },
    })
}