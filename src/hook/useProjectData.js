import { useQuery } from "react-query"
import { projectApis } from "../api/project"



export function useGetApplicantLists(postId) {
    return useQuery(["applyList", postId], () => projectApis.getApplicantLists(postId),
        {refetchOnWindowFocus: false,
        onSuccess: (data) => {
            //console.log(data)
                return data
            }, onError: (error) => {
                alert(error)
            }
        })
};

export function useGetParticipantsLists(postId) {
    return useQuery(["teamList",postId], () => projectApis.getParticipantsLists(postId),{
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            //console.log(data)
                return data
            }, onError: (error) => {
                alert(error)
            }
    })
}