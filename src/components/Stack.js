import React, { useState } from "react";
import styled from "styled-components";

const Stack = () => {
  const [stack, setStack] = useState([]);

  const addStack = (newStack) => {
    setStack([...stack, newStack]);
  };

  const removeStack = (selectedStack) => {
    console.log(stack);
    console.log(selectedStack);
    const newStacks = stack.filter((stack) => stack !== selectedStack);
    console.log(newStacks);
    setStack(newStacks);
  };

  return (
    <>
      <SelectTitle>구인스택</SelectTitle>
      <div>
        <details>
          <SelectBox>해당하는 기술 스텍을 선택해주세요. (중복 가능)</SelectBox>
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
              <MyStack style={{ margin: "0px 10px 10px 0px" }}>
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
`;
/* line-height: 25px;
  width: 200px;
  height: 37px;
  padding: 5px 10px;
  border: ${(props) => props.theme.border};
  border-radius: 8px;
  font-size: 16px;
  -webkit-appearance: none;
  background-color: ${(props) => props.theme.inputBoxBackground}; */

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

export default Stack;
