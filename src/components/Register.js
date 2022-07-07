import React, { useCallback, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Stack from "./Stack";

const Register = () => {
  //아이디, 이메일, 비밀번호, 비밀번호 확인, 스택
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [stacks, setStacks] = useState([]);

  //오류메시지 상태저장
  const [nickMessage, setNickMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사
  const [isNick, setIsNick] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // 회원가입 정보
  const onSubmit = async () => {
    let data = {
      nickname: nickName,
      password,
      username: email,
      stacks: ["java", "javascript"],
    };
    //console.log(data);
    try {
      await axios.post("http://13.125.213.81/user/signup", data).then((res) => {
        console.log(res, "회원가입");
        window.alert("회원가입 성공 :)");
        window.location.replace("/login");
      });
    } catch (err) {
      console.log(err);
      window.alert(err.request.response);
    }
  };

  // 닉네임 중복 확인
  const nickCheck = async () => {
    let data = {
      nickname: nickName,
    };
    try {
      await axios
        .post("http://13.125.213.81/user/nickname", data)
        .then((res) => console.log(res, "닉네임 중복확인"));
    } catch (err) {
      console.log(err);
    }
  };
  // 아이디
  const onChangeId = useCallback((e) => {
    setNickName(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 10) {
      setNickMessage("3글자 이상, 10글자 미만으로 입력해주세요.");
      setIsNick(false);
    } else {
      setNickMessage("알맞게 작성되었습니다 :)");
      setIsNick(true);
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
          placeholder="이메일을 입력해주세요."
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
          placeholder="닉네임을 입력해주세요."
          style={{ width: "380px" }}
        />
        <NICK_BTN onClick={nickCheck}>중복확인</NICK_BTN>
        <Pone>
          {nickName.length > 0 && (
            <span className={`message ${isNick ? "success" : "error"}`}>
              {nickMessage}
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
        <Title>비밀번호 확인</Title>
        <IdPut
          onChange={onChangePasswordConfirm}
          title="비밀번호 확인"
          typeTitle="passwordConfirm"
          type="password"
          placeholder="비밀번호를 다시 한번 입력해주세요."
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
      <Stack />
      <SignUpBtn
        type="submit"
        disabled={
          !(
            isNick &&
            isEmail &&
            isPassword &&
            isPasswordConfirm &&
            nickName &&
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
  width: 100px;
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
