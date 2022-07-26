import React, { useState, useCallback } from "react";
import styled from "styled-components";
import kakaoBTN from "../styles/icon/login/kakaoLogin.svg";
import googleBTN from "../styles/icon/login/googleLogin.svg";
import Register from "./Register";

import { Btn } from "../styles/style";
import { login } from "../shared/userOauth";
import SocialModal from "./SocialModal";

const Login = ({ setModalContent }) => {
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

  const KakaoURL = process.env.REACT_APP_SOCIAL_URL;

  return (
    <Wrap>
      <Title>
        LOGIN
        <span> 로그인</span>
      </Title>

      <InputWrap>
        <InputContent>
          이메일
          <LoginInput
            autocomplete="email"
            text="ID"
            type="email"
            typeName="id"
            onChange={onChangeId}
            placeholder="이메일을 입력해주세요."
          />
          <p className={isEmail ? "success" : "error" }>
            {email.length > 0 && (
              <span className={`message ${isEmail ? "success" : "error"}`}>
                {emailMessage}
              </span>
            )}
          </p>
        </InputContent>
        <InputContent>
          비밀번호
          <LoginInput
            onChange={onChangePassword}
            title="비밀번호"
            typeTitle="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <p>
            {password.length > 0 && (
              <span className={`message ${isPassword ? "success" : "error"}`}>
                {passwordMessage}
              </span>
            )}
          </p>
        </InputContent>
        <LoginBtn
          type="submit"
          disabled={!(isEmail && isPassword && email && password)}
          onClick={() => {
            login(data);
          }}
        >
          로그인하기
        </LoginBtn>
      </InputWrap>

      <SocialWrap>
        <a href={KakaoURL}>
          <IMG src={kakaoBTN} alt="카카오" />
        </a>
      </SocialWrap>

      <Redirect>
        아직 계정이 없으신가요?
        <span
          onClick={() => {
            setModalContent(<Register setModalContent={setModalContent} />);
          }}
        >
          회원가입
        </span>
        하러가기
      </Redirect>
    </Wrap>
  );
};

const IMG = styled.img`
  width: 48px;
  height: 48px;
`;

export const Wrap = styled.div`
  width: 384px;
  margin: 24px 72px 8px;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin: 0px auto;
  }

  @media screen and (max-width: 375px) {
    width: 100%;
    margin: 0px auto;
  }
`;

export const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  text-align: center;

  span {
    font-size: 16px;
    font-weight: normal;
  }
`;

export const InputWrap = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  span {
    font-size: 14px;
    color: ${(props) => props.theme.keyColor};
  }

  p .error{
    color:${(props)=>props.theme.errorColor}
  }
`;

export const LoginBtn = styled(Btn)`
  cursor: pointer;
  width: 100%;
`;

const SocialWrap = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin: 16px 0px 0px;
`;

export const LoginInput = styled.input`
  width: 100%;
  height: 44px;
  background-color: ${(props) => props.theme.divBackGroundColor};
  border: ${(props) => props.theme.border};
  border-radius: 12px;
  padding: 12px;
  ::placeholder {
    color: #9f9f9f;
  }
  :focus {
    outline: none;
  }
  /* &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    background-color: ${(props) => props.theme.divBackGroundColor};
  } */
`;

export const Redirect = styled.div`
  margin-top: 32px;
  color: ${(props) => props.theme.textColor};
  font-size: 0.75rem;
  text-align: center;

  span {
    font-weight: bold;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    :hover {
      color: ${(props) => props.theme.keyColor};
    }
  }
`;

export default Login;
