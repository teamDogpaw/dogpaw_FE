import styled from 'styled-components';
import {
  ApplyListContent,
  GrayLineBtn,
  LineBtn,
  ListProfilePic,
  MyStack,
} from '../../styles/style';
import profilepic from '../../styles/icon/global/profile.svg';
import { useGetApplicantLists } from '../../hook/useProjectData';
import { useAcceptApply, useRejectApply } from '../../hook/useProjectMutation';
import { ReactComponent as Empty } from '../../styles/icon/global/pawLoading.svg';
import AlertModal from './AlertModal';
import EmptyPage from '../emptyPage';
import { useState } from 'react';

const ApplyList = ({ myPostId }) => {
  const { isLoading: isApplyListLoading, data: applyList } =
    useGetApplicantLists(myPostId);
  const { mutate: rejectApply } = useRejectApply();
  const { mutate: acceptApply } = useAcceptApply();
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const reject = async (data) => {
    setAlertMessage('거절이 완료되었습니다.');
    setAcceptModalOpen(true);
    await rejectApply(data);
  };

  const accept = async (data) => {
    setAlertMessage('수락이 완료되었습니다.');
    setAcceptModalOpen(true);
    console.log(acceptModalOpen);
    await acceptApply(data);
  };

  const closeModal = () => {
    setAcceptModalOpen(false);
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
      <AlertModal
        open={acceptModalOpen}
        message={alertMessage}
        setAlertModalOpen={closeModal}
      />
      {applyList.data.length === 0 ? (
        <EmptyPage message={'아직 신청자가 없어요!'} />
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

export const EmptyBody = styled.div`
  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 10px;
  span {
    font-family: 'GongGothicBold';
    color: ${(props) => props.theme.keyColor};
    font-size: 1.25rem;
    font-weight: bold;

    @media screen and (max-width: 600px) {
      font-size: 1rem;
    }
  }
`;

export const EmptyImg = styled(Empty)`
  width: 200px;
  height: 200px;
  @media screen and (max-width: 600px) {
    width: 100px;
    height: 100px;
  }
`;

export const Section = styled.div`
  width: 75%;

  &.partici {
    width: 100%;
  }
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
