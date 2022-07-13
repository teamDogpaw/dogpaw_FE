import React, { useCallback, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import arrow from "../assets/stack_arrow.png";

import { useSetRecoilState } from "recoil";
import { modalChange } from "../atom/userQuery";
import Login from "./Login";

const Register = () => {
  const setOnModal = useSetRecoilState(modalChange);

  //닉네임, 이메일, 비밀번호, 비밀번호 확인, 스택
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [stack, setStack] = useState([]);

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
      stacks: stack,
    };
    //console.log(data);
    try {
      await axios.post("http://3.35.22.190/user/signup", data).then((res) => {
        console.log(res, "회원가입");
        window.alert("회원가입 성공 :)");
        setOnModal(<Login />);
      });
    } catch (err) {
      console.log(err);
      window.alert(err.response.data?.errorMessage);
    }
  };

  // 닉네임 중복 확인
  const nickCheck = async () => {
    let data = {
      nickname: nickName,
    };
    try {
      await axios.post("http://3.35.22.190/user/nickname", data).then(
        (
          res //console.log(res, "닉네임 중복확인")
        ) => window.alert(res.data.msg)
      );
    } catch (err) {
      console.log(err);
    }
  };

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

  // 닉네임
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

  //스택 추가
  const addStack = (newStack) => {
    setStack([...stack, newStack]);
  };

  //스택 제거
  const removeStack = (selectedStack) => {
    console.log(stack);
    console.log(selectedStack);
    const newStacks = stack.filter((stack) => stack !== selectedStack);
    console.log(newStacks);
    setStack(newStacks);
  };

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
        <NICK_BTN
          disabled={nickName.length < 3 || nickName.length > 10}
          onClick={nickCheck}
        >
          중복확인
        </NICK_BTN>
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
      <SelectTitle>구인스택</SelectTitle>
      <div>
        <details>
          <SelectBox>
            해당하는 기술 스텍을 선택해주세요. (중복 가능)
            <Img src={arrow} alt="" />
          </SelectBox>
          <SelectBoxOpen>
            <Option onClick={() => addStack("Java")}>Java</Option>
            <Option onClick={() => addStack("Javascript")}>Javascript</Option>
            <Option onClick={() => addStack("TypeScript")}>TypeScript</Option>
            <Option onClick={() => addStack("React")}>React</Option>
            <Option onClick={() => addStack("Vue")}>Vue</Option>
          </SelectBoxOpen>
        </details>
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
          {stack.map((stack, index) => {
            return (
              <MyStack key={index}>
                #{stack}{" "}
                <svg
                  onClick={() => removeStack(stack)}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99996 18.3327C14.6023 18.3327 18.3333 14.6017 18.3333 9.99935C18.3333 5.39698 14.6023 1.66602 9.99996 1.66602C5.39759 1.66602 1.66663 5.39698 1.66663 9.99935C1.66663 14.6017 5.39759 18.3327 9.99996 18.3327Z"
                    stroke="#FFB673"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.5 7.5L7.5 12.5"
                    stroke="#FFB673"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.5 7.5L12.5 12.5"
                    stroke="#FFB673"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </MyStack>
            );
          })}
        </div>
      </div>
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
            passwordConfirm &&
            stack.length > 0
          )
        }
        onClick={onSubmit}
      >
        회원가입하기
      </SignUpBtn>
      <Log>
        계정이 있으셨나요?
        <RegisterBtn
          onClick={() => {
            setOnModal(<Login />);
          }}
        >
          로그인
        </RegisterBtn>
        하러가기
      </Log>
    </All>
  );
};

const All = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: transparent;
  :: p {
    margin-left: 50%;
  }
`;

const Comments = styled.div`
  margin-top: 40px;
  color: #292929;
`;

const Title = styled.h3`
  font-size: 26px;
  padding: 1rem 0;
`;

const IdPut = styled.input`
  padding: 1.3rem 0.5rem;
  background-color: #fff;
  border: 2px solid #eee;
  border-radius: 8px;
  width: 500px;
  height: 30px;
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

const NICK_BTN = styled.button`
  color: #ffffff;
  background-color: ${(props) => (props.disabled ? "#FFD6B0" : "#FF891C")};
  padding: 1rem 1rem;
  margin: 0 0 0 1rem;
  border: none;
  border-radius: 12px;
  width: 100px;
  height: 3rem;
  font-size: 16px;
  line-height: 2px;
  &:hover {
    background-color: ${(props) => (props.disabled ? "#FFD6B0" : "#D26500;")};
    cursor: pointer;
  }
`;

const Pone = styled.p`
  color: #ffb470;
  margin-left: -105px;
  font-size: 13px;
`;

const MyStack = styled.div`
  background-color: ${(props) => props.theme.stackBackground};
  padding: 8px 12px;
  border-radius: 30px;
  margin-right: 16px;
  color: ${(props) => props.theme.stackColor};
`;

const SelectTitle = styled.p`
  font-size: 26px;
  font-weight: bold;
  padding: 1rem 0;
`;

const SelectBox = styled.summary`
  line-height: 5px;
  padding: 1.3rem 0.5rem;
  background-color: #fff;
  border: 2px solid #eee;
  border-radius: 8px;
  width: 500px;
  height: 30px;
  font-weight: bold;
  font-size: 16px;
  color: #9f9f9f;
  list-style: none;
  position: relative;
`;

const Img = styled.img`
  position: absolute;
  left: 90%;
  bottom: 1%;
  width: 40px;
  height: 40px;
`;

const SelectBoxOpen = styled.ul`
  z-index: 10;
  border-radius: 8px;
  position: absolute;

  width: 500px;
  border: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.inputBoxBackground};
  box-shadow: 0px 4px 4px 0px rgb(0, 0, 0, 0.1);
  overflow: scroll;
  margin-top: 4px;
`;

const Option = styled.li`
  cursor: pointer;
  padding: 8px 12px;
  :hover {
    background-color: ${(props) => props.theme.keyColor};
  }
`;

const SignUpBtn = styled.button`
  color: #ffffff;
  background-color: ${(props) => (props.disabled ? "#FFD6B0" : "#FF891C")};
  border: none;
  padding: 1rem;
  width: 500px;
  margin: 10px 0;
  border-radius: 10px;
  font-size: large;
  font-family: Jalnan;
  &:hover {
    background-color: ${(props) => (props.disabled ? "#FFD6B0" : "#D26500;")};
    cursor: pointer;
  }
`;

const Log = styled.p`
  margin-top: 30px;
  color: #a3a3a3;
  margin-left: 20%;
`;

const RegisterBtn = styled.span`
  color: #9f9f9f;
  &:hover {
    font-weight: bold;
    color: #5b5b5b;
    cursor: pointer;
  }
`;

export default Register;
