import { useState } from "react";
import { Btn, LineBtn } from "../styles/style";
import styled, { keyframes } from "styled-components";
import { useQueryClient } from "react-query";
import { usePostApply } from "../hook/useApplyMutation";
import ViewApply from "../components/ViewApply";

const ApplyBtn = ({ myPostData }) => {
  const [isHover, setIsHover] = useState(false);
  const [viewApply, setViewApply] = useState(false);

  const userStatus = myPostData.userStatus;
  const id = myPostData.postId;
  const applierCnt = myPostData.applierCnt;
  const deadline = myPostData.deadline;
  
  const queryClient = useQueryClient();
  const { mutateAsync: apply } = usePostApply();

  const applyBtn = async () => {
    if (userStatus === "applicant") {
      if (window.confirm("지원 취소할건가요...?")) {
        alert("취소 완료");
        await apply(id);
      } else {
        return;
      }
    } else {
      await apply(id);
    }
    queryClient.invalidateQueries("detailPost");
  };

  function viewApplyModal(id) {
    setViewApply((prev) => !prev);
  }

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
          <Button>프로젝트 마감하기</Button>
        </>
      )} 
      {deadline === false ? (userStatus === "MEMBER" ? (
        <div
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        >
          {isHover && (
            <Alert>
              <p>{applierCnt}명이 지원했어요!</p>
            </Alert>
          )}
          <Button onClick={applyBtn}>프로젝트 지원하기</Button>
        </div>
      ) : (
        userStatus === "applicant" && (
          <div
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
          >
            {isHover && (
              <Alert>
                <p>{applierCnt}명이 지원했어요!</p>
              </Alert>
            )}
            <Button onClick={applyBtn}>지원 취소하기</Button>
          </div>
        )
      )) : (<Button3 disabled={true}>모집 마감</Button3>)}
       
      
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

export default ApplyBtn;