import { Link, useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import React, { useEffect, useState } from "react";
import { ko } from "date-fns/esm/locale"
import Select from "react-select";
import { MainBody, Btn, LineBtn, MyStack } from "../styles/style";
import styled from "styled-components";
import "../styles/style.css"
import { ReactComponent as CapacityArrowDown } from "../styles/icon/capacityArrowDown.svg"
import { ReactComponent as CapacityArrowUp } from "../styles/icon/capacityArrowUp.svg"


const Write = () => {
   const [selectedData, setSelectedData] = useState({
      title: "",
      capacity: 1,
      period: 0,
      stack: [],
      process: "온라인",
      content: "",
      startDate: 0
   })


   const navigate = useNavigate();
   const [startDate, setStartDate] = useState(new Date());
   console.log(startDate)

   const handleTitle = title => {
      setSelectedData(prev => ({ ...prev, title }));
   }
   const handleContent = content => {
      setSelectedData(prev => ({ ...prev, content }));
   }

   const period = [1, 2, 3, 4, 5, 6];
   const capacity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

   const handleCapacity = capacity => {
      setSelectedData({ capacity: capacity });
   }

   const setPeriod = period => {
      setSelectedData({ period: period })
   }

   const handleProcess = (selectedProcess) => {
      setSelectedData({ process: selectedProcess })
   }


   const [stack, setStack] = useState([])

   useEffect(() => {
      console.log(selectedData)
   }, [selectedData])

   const addStack = (newStack) => {
      setStack([...stack, newStack])
      setSelectedData({stack:stack})
   }

   const removeStack = (selectedStack) => {
      console.log(stack)
      console.log(selectedStack)
      const newStacks = stack.filter((stack) => stack !== selectedStack)
      console.log(newStacks)
      setStack(newStacks)
      setSelectedData({stack:newStacks})
   }
   console.log(selectedData.process)
   console.log(selectedData)
   return (
      <>
         <span onClick={() => navigate(-1)}> ⬅️ </span>
         <br />
         <WriteBody>

            <TitleInput placeholder="컨텐츠 제목을 작성해주세요"
               required onChange={(event) => handleTitle(event.target.value)} maxLength={25} />

            <hr style={{ border: "1px solid #e2e2e2" }} />

            <div style={{
               display: "grid",
               gridTemplateColumns: "150px auto",
               gridTemplateRows: "repeat(5, 1fr)",
               gap: "16px 0px", marginTop: "32px"
            }}>


               <SelectTitle>진행방식</SelectTitle>
               <details style={{ height: "40px" }}>
                  <SelectBox>{selectedData.process}</SelectBox>
                  <SelectBoxOpen>
                     <Option onClick={() => handleProcess("온라인")}>온라인</Option>
                     <Option onClick={() => handleProcess("오프라인")}>오프라인</Option>
                  </SelectBoxOpen>

               </details>

               {/* <SelectBox name="online">
                     <option value="online">온라인</option>
                     <option value="online">오프라인</option>
                  </SelectBox> */}
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
                  <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
                     {stack.map((stack, index) => {
                        return (
                           <MyStack style={{ margin: "0px 10px 10px 0px" }}>#{stack} <svg onClick={() => removeStack(stack)} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.99996 18.3327C14.6023 18.3327 18.3333 14.6017 18.3333 9.99935C18.3333 5.39698 14.6023 1.66602 9.99996 1.66602C5.39759 1.66602 1.66663 5.39698 1.66663 9.99935C1.66663 14.6017 5.39759 18.3327 9.99996 18.3327Z" stroke="#FFB673" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M12.5 7.5L7.5 12.5" stroke="#FFB673" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M7.5 7.5L12.5 12.5" stroke="#FFB673" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                           </svg>
                           </MyStack>
                        )
                     })}
                  </div>

               </div>

               {/* <SelectBox name="stack" placeholder="스택을 선택해주세요">
                     <option value="java">JAVA</option>
                  </SelectBox> */}
               <SelectTitle>예상 진행 기간</SelectTitle>
               <details style={{ height: "40px" }}>

                  <SelectBox>{selectedData.period}개월 <CapacityArrowDown /></SelectBox>
                  <SelectBoxOpen>
                     {period.map(month => (
                        <Option key={month}
                           onClick={() => { setPeriod(month) }}>{month}개월</Option>
                     ))}

                  </SelectBoxOpen>
               </details>
               <SelectTitle>시작 예정일 </SelectTitle>
               <DateInput
                  showPopperArrow={false}
                  fixedHeight
                  locale={ko}
                  dateFormat="yyyy.MM.dd (eee)"
                  selected={startDate}
                  minDate={new Date()}
                  onChange={date => setStartDate(date)} />
               <SelectTitle>모집인원</SelectTitle>

               <details style={{ height: "40px" }}>

                  <SelectBox>{selectedData.capacity}명 <CapacityArrowDown /></SelectBox>
                  <SelectBoxOpen>
                     {capacity.map(member => (
                        <Option key={member}
                           onClick={() => { handleCapacity(member) }}>{member}명</Option>
                     ))}

                  </SelectBoxOpen>
               </details>
            </div>
         </WriteBody>

         <MainBody>
            <h3>프로젝트 소개</h3>
            <ProjectTextarea placeholder="컨텐츠에 대한 설명을 작성해주세요."
            onChange={(event)=>{handleContent(event.target.value)}}/>
         </MainBody>

         <Publish>
            <LineBtn style={{ marginRight: "26px" }}>전체 삭제</LineBtn>
            <Btn type="submit">프로젝트 등록하기</Btn>
         </Publish>
      </>
   )
}

const WriteBody = styled(MainBody)`
 margin-bottom: 40px;
 margin-top: 143px;
`;

const TitleInput = styled.input`
font-size: 40px;
font-weight: bold;
border: 0px transparent;
background-color: transparent;
:focus{
   outline: none;
}



::placeholder{
   color:#e2e2e2;
}
`;

const SelectTitle = styled.div`
display: flex;
align-items: center;
`;

const DateInput = styled(DatePicker)`
background-color: ${(props) => props.theme.inputBoxBackground};
height: 37px;
padding: 5px 10px;
border: ${(props) => props.theme.border};
border-radius: 8px;
font-size: 16px;
::placeholder{
   color:#e2e2e2;
}
`;

// const SelectBox = styled.select`
// max-width:111x;
// height: 37px;
// padding: 5px 10px;
// border: ${(props) => props.theme.border};
// border-radius: 8px;
// font-size: 16px;
// -webkit-appearance: none;
// background-color: ${(props) => props.theme.inputBoxBackground};

// `;

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

const ProjectTextarea = styled.textarea`
margin: 24px 0px;
border: ${(props) => props.theme.border};
background-color: ${(props) => props.theme.textareaBackground};
resize: none;
width:100%;
height: 160px;
border-radius: 8px;
padding: 12px;
font-size: 16px;

:focus{
   outline: none;
}
`;

const InputBtn = styled(Btn)`
display: flex;
margin-left: auto;
`;

const SelectBoxOpen = styled.ul`
max-height: 200px;

z-index: 10;
border-radius: 8px;
position: absolute;
width: 200px;
border: ${(props) => props.theme.border};
background-color: ${(props) => props.theme.inputBoxBackground};
box-shadow: 0px 4px 4px 0px rgb(0,0,0,0.1);
overflow: scroll;
margin-top: 4px;

`;

const Option = styled.li`
cursor: pointer;
padding: 8px 12px;

:hover{
   background-color:${(props) => props.theme.keyColor};
   color:${(props) => props.theme.stackColor}
}

`;

const Publish = styled.div`
display: flex;
justify-content: center;
margin: 80px;
`;




export default Write;