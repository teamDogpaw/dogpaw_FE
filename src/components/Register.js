import React, { useCallback, useState } from "react";
import styled from "styled-components";
import arrow from "../styles/icon/global/arrowDown.svg";

import { useSetRecoilState } from "recoil";
import { modalChange } from "../atom/atom";
import Login from "./Login";
import { nickCheck, register } from "../shared/userOauth";

import {
  ModalAll,
  ModalComments,
  ModalIdPut,
  ModalLog,
  ModalPone,
  ModalRegisterBtn,
  ModalSignUpBtn,
  ModalTitle,
  MyStack,
  Option,
  SelectBoxOpen,
} from "../styles/style";

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

  const nickData = {
    nickname: nickName,
  };

  let data = {
    nickname: nickName,
    password: password,
    username: email,
    stacks: stack,
  };

  return (
    <ModalAll2>
      <p>
        <span style={{ fontSize: "32px", fontWeight: "bold" }}>RGISTER</span>
        <span>회원가입</span>
      </p>
      <ModalComments>
        <ModalTitle>이메일</ModalTitle>
        <ModalIdPut
          text="이메일"
          type="email"
          typeName="email"
          onChange={onChangeEmail}
          placeholder="이메일을 입력해주세요."
        />
        <ModalPone>
          {email.length > 0 && (
            <span className={`message ${isEmail ? "success" : "error"}`}>
              {emailMessage}
            </span>
          )}
        </ModalPone>
        <ModalTitle>닉네임</ModalTitle>
        <ModalNickPut
          text="ID"
          type="text"
          typeName="id"
          onChange={onChangeId}
          placeholder="닉네임을 입력해주세요."
        />
        <ModalNICKBTN
          disabled={nickName.length < 3 || nickName.length > 10}
          onClick={() => {
            nickCheck(nickData);
          }}
        >
          중복확인
        </ModalNICKBTN>
        <ModalPone>
          {nickName.length > 0 && (
            <span className={`message ${isNick ? "success" : "error"}`}>
              {nickMessage}
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
        <ModalTitle>비밀번호 확인</ModalTitle>
        <ModalIdPut
          onChange={onChangePasswordConfirm}
          title="비밀번호 확인"
          typeTitle="passwordConfirm"
          type="password"
          placeholder="비밀번호를 다시 한번 입력해주세요."
        />
        <ModalPone>
          {passwordConfirm.length > 0 && (
            <span
              className={`message ${isPasswordConfirm ? "success" : "error"}`}
            >
              {passwordConfirmMessage}
            </span>
          )}
        </ModalPone>
      </ModalComments>
      <ModalTitle>구인스택</ModalTitle>
      <div>
        <details>
          <SelectBox>
            해당하는 기술 스텍을 선택해주세요. (중복 가능)
            <ArrowImg src={arrow} alt="" />
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
                    strokeWidth="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.5 7.5L12.5 12.5"
                    stroke="#FFB673"
                    strokeWidth="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </MyStack>
            );
          })}
        </div>
      </div>
      <ModalSignUpBtn
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
        onClick={() => {
          register(data);
          setOnModal(<Login />);
        }}
      >
        회원가입하기
      </ModalSignUpBtn>
      <ModalLog>
        계정이 있으셨나요?
        <ModalRegisterBtn
          onClick={() => {
            setOnModal(<Login />);
          }}
        >
          로그인
        </ModalRegisterBtn>
        하러가기
      </ModalLog>
    </ModalAll2>
  );
};

const ModalAll2 = styled(ModalAll)`
  width: 384px;
  height: 673px;
`;

const ModalNickPut = styled(ModalIdPut)`
  width: 294px;
`;

const ModalNICKBTN = styled(ModalSignUpBtn)`
  width: 78px;
  height: 44px;
  font-size: 14px;
  margin: 0px 0px 0px 12px;
  padding: 0;
`;

const SelectBox = styled.summary`
  line-height: 42px;
  background-color: #fff;
  border: 2px solid #eee;
  border-radius: 8px;
  width: 384px;
  height: 44px;
  font-size: 14px;
  color: #9f9f9f;
  list-style: none;
  position: relative;
`;

const ArrowImg = styled.img`
  position: absolute;
  left: 88%;
  width: 40px;
  height: 40px;
`;

export default Register;
