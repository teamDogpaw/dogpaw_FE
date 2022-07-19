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

const ApplyList = ({ myPostId }) => {
  console.log(myPostId);
  const getApplyLists = async () => {
    try {
      const response = await instance.get(`api/allApplicants/info/${myPostId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

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

  const { isLoading, data, isError } = useQuery([myPostId], getApplyLists);

  if (isLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      <h3>신청자 명단</h3>
      {data.map((applier) => {
        console.log(applier)
        return (
          <ApplyListContent>
            <Section>
              <User>
                {applier.profileImg === null ? (
                  <ListProfilePic src={profilepic} />
                ) : (
                  <ListProfilePic src={applier.profileImg} />
                )}
                {applier.nickname}
              </User>

              
                {applier.username}
                <Stacks>
                {applier.stacks?.map((stack, index) => {
                  
                  return <Stack key={index}>#{stack}</Stack>;
                })}
              </Stacks>
            </Section>

            <MyBtn>
              <LineBtn
                onClick={() => acceptMutate.mutate(applier.userId, myPostId)}
              >
                수락하기
              </LineBtn>
              <GrayLineBtn
                onClick={() => rejectionMutate.mutate(applier.userId, myPostId)}
              >
                거절하기
              </GrayLineBtn>
            </MyBtn>
          </ApplyListContent>
        );
      })}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div></div>
      </div>
    </>
  );
};

const ApplyListContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e2e2;
  padding: 16px;
  border-radius: 16px;
  margin : 16px 0;
  overflow-y:auto;

  img {
    margin-right: 10px;
  }
`;

const Section = styled.div`
  width:75%;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Stacks = styled.div`
  display:flex;
  overflow-x:auto;
  padding-bottom:10px;
 &::-webkit-scrollbar {
    width: 0px;
    height:9px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    border:1px solid #dadada;
    background: white;
  }

`;

const Stack = styled(MyStack)`
  margin-top: 10px;
`;

const MyBtn = styled.div`
  display: flex;
  flex-direction: column;
  button {
    margin-bottom: 10px;
  }
`;
export default ApplyList;
