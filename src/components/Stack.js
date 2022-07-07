import React, { useState } from "react";
import styled from "styled-components";

const Stack = () => {
  const [stack, setStack] = useState([]);

  const addStack = (newStack) => {
    setStack([...stack, newStack]);
  };

  return (
    <>
      <SelectTitle>구인스택</SelectTitle>
      <div>
        <details style={{ height: "40px" }}>
          <SelectBox>스택을 선택하세요</SelectBox>
          <SelectBoxOpen>
            <Option onClick={() => addStack("Java")}>Java</Option>
            <Option onClick={() => addStack("Javascript")}>Javascript</Option>
            <Option onClick={() => addStack("TypeScript")}>TypeScript</Option>
            <Option onClick={() => addStack("React")}>React</Option>
            <Option onClick={() => addStack("Vue")}>Vue</Option>
          </SelectBoxOpen>
        </details>
        <div style={{ display: "flex" }}>
          {stack.map((stack, index) => {
            return <MyStack key={index}># {stack}</MyStack>;
          })}
        </div>
      </div>
    </>
  );
};

const MyStack = styled.div`
  background-color: ${(props) => props.theme.stackBackground};
  padding: 8px 12px;
  border-radius: 30px;
  margin-right: 16px;
  color: ${(props) => props.theme.stackColor};
`;

const SelectTitle = styled.p`
  font-size: 26px;
`;

const SelectBox = styled.summary`
  line-height: 25px;
  width: 200px;
  height: 37px;
  padding: 5px 10px;
  border: ${(props) => props.theme.border};
  border-radius: 8px;
  font-size: 16px;
  -webkit-appearance: none;
  background-color: ${(props) => props.theme.inputBoxBackground};
`;

const SelectBoxOpen = styled.ul`
  max-height: 200px;

  z-index: 10;
  border-radius: 8px;
  position: absolute;
  width: 200px;
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
export default Stack;
