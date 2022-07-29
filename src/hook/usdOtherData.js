import { useQuery } from "react-query";
import { othersApi } from "../api/others";

export function useGetOtherData(othernickname){
    return useQuery("otherData", ()=>{
        return othersApi.getOthersPage(othernickname)
    })
}