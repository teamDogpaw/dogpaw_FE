import React, { useCallback, useState } from "react";
import styled from "styled-components";

import axios from "axios";

const Register = () => {
  //아이디, 이메일, 비밀번호, 비밀번호 확인
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //오류메시지 상태저장
  const [idMessage, setIdMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // 회원가입 정보
  const onSubmit = async () => {
    let data = {
      userId: id,
      password,
      email,
      confirmPassword: passwordConfirm,
    };
    //console.log(data);
    try {
      await axios
        .post("http://13.124.188.218/users/signup", data)
        .then((res) => {
          console.log(res, "회원가입");
          window.alert("회원가입 성공 :)");
          window.location.replace("/login");
        });
    } catch (err) {
      console.log(err);
      window.alert(err.request.response);
    }
  };

  // 아이디
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 10) {
      setIdMessage("3글자 이상, 10글자 미만으로 입력해주세요.");
      setIsId(false);
    } else {
      setIdMessage("알맞게 작성되었습니다 :)");
      setIsId(true);
    }
  }, []);

  // 이메일
  const onChangeEmail = useCallback((e) => {
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

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 :)");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호를 다시 한번 확인해 주세요.");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  return (
    <All>
      <p>
        <span style={{ fontSize: "4rem", fontWeight: "bold" }}>RGISTER</span>
        <span>회원가입</span>
      </p>
      <Comments>
        <Title>이메일</Title>
        <IdPut
          text="이메일"
          type="email"
          typeName="email"
          onChange={onChangeEmail}
        />
        <Pone>
          {email.length > 0 && (
            <span className={`message ${isEmail ? "success" : "error"}`}>
              {emailMessage}
            </span>
          )}
        </Pone>
        <Title>닉네임</Title>
        <IdPut
          text="ID"
          type="text"
          typeName="id"
          onChange={onChangeId}
          style={{ width: "320px" }}
        />
        <NICK_BTN>중복확인</NICK_BTN>
        <Pone>
          {id.length > 0 && (
            <span className={`message ${isId ? "success" : "error"}`}>
              {idMessage}
            </span>
          )}
        </Pone>

        <Title>비밀번호</Title>
        <IdPut
          onChange={onChangePassword}
          title="비밀번호"
          typeTitle="password"
          type="password"
        />
        <Pone>
          {password.length > 0 && (
            <span className={`message ${isPassword ? "success" : "error"}`}>
              {passwordMessage}
            </span>
          )}
        </Pone>
        <Title>비밀번호 확인</Title>
        <IdPut
          onChange={onChangePasswordConfirm}
          title="비밀번호 확인"
          typeTitle="passwordConfirm"
          type="password"
        />
        <Pone>
          {passwordConfirm.length > 0 && (
            <span
              className={`message ${isPasswordConfirm ? "success" : "error"}`}
            >
              {passwordConfirmMessage}
            </span>
          )}
        </Pone>
      </Comments>
      <SignUpBtn
        type="submit"
        disabled={
          !(
            isId &&
            isEmail &&
            isPassword &&
            isPasswordConfirm &&
            id &&
            email &&
            password &&
            passwordConfirm
          )
        }
        onClick={onSubmit}
      >
        회원가입하기
      </SignUpBtn>
    </All>
  );
};

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

const Title = styled.h3`
  font-size: 26px;
  margin-left: -110px;
  padding: 1rem 0;
`;

const IdPut = styled.input`
  padding: 1.3rem 0.5rem;
  background-color: #fff;
  border: 2px solid #eee;
  border-radius: 8px;
  width: 500px;
  height: 30px;
  margin-left: -115px;
  font-size: large;
  font-weight: bold;
  font-family: Jalnan;
  color: black;
  :: placeholder {
    font-weight: bold;
    font-size: 16px;
    color: #9f9f9f;
  }
`;

const NICK_BTN = styled.button`
  color: ${(props) => (props.disabled ? "black" : "white")};
  background-color: ${(props) => (props.disabled ? "#f8cbac" : "#ee8548")};
  padding: 1rem 1rem;
  margin: 0 0 0 1rem;
  border: none;
  border-radius: 12px;
  width: 160px;
  height: 3rem;
  font-size: 16px;
`;

const Pone = styled.p`
  color: #ffb470;
  margin-left: -105px;
  font-size: 13px;
`;

const SignUpBtn = styled.button`
color: ${(props) => (props.disabled ? "black" : "white")};
background-color: ${(props) => (props.disabled ? "#f8cbac" : "#ee8548")};
  border: none;
  padding: 1rem;
  width: 500px;
  margin: 1.5rem -7.5rem;
  border-radius: 10px;
  font-size: large;
  font-family: Jalnan;
  &:hover {
    background-color: ${(props) => (props.disabled ? "#f8cbac" : "#c64d07;")}
    cursor: pointer;
  }
`;

export default Register;
