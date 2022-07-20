import { useMutation } from "react-query";
import { postApis } from "../api/post";

export function usePostProject() {
    return useMutation(postApis.postProject)
}

export function useEditProject() {
    return useMutation((data) => postApis.editProject(data))
}