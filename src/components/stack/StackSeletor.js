import { MyStack, SelectBoxOpen, SelectBox, Option } from '../../styles/style';
import { ReactComponent as Delete } from '../../styles/icon/global/stackDelete.svg';
import { useEffect, useRef, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Stacks } from '../../utils/enums';
import { SelectArrow } from '../WriteSelect';
import styled from 'styled-components';

const StackSelector = ({
  isEdit,
  setSelectedData,
  data,
  setRegisterData,
  isRegister,
}) => {
  const ALL_STACK = Object.values(Stacks);

  let [stack, setStack] = useState([]);
  const isMypage = useMatch(`/mypage`);
  const isWrite = useMatch(`/write/*`);

  useEffect(() => {
    if (isEdit === true || isMypage !== null) {
      setStack(data.stacks);
    }
  }, [isEdit]);

  const stackdetailsRef = useRef(null);

  const addStack = (newStack) => {
    if (!stack.includes(newStack)) {
      const newStackArray = stack.concat(newStack);
      setStack(newStackArray);
      if (isWrite !== null || isMypage !== null) {
        setSelectedData((prev) => ({ ...prev, stacks: newStackArray }));
      } else if (isRegister) {
        setRegisterData(newStackArray);
      }
    }
    const details = stackdetailsRef.current;
    if (details) {
      details.open = false;
    }
  };

  const removeStack = (selectedStack) => {
    const newStacks = stack.filter((stack) => stack !== selectedStack);
    setStack(newStacks);
    if (isWrite !== null || isMypage !== null) {
      setSelectedData((prev) => ({ ...prev, stacks: newStacks }));
    } else if (isRegister) {
      setRegisterData(newStacks);
    }
  };

  return (
    <div>
      <details ref={stackdetailsRef}>
        <SelectBox
          className={isRegister ? 'Login' : isMypage !== null ? 'mypage' : null}
        >
          스택을 선택해주세요.
          <SelectArrow />
        </SelectBox>
        <SelectBoxOpen
          className={isRegister ? 'Login' : isMypage !== null ? 'mypage' : null}
        >
          {ALL_STACK.map((oneStack, index) => {
            return (
              <Option
                className={stack.includes(oneStack) ? 'selected' : null}
                key={index}
                onClick={() => addStack(oneStack)}
              >
                {oneStack}
              </Option>
            );
          })}
        </SelectBoxOpen>
      </details>
      <StackWrap className={isMypage !== null ? 'mypage' : null}>
        {stack.map((oneStack, index) => {
          return (
            <MyStack key={index} onClick={() => removeStack(oneStack)}>
              #{oneStack}
              <Delete />
            </MyStack>
          );
        })}
      </StackWrap>
    </div>
  );
};

export const StackWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0px 10px;
  flex-wrap: wrap;
  gap: 10px;

  &.mypage {
    @media screen and (max-width: 600px) {
      text-align: center;
      justify-content: center;
    }
  }
`;

export default StackSelector;
