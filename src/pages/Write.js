import { Link, useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useState } from "react";
import { ko } from "date-fns/esm/locale"
import Select from "react-select";
import { MainBody } from "../styles/style";


const Write = () => {
   const navigate = useNavigate();
   const [selectCapacity, setSelectCapacity] = useState(null);
   const [startDate, setStartDate] = useState(new Date());
   console.log(startDate)


   const online = [
      { value: "online", label: "온라인" },
      { value: "offlone", label: "오프라인" }
   ]

   const [selectOnline, setSelectOnline] = useState(online[0]);

   const capacity = [
      { value: "tbd", label: "미정" },
      { value: 1, label: "1명" },
      { value: 2, label: "2명" },
      { value: 3, label: "3명" },
      { value: 4, label: "4명" },
      { value: 5, label: "5명" },
      { value: 6, label: "6명" },
      { value: 7, label: "7명" },
      { value: "10+", label: "10명 이상" }
   ]

   const period = [
      { value: "tbd", label: "기간 미정" },
      { value: "1개월", label: "1개월" },
      { value: "2개월", label: "2개월" },
      { value: "3개월", label: "3개월" },
      { value: "4개월", label: "4개월" },
      { value: "5개월", label: "5개월" },
      { value: "6개월", label: "6개월" },
   ]

   console.log(selectOnline?.value)

   const stack = [
      {}
   ]


   return (
      <>

         <span onClick={() => navigate(-1)}> ⬅️ </span>
         <br />
         <MainBody style={{marginBottom:"40px"}}>

            <input placeholder="컨텐츠 제목을 작성해주세요" required />

            <DatePicker
               locale={ko}
               dateFormat="yyyy년MM월dd일"
               selected={startDate} onChange={date => setStartDate(date)} />



<<<<<<< Updated upstream
=======
::placeholder{
   color:#e2e2e2;
}
`;


const DateInput = styled.input`
max-width: 193px;
height: 37px;
padding: 5px 10px;
border:1px solid #ddd;
border-radius: 8px;
font-size: 16px;
-webkit-appearance: none;
::placeholder{
   color:#e2e2e2;
}
`;

const SelectBox = styled.select`
max-width:111x;
height: 37px;
padding: 5px 10px;
border:1px solid #ddd;
border-radius: 8px;
font-size: 16px;
-webkit-appearance: none;
background-color: ${(props) => props.theme.inputBoxBackground};
`;

const ProjectTextarea = styled.textarea`
margin: 24px 0px;
border: 1px solid #e2e2e2;
background-color: #fbfbfb;
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
>>>>>>> Stashed changes


            <Select options={online}
               onChange={setSelectOnline}
               defaultValue={online[0]} />

<<<<<<< Updated upstream
            <Select options={capacity}
               placeholder="모집 인원을 선택해주세요." />

            <Select options={period}
               placeholder="기간을 선택해주세요." />
         </MainBody>
=======
const InputBtn = styled(Btn)`
display: flex;
margin-left: auto;
`;
>>>>>>> Stashed changes

      <MainBody>

         <h3>프로젝트 소개</h3>
         <textarea placeholder="컨텐츠에 대한 설명을 작성해주세요." />

         <button type="submit">작성하기</button>
      </MainBody>
         
      </>

   )
}

export default Write;