import { useQuery } from "react-query";
import { othersApi } from "../api/others";

export function useGetOtherData(nickname){
    return useQuery("otherData", ()=>{
        return othersApi.getOthersPage(nickname)
    })
}