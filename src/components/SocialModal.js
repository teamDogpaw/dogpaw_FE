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

const SocialModal = () => {
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
      setNickMessage("알맞게 작성되었습니다 :)");
      setIsNick(true);
    }
  }, []);

  const token = localStorage.getItem("token");

  const onSubmit = async () => {
    console.log(nickName);
    console.log(JSON.stringify(stack));
    let data = {
      nickname: nickName,
      stacks: stack,
    };
    try {
      const response = await instance.post("user/signup/addInfo", data )
        console.log(response)
        // .then((res) => {
          // window.alert("추가 정보를 기입해 주세요. :)");
          // const accessToken = res.data.data.token.accessToken;
          // const refreshToken = res.data.data.token.refreshToken;
          // if (e) {
            // localStorage.setItem("token", accessToken);
            // localStorage.setItem("retoken", refreshToken);
            // window.alert("로그인 성공 :)");
            //window.location.replace("/");
          }
     catch (err) {
      console.log(err);
      console.log(err.response.data.errorMessage);
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
            <Btn
              disabled={nickName.length < 3 || nickName.length > 10}
              onClick={() => {
                nickCheck(nickData);
              }}
            >
              중복확인
            </Btn>
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
          <StackSelector setRegisterData={setStack} />
        </InputContent>
        <LoginBtn
          type="submit"
          disabled={!(isNick && nickName && stack.length > 0)}
          onClick={onSubmit}
        >
          회원가입하기
        </LoginBtn>
      </InputWrap>
    </Wrap>
  );
};

const NicknameWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;
export default SocialModal;
