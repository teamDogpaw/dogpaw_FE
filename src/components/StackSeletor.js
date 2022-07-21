import { MyStack } from "../styles/style";
import { Option, SelectBox, SelectBoxOpen } from "./WriteSelect";
import { ReactComponent as Delete } from "../styles/icon/global/stackDelete.svg"
import { useEffect, useRef, useState } from "react";
import { useMatch } from "react-router-dom";

const StackSelector = ({
    isEdit,
    setSelectedData,
    data,
    setMyData,
}) => {

let [stack, setStack] = useState([])
const isWrite = useMatch(`/write/*`)

console.log(isWrite)
useEffect(()=>{
if(isEdit || isWrite === null){
    setStack(data.stacks)
}
},[isEdit])

const stackdetailsRef = useRef(null);

const addStack = (newStack) => {
    if(!stack.includes(newStack)) {
         stack[stack.length] = newStack;
         if(isWrite !== null){
            setSelectedData((prev) => ({ ...prev, stacks: stack }))
         } else if (isWrite === null) {
            setMyData((prev) => ({...prev, stacks:stack}))
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
    if(isWrite !== null){
        setSelectedData((prev) => ({ ...prev, stacks: newStacks }))
     } else if (isWrite === null) {
        setMyData((prev) => ({...prev, stacks:newStacks}))
     }
 }

const stackOptions = [
    {id:1, stack:"Java"},
    {id:2, stack:"Javascript"},
    {id:3, stack:"TypeScript"},
    {id:4, stack:"React"},
    {id:5, stack:"Vue"},
    {id:6, stack:"Java"},
    {id:7, stack:"Nodejs"},
    {id:8, stack:"Spring"},
    {id:9, stack:"Nextjs"},
    {id:10, stack:"Nestjs"}
]
    return (
        <div>
            <details style={{ height: "40px" }} ref={stackdetailsRef}>
                <SelectBox> 스택을 선택해주세요.</SelectBox>
                <SelectBoxOpen>
                    {stackOptions.map ((stack)=>{
                        return (
                            <Option key={stack.id}
                            onClick={() => addStack(stack.stack)}>
                            {stack.stack}</Option>
                        )
                    })}
                </SelectBoxOpen>
            </details>
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
                {stack.map((stack, index) => {
                    return (
                        <MyStack style={{ margin: "0px 10px 10px 0px" }} 
                        key={index}
                        onClick={() => removeStack(stack)}
                        >
                            #{stack} 
                        <Delete/>
                        </MyStack>
                    )
                })}
            </div>
        </div>
    )
}

export default StackSelector;