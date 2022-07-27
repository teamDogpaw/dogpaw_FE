import { MyStack, SelectBoxOpen, SelectBox, Option } from "../styles/style";
import { ReactComponent as Delete } from "../styles/icon/global/stackDelete.svg"
import { useEffect, useRef, useState } from "react";
import { useMatch } from "react-router-dom";
import { Stacks } from "../utils/enums";
import { SelectArrow } from "./WriteSelect";
import styled from "styled-components";

const StackSelector = ({
    isEdit,
    setSelectedData,
    data,
    setMyData,
    setRegisterData
}) => {

    const ALL_STACK = Object.values(Stacks)

    let [stack, setStack] = useState([])
    const isMypage = useMatch(`/mypage`);
    const isMain = useMatch(`/`);
    const isWrite = useMatch(`/write/*`)

    useEffect(() => {
        if (isEdit === true || isMypage !== null) {
            setStack(data.stacks)
            //console.log(stack)
            //console.log(data.stacks)
        }
    }, [isEdit])

    const stackdetailsRef = useRef(null);

    const addStack = (newStack) => {
        if (!stack.includes(newStack)) {
            const newStackArray = stack.concat(newStack)
            setStack(newStackArray)
            if (isWrite !== null) {
                setSelectedData((prev) => ({ ...prev, stacks: newStackArray }))
            } else if (isMypage !== null) {
                setMyData((prev) => ({ ...prev, stacks: newStackArray }))
            } else if (isMain !== null) {
                setRegisterData(newStackArray)
                
            }
        }
        const details = stackdetailsRef.current;
        if (details) {
            details.open = false;
        }
    }

    const removeStack = (selectedStack) => {
        const newStacks = stack.filter((stack) => stack !== selectedStack)
        setStack(newStacks)
        if (isWrite !== null) {
            setSelectedData((prev) => ({ ...prev, stacks: newStacks }))
        } else if (isMypage !== null) {
            setMyData((prev) => ({ ...prev, stacks: newStacks }))
        } else if (isMain !== null) {
            setRegisterData(newStacks)
        }
    }

    return (
        <div>
            <details ref={stackdetailsRef}>
                <SelectBox className={isMain !== null ? "Login" : null}> 스택을 선택해주세요.<SelectArrow /></SelectBox>
                <SelectBoxOpen className={isMain !== null ? "Login" : null}>
                    {ALL_STACK.map((stack, index) => {
                        return (
                            <Option className={isMain !== null ? "Login" : null} key={index}
                                onClick={() => addStack(stack)}>
                                {stack}</Option>
                        )
                    })}
                </SelectBoxOpen>
            </details>
            <StackWrap >
                {stack.map((stack, index) => {
                    return (
                        <MyStack
                            key={index}
                            onClick={() => removeStack(stack)}
                        >
                            #{stack}
                            <Delete />
                        </MyStack>
                    )
                })}
            </StackWrap>
        </div>
    )
}
export const StackWrap =styled.div`
display: flex;
flex-direction: row;
margin: 10px 0px 10px;
`;

export default StackSelector;