import { Link, useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import React, { useEffect, useState } from "react";
import { ko } from "date-fns/esm/locale"
import Select from "react-select";
import { MainBody, Btn, LineBtn } from "../styles/style";
import styled from "styled-components";
import "../styles/style.css"


const Write = () => {
   const [selectedData, setSelectedData] = useState({
      title:"",
      capacity:1,
      period:0,
      stack:[],
      process:"",
      startDate:useState(new Date())
   })
   const title = React.useRef();
   const navigate = useNavigate();
   const [capacity, setCapacity] = useState("1명");
   const [startDate, setStartDate] = useState(new Date());
   console.log(startDate)

   const handleTitle = title => {
      setSelectedData(prev => ({...prev,title}));
   }

   const period = [1,2,3,4,5,6]

   const handleCapacity = capacity => {
      setSelectedData(prev => ({...prev,capacity}));
   }


   
   const [process, setProcess] = useState("온라인")
   const [stack, setStack] = useState("스택을 선택해주세요")
   const [selectperiod, setSelectPeriod] = useState("예상 진행 기간")

   useEffect(() => {
      console.log(selectedData.title.target?.value)
   }, [selectedData])

   return (
      <>
         <span onClick={() => navigate(-1)}> ⬅️ </span>
         <br />
         <WriteBody>

            <TitleInput placeholder="컨텐츠 제목을 작성해주세요" 
            required onChange={handleTitle} maxLength={20}/>

            <hr style={{ border: "1px solid #e2e2e2" }} />

            <div style={{ display: "grid", 
            gridTemplateColumns: "150px auto", 
            gridTemplateRows: "repeat(5, 1fr)", 
            gap: "16px 0px", marginTop: "32px" }}>


               <SelectTitle>진행방식</SelectTitle>
               <details style={{ height: "40px"}}>
                  <SelectBox>{process}</SelectBox>
                  <SelectBoxOpen>
                     <Option>온라인</Option>
                     <Option>오프라인</Option>
                  </SelectBoxOpen>

               </details>

               {/* <SelectBox name="online">
                     <option value="online">온라인</option>
                     <option value="online">오프라인</option>
                  </SelectBox> */}
               <SelectTitle>구인스택</SelectTitle>
               <details style={{ height: "40px" }}>

                  <SelectBox>{stack}</SelectBox>
                  <SelectBoxOpen>
                     <Option onClick={()=>setStack("Java")}>Java</Option>
                     <Option>Javascript</Option>
                     <Option>TypeScript</Option>
                     <Option>React</Option>
                     <Option>Vue</Option>
                  </SelectBoxOpen>
               </details>
               {/* <SelectBox name="stack" placeholder="스택을 선택해주세요">
                     <option value="java">JAVA</option>
                  </SelectBox> */}
               <SelectTitle>예상 진행 기간</SelectTitle>
               <details style={{ height: "40px" }}>

                  <SelectBox>{selectperiod}</SelectBox>
                  <SelectBoxOpen>
                     {period.map(month => (
                        <Option key={month}
                        onClick={()=>{setSelectPeriod(`${month}개월`)}}>{month}개월</Option>
                     ))}
            
                  </SelectBoxOpen>
               </details>
               <SelectTitle>시작 예정일</SelectTitle>
               <DateInput
                  showPopperArrow={false}
                  fixedHeight
                  locale={ko}
                  dateFormat="yyyy.MM.dd (eee)"
                  selected={startDate}
                  minDate={new Date()}
                  onChange={date => setStartDate(date)} />
               <SelectTitle>모집인원</SelectTitle>
               <details style={{ height: "40px" }} >

                  <SelectBox onChange={handleCapacity}>{selectedData.capacity}명</SelectBox>
                  <SelectBoxOpen >
                     <Option>1명</Option>
                     <Option>2명</Option>

                     <Option>3명</Option>
                     <Option>4명</Option>
                     <Option>5명</Option>
                     <Option>6명</Option>
                     <Option>6명 이상</Option>
                     <Option>미정</Option>
                  </SelectBoxOpen>
               </details>

            </div>
         </WriteBody>

         <MainBody>
            <h3>프로젝트 소개</h3>
            <ProjectTextarea placeholder="컨텐츠에 대한 설명을 작성해주세요." />
            <InputBtn type="submit">작성하기</InputBtn>
         </MainBody>

         <Publish>
            <LineBtn>전체 삭제</LineBtn>
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
}

`;

const Publish = styled.div`
display: flex;
justify-content: center;
margin: 80px;
`;

export default Write;