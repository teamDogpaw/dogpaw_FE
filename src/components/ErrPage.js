import React from "react";
import styled from "styled-components";
import subtitle from "../styles/icon/login/subtitle.svg";
import Register from "./Register";

const ErrPage = ({ setModalContent }) => {
  return (
    <Overlay>
      <ModalWrap>
        <CloseButton>
          <i className="fa-solid fa-xmark"></i>
        </CloseButton>
        <Contents>
          <img src={subtitle} alt="">
            메인 사진
          </img>
          <p>
            이메일 혹은 비밀번호를 잘못 입력하셨거나 등록되지 않은 이메일
            입니다.
          </p>
          <Button
            onClick={setModalContent(
              <Register setModalContent={setModalContent} />
            )}
          >
            확인
          </Button>
        </Contents>
      </ModalWrap>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 600px;
  height: fit-content;
  border-radious: 15px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.div`
  float: right;
  width: 40px;
  height: 40px;
  margin: 20px;
  cursor: pointer;
  i {
    color: #5d5d5d;
    font-size: 30px;
  }
`;

const Contents = styled.div`
  margin: 50px 30px;
  p {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 60px;
  }
  img {
    margin-top: 60px;
    width: 300px;
  }
`;

const Button = styled.button`
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  background: #ababab;
  border-radious: 10px;
  color: white;
  font-style: italic;
  font-weight: 200;
  cursor: pointer;
  :hover {
    background: #898989;
  }
`;

export default ErrPage;
