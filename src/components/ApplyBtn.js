import { useState } from "react";
import { Btn, LineBtn } from "../styles/style";
import styled, { keyframes } from "styled-components";
import { useQueryClient } from "react-query";
import { usePostApply } from "../hook/useApplyMutation";
import ViewApply from "../components/ViewApply";
import AlertModal from "../components/AlertModal";
import { usePostDeadline } from "../hook/usePostData";

const ApplyBtn = ({ myPostData }) => {
  const [isHover, setIsHover] = useState(false);
  const [viewApply, setViewApply] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const userStatus = myPostData.userStatus;
  const id = myPostData.postId;
  const applierCnt = myPostData.applierCnt;
  const deadline = myPostData.deadline;

  const queryClient = useQueryClient();
  const { mutateAsync: apply } = usePostApply();
  const { mutateAsync: deadlinePost } = usePostDeadline();

  const applyBtn = async () => {
    if (userStatus === "applicant") {
      await apply(id);
      setModalOpen(false);
    } else {
      await apply(id);
    }
    queryClient.invalidateQueries("detailPost");
  };

  const deadlineBtn = async () => {
    await deadlinePost(id);
    queryClient.invalidateQueries("detailPost");
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

  return (
    <div>
      {userStatus === "author" && (
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
          userStatus === "MEMBER" ? (
            <Button onClick={applyBtn}>프로젝트 지원하기</Button>
          ) : (
            userStatus === "applicant" && (
              <Button onClick={openModal}>지원 취소하기</Button>
            )
          )
        ) : (
          userStatus !== "author" && (
            <Button3 disabled={true}>모집 마감</Button3>
          )
        )}
      </div>
      <AlertModal open={modalOpen}>
        <Content>
          <h3>지원취소를 할건가요 .. ?</h3>
          <div>
            <button onClick={applyBtn}> 취소 </button>
            <button onClick={closeModal}> 닫기 </button>
          </div>
        </Content>
      </AlertModal>

      {viewApply && (
        <ViewApply viewApplyModal={viewApplyModal} myPostData={myPostData} />
      )}
    </div>
  );
};

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
`;

const Button = styled(Btn)`
  height: 52px;
  width: 180px;
  padding: 16px 24px;
  font-size: 17px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
  bottom: 0px;
`;
const Button2 = styled(LineBtn)`
  height: 52px;
  width: 180px;
  padding: 16px 24px;
  font-size: 17px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 200px;
  bottom: 0px;
`;

const Button3 = styled.button`
  height: 52px;
  width: 180px;
  padding: 16px 24px;
  font-size: 17px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
  bottom: 0px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  //background-color:gold;
  align-items: center;
  margin: auto;
`;

export default ApplyBtn;
