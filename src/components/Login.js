import React, { useState, useCallback } from "react";
import styled from "styled-components";
import kakaoBTN from "../styles/icon/login/kakaoLogin.svg";
import googleBTN from "../styles/icon/login/googleLogin.svg";
import { useSetRecoilState } from "recoil";
import { modalChange } from "../atom/atom";
import Register from "./Register";

import {
  ModalAll,
  ModalComments,
  ModalIdPut,
  ModalLog,
  ModalPone,
  ModalRegisterBtn,
  ModalSignUpBtn,
  ModalTitle,
} from "../styles/style";

import cancel from "../styles/icon/modal/close.svg";
import { login } from "../shared/userOauth";

const Login = () => {
  const setOnModal = useSetRecoilState(modalChange);

  //아이디, 비밀번호
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  // 아이디
  const onChangeId = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식을 다시 한번 확인해 주세요.");
      setIsEmail(false);
    } else {
      setEmailMessage("알맞게 작성되었습니다 :)");
      setIsEmail(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^[ㄱ-ㅎ가-힣0-9a-zA-Z@$!%#?&]{3,10}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("3글자 이상, 10글자 미만으로 입력해주세요. ");
      setIsPassword(false);
    } else {
      setPasswordMessage("알맞게 작성되었습니다 :)");
      setIsPassword(true);
    }
  }, []);

  const data = {
    username: email,
    password,
  };

  const KAKAO_AUTH_URL =
    "https://kauth.kakao.com/oauth/authorize?client_id=3e848df062d2efe2be2266e171f3443c&redirect_uri=http://localhost:3000/user/kakao/login&response_type=code";

  const GOOGLE_AUTH_URL = "";

  return (
    <ModalAll>
      <img src={cancel} alt="" />
      <p>
        <span style={{ fontSize: "32px", fontWeight: "bold" }}>LOGIN</span>
        <span>로그인</span>
      </p>

      <ModalComments>
        <ModalTitle>이메일</ModalTitle>
        <ModalIdPut
          text="ID"
          type="text"
          typeName="id"
          onChange={onChangeId}
          placeholder="이메일을 입력해주세요."
        />
        <ModalPone>
          {email.length > 0 && (
            <span className={`message ${isEmail ? "success" : "error"}`}>
              {emailMessage}
            </span>
          )}
        </ModalPone>
        <ModalTitle>비밀번호</ModalTitle>
        <ModalIdPut
          onChange={onChangePassword}
          title="비밀번호"
          typeTitle="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <ModalPone>
          {password.length > 0 && (
            <span className={`message ${isPassword ? "success" : "error"}`}>
              {passwordMessage}
            </span>
          )}
        </ModalPone>
      </ModalComments>

      <ModalSignUpBtn
        type="submit"
        disabled={!(isEmail && isPassword && email && password)}
        onClick={() => {
          login(data);
        }}
      >
        로그인
      </ModalSignUpBtn>
      <a href={KAKAO_AUTH_URL}>
        <IMG src={kakaoBTN} alt="카카오" />
      </a>
      <a href={GOOGLE_AUTH_URL}>
        <IMG src={googleBTN} alt="구글" />
      </a>
      <ModalLog>
        아직 계정이 없으신가요?
        <ModalRegisterBtn
          onClick={() => {
            setOnModal(<Register />);
          }}
        >
          회원가입
        </ModalRegisterBtn>
        하러가기
      </ModalLog>
    </ModalAll>
  );
};

const IMG = styled.img`
  width: 48px;
  height: 48px;
`;

export default Login;
