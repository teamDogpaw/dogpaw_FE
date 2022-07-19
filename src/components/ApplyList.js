import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import instance from "../shared/axios";
import {
  Btn,
  GrayLineBtn,
  LineBtn,
  ListProfilePic,
  MypagePostBox,
  MyStack,
} from "../styles/style";
import profilepic from "../styles/icon/global/profile.svg";
import { useState } from "react";
import { useGetApplicantLists, useGetApplyLists } from "../hook/useProjectData";
import { useRejectApply } from "../hook/useProjectMutation";
import { ReactComponent as Empty } from "../styles/icon/global/pawLoading.svg"
const ApplyList = ({ myPostId }) => {

  console.log(myPostId);

  //✅
  // const getApplyLists = async () => {
  //   try {
  //     const response = await instance.get(`api/allApplicants/info/${myPostId}`);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const rejectionMutate = useMutation(async (userId) => {
    try {
      await instance.delete(`api/applicant/${userId}/rejection/${myPostId}`);
      alert("거절이 완료되었습니다!");
    } catch (error) {
      alert("잘못된 접근입니다");
    }
  });

  const acceptMutate = useMutation(async (userId) => {
    try {
      await instance.post(`api/applicant/${userId}/acceptance/${myPostId}`);
      alert("수락이 완료되었습니다!");
    } catch (error) {
      alert("잘못된 접근입니다");
    }
  });

  const { isLoading: isApplyListLoading , data: applyList } = useGetApplicantLists(myPostId)
  const { mutate : rejectApply } = useRejectApply()

  if (isApplyListLoading) {
    return <h1>loading...</h1>;
  }
  console.log(applyList)
  return (
    <>
    {applyList.data.length === 0 ? <EmptyBody>
    <EmptyImg />
    <br/>
    <span> 아직 신청자가 없어요! </span>
    </EmptyBody> : null}
      {applyList.data.map((applier) => {
        <ApplyListContent>
     
            <User>
              {applier.profileImg === null ? (
                <ListProfilePic src={profilepic} />
              ) : (
                <ListProfilePic src={applier.profileImg} />
              )}
              {applier.nickname}
              {applier.username}
            </User>
              <StackBody>
              {applier.stacks?.map((stack, index) => {
                return (
                <Stack key={index}>#{stack}</Stack>
                )
              })}
                </StackBody>
          <MyBtn>
            <LineBtn
              onClick={() => acceptMutate.mutate(applier.userId, myPostId)}
            >
              수락하기
            </LineBtn>
            <GrayLineBtn
              onClick={rejectApply(applier.userId, myPostId)}
            >
              거절하기
            </GrayLineBtn>
          </MyBtn>
        </ApplyListContent>

    })}

      
    </>
  );
};

export const ApplyListContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e2e2;
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 16px;

  img {
    margin-right: 5px;
  }
`;


export const EmptyBody = styled.div`
text-align: center;
margin: auto;
span{
  color:${(props) => props.theme.keyColor};
  font-size: 20px;
  font-weight: bold;
}
`;

export const EmptyImg = styled(Empty)`

width: 200px;
height: 200px;
`;

export const Section = styled.div`
  //width:70%;
`;
export const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;



export const StackBody = styled.div`
display: flex;
overflow: scroll;
`;

export const Stack = styled(MyStack)`
  margin-top: 10px;
`;

export const MyBtn = styled.div`
  display: flex;
  flex-direction: column;
  button {
    margin-bottom: 10px;
  }
`;
export default ApplyList;
