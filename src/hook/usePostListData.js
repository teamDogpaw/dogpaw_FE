import { useQuery } from "react-query";
import { postApiss } from "../api/post";

export function useGetMyBookmarkPost() {
    return useQuery("mybookmark", postApiss.getMyBookmarkPost,
        {refetchOnWindowFocus: false,
        onSuccess: (data) => {
            const actualData = data.data
                return actualData
            }, onError: (error) => {
                alert(error)
            }
        })
};

export function useGetMyParticipatePost() {
    return useQuery("joinproject", postApiss.getMyParticipatePost,
    {refetchOnWindowFocus: false,
        onSuccess: (data) => {
            const actualData = data.data
                return actualData
            }, onError: (error) => {
                alert(error)
            }
    })
}

export function useGetMyApplyPost() {
    return useQuery("applyproject", postApiss.getMyApplyPost,
    {refetchOnWindowFocus: false,
        onSuccess: (data) => {
            const actualData = data.data
                return actualData
            }, onError: (error) => {
                alert(error)
            }
    })
}

export function useGetMyProjectPost() {
    return useQuery("myproject", postApiss.getMyProjectPost,
    {refetchOnWindowFocus: false,
        onSuccess: (data) => {
            const actualData = data.data
                return actualData
            }, onError: (error) => {
                alert(error)
            }
    })
}