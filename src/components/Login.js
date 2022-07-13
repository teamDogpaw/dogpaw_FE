import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import kakaoBTN from "../assets/카카오.png";
import { useSetRecoilState } from "recoil";
import { modalChange } from "../atom/atom";
import Register from "./Register";

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

  // 로그인 정보를 보내면 토큰을 받음.
  const onSubmit = async (e) => {
    let data = {
      username: email,
      password,
    };
    //console.log(data);

    try {
      await axios.post("http://3.35.22.190/user/login", data).then((res) => {
        const accessToken = res.data.data.token.accessToken;
        const refreshToken = res.data.data.token.refreshToken;
        const id = res.data.data.userId;
        if (accessToken !== null) {
          localStorage.setItem("token", accessToken);
          localStorage.setItem("retoken", refreshToken);
          localStorage.setItem("id", id);
          console.log(res, "로그인");
          window.alert(res.data.msg);
          window.location.replace("/");
        }
      });
    } catch (err) {
      console.log(err);
      window.alert(err.response.data.errorMessage);
    }
  };

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

  const KAKAO_AUTH_URL =
    "https://kauth.kakao.com/oauth/authorize?client_id=3e848df062d2efe2be2266e171f3443c&redirect_uri=http://localhost:3000/user/kakao/login&response_type=code";

  return (
    <All>
      <p>
        <span style={{ fontSize: "32px", fontWeight: "bold" }}>LOGIN</span>
        <span>로그인</span>
      </p>

      <Comments>
        <Title>이메일</Title>
        <IdPut
          text="ID"
          type="text"
          typeName="id"
          onChange={onChangeId}
          placeholder="이메일을 입력해주세요."
        />
        <Pone>
          {email.length > 0 && (
            <span className={`message ${isEmail ? "success" : "error"}`}>
              {emailMessage}
            </span>
          )}
        </Pone>
        <Title>비밀번호</Title>
        <IdPut
          onChange={onChangePassword}
          title="비밀번호"
          typeTitle="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <Pone>
          {password.length > 0 && (
            <span className={`message ${isPassword ? "success" : "error"}`}>
              {passwordMessage}
            </span>
          )}
        </Pone>
      </Comments>

      <SignInBtn
        type="submit"
        disabled={!(isEmail && isPassword && email && password)}
        onClick={onSubmit}
      >
        로그인
      </SignInBtn>
      <a href={KAKAO_AUTH_URL}>
        <IMG src={kakaoBTN} alt="" />
      </a>
      <Log>
        아직 계정이 없으신가요?
        <RegisterBtn
          onClick={() => {
            setOnModal(<Register />);
          }}
        >
          회원가입
        </RegisterBtn>
        하러가기
      </Log>
    </All>
  );
};
/* display: flex;
  flex-direction: column; or row;
  justify-content: center;
  align-item: center */
const All = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  width: 384px;
  height: 433px;
`;

const Comments = styled.div`
  margin-top: 40px;
  color: #292929;
`;

const Title = styled.p`
  font-size: 14px;
  margin-top: 24px;
  padding: 4px 0;
`;

const IdPut = styled.input`
  background-color: #fff;
  border: 2px solid #eee;
  border-radius: 8px;
  width: 384px;
  height: 44px;
  font-size: 14px;
  font-weight: regular;
  font-family: Jalnan;
  color: black;
  ::placeholder {
    font-size: 14px;
    color: #9f9f9f;
  }
`;

const Pone = styled.div`
  margin: auto;
  margin-top: 10px;
  > span {
    font-size: 16px;
    color: #d26500;
  }
`;

const SignInBtn = styled.button`
  color: #ffffff;
  background-color: ${(props) => (props.disabled ? "#FFD6B0" : "#FF891C")};
  border: none;
  width: 384px;
  height: 44px;
  margin-top: 24px;
  border-radius: 10px;
  font-size: 14px;
  font-family: Jalnan;
  &:hover {
    background-color: ${(props) => (props.disabled ? "#FFD6B0" : "#D26500;")};
    cursor: pointer;
  }
`;
/* background-color: ${(props)=> props.theme.keyColor};
border-radius: 8px;
padding: 12px 16px;
border: 0px transparent;
color: white;
font-weight: bold;
:hover {
   background-color: #FF891C;
}
:active{
   background-color: #D26500;
} */
const IMG = styled.img`
  width: 48px;
  height: 48px;
`;

const Log = styled.p`
  margin-top: 32px;
  margin-bottom: 0;
  color: #a3a3a3;
  font-size: 12px;
`;

const RegisterBtn = styled.span`
  color: #9f9f9f;
  &:hover {
    font-weight: bold;
    color: #5b5b5b;
    cursor: pointer;
  }
`;

export default Login;
