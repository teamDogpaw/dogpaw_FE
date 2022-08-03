import { useState } from 'react';
import { Btn, LineBtn } from '../styles/style';
import styled, { css, keyframes } from 'styled-components';
import { useQueryClient } from 'react-query';
import { usePostApply } from '../hook/useApplyMutation';
import ViewApply from './common/ViewApply';
import AlertModal from '../components/common/AlertModal';
import { usePostDeadline } from '../hook/usePostData';

const ApplyBtn = ({ myPostData }) => {
  const [isHover, setIsHover] = useState(false);
  const [viewApply, setViewApply] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [applyModal, setApplyModal] = useState(false);
  const userStatus = myPostData.userStatus;
  const id = myPostData.postId;
  const applierCnt = myPostData.applierCnt;
  const deadline = myPostData.deadline;

  const queryClient = useQueryClient();
  const { mutateAsync: apply } = usePostApply();
  const { mutateAsync: deadlinePost } = usePostDeadline();

  //디바운싱 삭제 (서버 구매함)
  const applyBtn = async () => {
    if (userStatus === 'applicant') {
      await apply(id);
      setModalOpen(false);
      queryClient.invalidateQueries('detailPost');
    }
    if (userStatus === 'MEMBER') {
      await apply(id);
      console.log('dhodkseho');
    }
  };

  const deadlineBtn = async () => {
    await deadlinePost(id);
    queryClient.invalidateQueries('detailPost');
  };

  function viewApplyModal(id) {
    setViewApply((prev) => !prev);
  }

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const openApplyModal = () => {
    setApplyModal(true);
    applyBtn();
  };

  const closeApplyModal = () => {
    setApplyModal(false);
    queryClient.invalidateQueries('detailPost');
  };

  return (
    <Wrap>
      {userStatus === 'author' && (
        <>
          <Button2
            onClick={() => {
              viewApplyModal(id);
            }}
          >
            지원자 보기
          </Button2>
          {deadline === false ? (
            <Button onClick={deadlineBtn}>프로젝트 마감하기</Button>
          ) : (
            <Button onClick={deadlineBtn}>마감 취소하기</Button>
          )}
        </>
      )}

      <div
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        {isHover && (
          <Alert>
            <p>{applierCnt}명이 지원했어요!</p>
          </Alert>
        )}
        {deadline === false ? (
          userStatus === 'MEMBER' ? (
            <Button onClick={openApplyModal}>프로젝트 지원하기</Button>
          ) : userStatus === 'applicant' ? (
            <Button onClick={openModal}>지원 취소하기</Button>
          ) : (
            userStatus === 'participant' && <Button> 참여 완료</Button>
          )
        ) : (
          userStatus !== 'author' && (
            <Button3 disabled={true}>모집 마감</Button3>
          )
        )}
      </div>
      <AlertModal
        open={modalOpen}
        setAlertModalOpen={closeModal}
        message={'프로젝트 지원을 취소하시겠습니까?'}
        action={applyBtn}
        actionMessage={'지원취소'}
      />

      <AlertModal
        open={applyModal}
        setAlertModalOpen={closeApplyModal}
        message={'프로젝트 지원 완료!'}
      />

      {viewApply && <ViewApply viewApplyModal={viewApplyModal} postId={id} />}
    </Wrap>
  );
};
const style = css`
  height: 52px;
  width: 180px;
  padding: 16px 24px;
  font-size: 1.063rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  @media screen and (max-width: 770px) {
    font-size: 0.938rem;
    width: 150px;
    padding: 14px 20px;
  }
`;

const Wrap = styled.div`
  button {
    cursor: pointer;
  }
`;

const alertAni = keyframes`
from {
  transform : translateY(30px);
}
to {
  transform : translateY(0);
}
`;

const Alert = styled.div`
  position: absolute;
  right: 28px;
  bottom: 20%;
  animation: ${alertAni} 0.2s linear;

  @media screen and (max-width: 770px) {
    display: none;
  }
`;

const Button = styled(Btn)`
  ${style}
  right: 0px;
  bottom: 0px;

  @media screen and (max-width: 770px) {
    bottom: -70px;
    //right:-30px;
  }
`;
const Button2 = styled(LineBtn)`
  ${style}
  right: 200px;
  bottom: 0px;

  @media screen and (max-width: 770px) {
    bottom: -70px;
    right: 165px;
  }
`;

const Button3 = styled.button`
  ${style}
  right: 0px;
  bottom: 0px;
`;

export const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 450px;
  line-height: 3;
  text-align: center;
  word-break: keep-all;
  //border:${(props) => props.theme.border};

  h4 {
    word-wrap: break-word;
    word-break: keep-all;
    line-height: 30px;
  }
  span {
    margin-bottom: 12px;
    line-height: 25px;
  }
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 12px;
  }
  button {
    width: 100px;
  }

  @media screen and (max-width: 786px) {
    width: 350px;

    h4 {
      font-size: 1.125rem;
    }
  }
`;

export default ApplyBtn;
