import React, { useState, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import arrow from "../styles/icon/global/arrowDown.svg";

const SocialModal = (props) => {
  //console.log(props);
  //닉네임, 스택
  const [nickName, setNickName] = useState("");
  const [stack, setStack] = useState([]);

  //오류메시지 상태저장
  const [nickMessage, setNickMessage] = useState("");

  // 유효성 검사
  const [isNick, setIsNick] = useState(false);

  // 닉네임 중복 확인
  const nickCheck = async () => {
    let data = {
      nickname: nickName,
    };
    try {
      await axios.post("https://my1stdomain.shop/user/nickname", data).then(
        (
          res //console.log(res, "닉네임 중복확인")
        ) => window.alert(res.data.msg)
      );
    } catch (err) {
      console.log(err.response.data.errorMessage);
      window.alert(err.response.data.errorMessage);
    }
  };

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

  const onSubmit = async () => {
    console.log(nickName);
    console.log(JSON.stringify(stack));
    let data = {
      nickname: nickName,
      stacks: stack,
    };
    try {
      await axios
        .post("http://3.35.22.190/user/signup/addInfo", data, {
          headers: { Authorization: `Bearer ${props.element}` },
        })
        .then((res) => {
          console.log(res, "회원가입");
          window.alert(res);
          //window.location.replace("/login");
        });
    } catch (err) {
      console.log(err);
      window.alert(err.response.data.errorMessage);
    }
  };

  return (
    <All>
      <p>
        <span style={{ fontSize: "4rem", fontWeight: "bold" }}>REGISTER</span>
        <span>회원가입</span>
      </p>
      <Comments>
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
              <MyStack style={{ margin: "0px 10px 10px 0px" }} key={index}>
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
                    strokeWidth="2"
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
      <SignUpBtn
        type="submit"
        disabled={!(isNick && nickName && stack.length > 0)}
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
  ::placeholder {
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
  line-height: 2px;
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
  margin-left: -110px;
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
  margin-left: -115px;
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
  margin-left: -115px;
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
    background-color: ${(props) => (props.disabled ? "#f8cbac" : "#c64d07;")};
    cursor: pointer;
  }
`;
export default SocialModal;
