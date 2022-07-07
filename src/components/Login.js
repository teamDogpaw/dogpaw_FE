import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

function Login() {
  const navigate = useNavigate();

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
      await axios.post("http://13.125.213.81/user/login", data).then((res) => {
        const accessToken = res.data.data.token.accessToken;
        const refreshToken = res.data.data.token.refreshToken;
        const id = res.data.data.userId;
        if (accessToken !== null) {
          localStorage.setItem("token", accessToken);
          localStorage.setItem("retoken", refreshToken);
          localStorage.setItem("id", id);
          console.log(res, "로그인");
          window.alert(res.data.message);
          window.location.replace("/main");
        }
      });
    } catch (err) {
      console.log(err);
      window.alert(err.response.data);
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

  return (
    <All>
      <p>
        <span style={{ fontSize: "4rem", fontWeight: "bold" }}>LOGIN</span>
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

      <Log>
        아직 계정이 없으신가요?
        <RegisterBtn
          onClick={() => {
            navigate("/register");
          }}
        >
          회원가입
        </RegisterBtn>
        하러가기
      </Log>
    </All>
  );
}

const All = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: 60px;
  background-color: transparent;
`;

const Comments = styled.div`
  margin-top: 40px;
  color: #292929;
`;

const Title = styled.p`
  font-size: 26px;
  margin-left: -110px;
  padding: 1rem 0;
`;

const IdPut = styled.input`
  padding: 1.3rem 0.5rem;
  background-color: #fff;
  border: 2px solid #eee;
  border-radius: 8px;
  width: 400px;
  height: 30px;
  margin-left: -115px;
  font-size: large;
  font-weight: bold;
  font-family: Jalnan;
  color: black;

  ::placeholder {
    font-weight: bold;
    font-size: 16px;
    color: #9f9f9f;
  }
`;

const Pone = styled.p`
  color: #ffb470;
  margin-left: -105px;
  font-size: 13px;
`;

const SignInBtn = styled.button`
color: ${(props) => (props.disabled ? "black" : "white")};
background-color: ${(props) => (props.disabled ? "#f8cbac" : "#ee8548")};
  border: none;
  padding: 18px;
  width: 500px;
  margin-left: -150px;
  margin-top: 50px;
  border-radius: 10px;
  font-size: large;
  font-family: Jalnan;
  &:hover {
    background-color: ${(props) => (props.disabled ? "#f8cbac" : "#c64d07;")};
    cursor: pointer;
  }
`;

const Log = styled.p`
  margin-top: 30px;
  color: #a3a3a3;
  margin-left: -45px;
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
