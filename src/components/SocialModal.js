import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { nickCheck } from "../shared/userOauth";
import instance from "../shared/axios";
import {
  InputContent,
  InputWrap,
  LoginBtn,
  LoginInput,
  Title,
  Wrap,
} from "./Login";
import { Btn } from "../styles/style";
import StackSelector from "./StackSeletor";
import axios from "axios";
import { userApis } from "../api/user";
const baseURL = process.env.REACT_APP_BASE_URL;

const SocialModal = () => {


  const isRegister = true;

  //닉네임, 스택
  const [nickName, setNickName] = useState("");
  const [stack, setStack] = useState([]);

  //오류메시지 상태저장
  const [nickMessage, setNickMessage] = useState("");

  // 유효성 검사
  const [isNick, setIsNick] = useState(false);

  // 닉네임
  const onChangeId = useCallback((e) => {
    setNickName(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 10) {
      setNickMessage("3글자 이상, 10글자 미만으로 입력해주세요.");
      setIsNick(false);
    } else {
      setNickMessage("알맞게 작성되었습니다.");
      setIsNick(true);
    }
  }, []);

  let debounce = null;

  const nickCheck = (nickData) => {
    if (debounce) {
      clearTimeout(debounce);
    }
    debounce = setTimeout(async () => {
      try {
        let nickCheck = userApis.nickCheck;
        const response = await nickCheck(nickData);
        if (response.status === 200) {
          setNickMessage("사용 가능한 닉네임입니다.");
          setIsNick(true);
        }
      } catch (err) {
        if (err.response.status === 400) {
          setNickMessage("중복된 닉네임입니다.");
          setIsNick(false);
        } else {
          setNickMessage("연결이 고르지 않습니다.");
          setIsNick(false);
        }
      }
    }, 500);
  };

  const token = localStorage.getItem("token");

  const onSubmit = async () => {
    //console.log(nickName);
    //console.log(stack);
    let data = {
      nickname: nickName,
      stacks: stack,
    };
    try {
      const response = await axios.post(
        `${baseURL}/user/signup/addInfo`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(response);
      // .then((res) => {
      // window.alert("추가 정보를 기입해 주세요. :)");
      // const accessToken = res.data.data.token.accessToken;
      // const refreshToken = res.data.data.token.refreshToken;
      // if (e) {
      // localStorage.setItem("token", accessToken);
      // localStorage.setItem("retoken", refreshToken);
      // window.alert("로그인 성공 :)");
      localStorage.removeItem("socialNick");
      window.location.replace("/");
    } catch (err) {
      //console.log(err);
    }
  };

  const nickData = { nickname: nickName };

  return (
    <Wrap>
      <Title>
        REGISTER
        <span>회원가입</span>
      </Title>
      <InputWrap>
        <InputContent>
          닉네임
          <NicknameWrap>
            <LoginInput
              text="ID"
              type="text"
              typeName="id"
              onChange={onChangeId}
              placeholder="닉네임을 입력해주세요."
            />
            <LoginBtn
              disabled={nickName.length < 3 || nickName.length > 10}
              onClick={() => {
                nickCheck(nickData);
              }}
            >
              중복확인
            </LoginBtn>
          </NicknameWrap>
          <p>
            {nickName.length > 0 && (
              <span className={`message ${isNick ? "success" : "error"}`}>
                {nickMessage}
              </span>
            )}
          </p>
        </InputContent>

        <InputContent>
          기술 스택
          <StackSelector setRegisterData={setStack} isRegister={isRegister}/>
        </InputContent>
        <SocialBtn
          type="submit"
          disabled={!(isNick && nickName && stack.length > 0)}
          onClick={onSubmit}
        >
          회원가입하기
        </SocialBtn>
      </InputWrap>
    </Wrap>
  );
};

const NicknameWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;

export const SocialBtn = styled(Btn)`
  margin-bottom: 45px;
  width: 100%;
  background-color: ${(props) =>
    props.disabled ? "#E1E1E1" : props.theme.keyColor};
  :hover {
    background-color: ${(props) => (props.disabled ? "#E1E1E1" : "#FF891C")};
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }
`;

export default SocialModal;
