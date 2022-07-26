import styled from "styled-components";
import { GrayLineBtn, LineBtn, ListProfilePic, MyStack } from "../styles/style";
import profilepic from "../styles/icon/global/profile.svg";
import { useGetApplicantLists } from "../hook/useProjectData";
import { useAcceptApply, useRejectApply } from "../hook/useProjectMutation";
import { ReactComponent as Empty } from "../styles/icon/global/pawLoading.svg";
const ApplyList = ({ myPostId }) => {
  const { isLoading: isApplyListLoading, data: applyList } =
    useGetApplicantLists(myPostId);
  const { mutate: rejectApply } = useRejectApply();
  const { mutate: acceptApply } = useAcceptApply();

  const reject = async (data) => {
    await rejectApply(data);
    alert("거절이 완료되었습니다!");
  };

  const accept = async (data) => {
    await acceptApply(data);
    alert("수락이 완료되었습니다!");
  };

  if (isApplyListLoading) {
    return (
      <EmptyBody>
        <EmptyImg />
        <br />
        <span> Loading . . . </span>
      </EmptyBody>
    );
  }

  return (
    <>
      {applyList.data.length === 0 ? (
        <EmptyBody>
          <EmptyImg />
          <br />
          <span> 아직 신청자가 없어요! </span>
        </EmptyBody>
      ) : null}
      {applyList.data.map((applier) => {
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
                onClick={() =>
                  accept({ userId: applier.userId, postId: myPostId })
                }
              >
                수락하기
              </LineBtn>
              <GrayLineBtn
                onClick={() =>
                  reject({ userId: applier.userId, postId: myPostId })
                }
              >
                거절하기
              </GrayLineBtn>
            </MyBtn>
          </ApplyListContent>
        );
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
  line-height: normal;

  img {
    margin-right: 5px;
  }
`;

export const EmptyBody = styled.div`
  text-align: center;
  margin: auto;
display: flex;
flex-direction:column;

align-items: center;
gap: 10px;
  span {
    font-family: "GongGothicBold";
    color: ${(props) => props.theme.keyColor};
    font-size: 20px;
    font-weight: bold;
  }
`;

export const EmptyImg = styled(Empty)`
  width: 200px;
  height: 200px;
`;

export const Section = styled.div`
  width: 75%;
`;
export const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Stacks = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 10px;
  width: 100%;
  &::-webkit-scrollbar {
    width: 0px;
    height: 9px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    border: 1px solid #dadada;
    background: white;
  }
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
