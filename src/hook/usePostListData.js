import { useQuery } from "react-query";
import { postApis } from "../api/post";

export function useGetMyBookmarkPost() {
    return useQuery("mybookmark", postApis.getMyBookmarkPost,
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
    return useQuery("joinproject", postApis.getMyParticipatePost,
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
    return useQuery("applyproject", postApis.getMyApplyPost,
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
    return useQuery("myproject", postApis.getMyProjectPost,
    {refetchOnWindowFocus: false,
        onSuccess: (data) => {
            const actualData = data.data
                return actualData
            }, onError: (error) => {
                alert(error)
            }
    })
}