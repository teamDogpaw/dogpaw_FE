import { useQuery } from "react-query";
import styled from "styled-components";
import instance from "../shared/axios";
import { GrayLineBtn, LineBtn } from "../styles/style";

const ApplyList = ({
    postId
}) => {
    console.log(postId)

    const getApplyLists = async (postId) => {
        try{
            const response = await instance.get(`api/allApplicants/info/${postId}`)
            console.log(response)
            return response.data
        } catch(error) {
            console.log(error)
        }
    }

    const {isLoading, data, isError} = useQuery("applylists",getApplyLists)

    return(
        <ApplyListContent>
        신청자 명단
        {data}
        <div style={{display:"flex", flexDirection:"column"}}>
            <LineBtn>수락하기</LineBtn>
        <GrayLineBtn>거절하기</GrayLineBtn>
        </div>
        
        </ApplyListContent>
    )
}


const ApplyListContent = styled.div`
border: 1px solid #e2e2e2;
`;
export default ApplyList;