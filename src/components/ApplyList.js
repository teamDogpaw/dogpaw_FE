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
      신청자 명단
      {data.map((applier) => {
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

              <Div>
                {applier.username}

                {applier.stacks?.map((stack, index) => {
                  return <Stack key={index}>#{stack}</Stack>;
                })}
              </Div>
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
  margin-bottom: 16px;

  img {
    margin-right: 5px;
  }
`;

const Section = styled.div`
  //width:70%;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Div = styled.div`
  //display:flex;
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
