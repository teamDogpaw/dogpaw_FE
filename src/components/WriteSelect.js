import styled from "styled-components"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ko } from "date-fns/esm/locale"
import { MyStack, SelectBox } from "../styles/style"
import { ReactComponent as CapacityArrowDown } from "../styles/icon/global/arrowDown.svg"
import { ReactComponent as CapacityArrowUp } from "../styles/icon/global/arrowUp.svg"
import { useEffect, useRef } from "react"
import StackSelector from "./StackSeletor"
import { Capacity, Period } from "../utils/enums"


const WriteSelect = ({
    selectedData,
    handleTitle,
    handleCapacity,
    handleProcess,
    handleStartDate,
    setPeriod,
    startDate,
    processdetailsRef,
    capacitydetailsRef,
    perioddetailsRef,
    isEdit,
    setSelectedData
}) => {

    const ALL_PERIOD = Object.values(Period)
    const ALL_CAPACITY = Object.values(Capacity)

    //console.log(isEdit)
    const dateRef = useRef()

    const DATE_FORMAT = 'yyyy/MM/dd (eee)';
    const DATE_FORMAT_CALENDAR = 'yyyy년 MM월';

    useEffect(() => {
        //console.log(dateRef.current)
    }, [isEdit, dateRef])
    return (
        <>
            <TitleInput placeholder="컨텐츠 제목을 작성해주세요"
                required onChange={(event) => handleTitle(event.target.value)} maxLength={25}
                defaultValue={isEdit ? selectedData.title : null} />

            <HeadLine/>

            <SelectWrap>
<Selects>
<SelectTitle>진행방식</SelectTitle>
                <Detail ref={processdetailsRef}>
                    <SelectBox>{selectedData.online}<SelectArrow /></SelectBox>
                    <SelectBoxOpen>
                        <Option onClick={() => handleProcess("온라인")}>온라인</Option>
                        <Option onClick={() => handleProcess("오프라인")}>오프라인</Option>
                    </SelectBoxOpen>
                </Detail>
    
</Selects>
          
           <Selects>
           <SelectTitle>예상 진행 기간</SelectTitle>
                <Detail ref={perioddetailsRef}>

                    <SelectBox>{selectedData.period}<SelectArrow /></SelectBox>
                    <SelectBoxOpen>
                        {ALL_PERIOD.map(month => (
                            <Option key={month}
                                onClick={() => { setPeriod(month) }}>{month}</Option>
                        ))}

                    </SelectBoxOpen>
                </Detail>
           </Selects>
            <Selects>
            <SelectTitle>시작 예정일 </SelectTitle>
                <Wrapper>
                    <DateInput
                        showPopperArrow={false}
                        fixedHeight
                        locale={ko}
                        dateFormat={DATE_FORMAT}
                        selected={isEdit ? new Date(selectedData.startAt) : startDate}
                        dateFormatCalendar={DATE_FORMAT_CALENDAR}
                        minDate={isEdit ? null : new Date()}
                        onChange={date => handleStartDate(date)}
                        // shouldCloseOnSelect={false}
                        openToDate={new Date(selectedData.startAt)}
                        calendarClassName="calendar"
                    />
                </Wrapper>
            </Selects>
                <Selects>
                <SelectTitle ref={capacitydetailsRef}>모집인원</SelectTitle>

<Detail ref={capacitydetailsRef}>

    <SelectBox>{selectedData.maxCapacity}명 <SelectArrow /></SelectBox>
    <SelectBoxOpen>
        {ALL_CAPACITY.map(member => (
            <Option key={member}
                onClick={() => { handleCapacity(member) }}>{member}명</Option>
        ))}

    </SelectBoxOpen>
</Detail>
                </Selects>
                <Selects className="Stack">
           <SelectTitle>구인스택</SelectTitle>
                <StackSelector
                    isEdit={isEdit}
                    setSelectedData={setSelectedData}
                    data={selectedData}
                />
           </Selects>

                
           
       

            </SelectWrap>
        </>
    )
}

export const SelectWrap = styled.div`
display: grid;
grid-template-columns: repeat(2,1fr);
margin-top: 24px;
row-gap: 20px;
column-gap:10px;

@media screen and (max-width:700px) {
    display: flex;
    flex-direction: column;
    grid-template-columns: 1fr;
}
`;

export const Selects = styled.div`
    display:grid;
    grid-template-columns: 100px 1fr;
    align-items: baseline;
    justify-items: start;
    column-gap: 20px;

&.Stack{
    grid-column: 1 / 3;
    flex-wrap: wrap;
}

@media screen and (max-width:700px) {


&.Stack{
    flex-wrap: wrap;
}
}
`;

export const SelectTitle = styled.div`
display: flex;
align-items: center;
`;


export const TitleInput = styled.input`
display: -webkit-box;
font-size: 2.5rem;
width: 100%;
overflow-y: auto;
font-weight: bold;
border: 0px transparent;
background-color: transparent;
text-align: center;
-webkit-line-clamp: 2; // 원하는 라인수
 -webkit-box-orient: vertical;
 word-wrap : break-word; 
max-height: 200px;
:focus{
   outline: none;
}
::placeholder{
   color:${(props)=>props.theme.placeHolder};
   -webkit-line-clamp: 2; // 원하는 라인수
 -webkit-box-orient: vertical;
}
@media screen and (max-width:500px) {
    font-size: 1.5rem;
}
`;

export const DateInput = styled(DatePicker)`

background-color: ${(props) => props.theme.inputBoxBackground};
height: 37px;
padding: 5px 10px;
border: ${(props) => props.theme.border};
border-radius: 8px;
font-size: 1rem;
cursor: pointer;
::placeholder{
   color:#e2e2e2;
}
:focus{
    outline: none;
}
@media screen and (max-width:600px) {
    font-size: 0.875rem;
  }


`;

const Wrapper = styled.div`
z-index: 10;

.react-datepicker {
  font-family: "Helvetica Neue", helvetica, arial, sans-serif;
  font-size: 0.8rem;
  color: ${(props) => props.theme.textColor};
  border: transparent;
  display: inline-block;
  border-radius: 6px;
  position: relative;
  box-shadow:${(props) => props.theme.boxShadow};
  background-color: transparent;
}

.react-datepicker__month-container {
background-color: ${(props) => props.theme.divBackGroundColor};
border-radius: 6px;
}

.react-datepicker__header {
background-color: ${(props) => props.theme.keyColor};
color:white;
border-bottom: transparent;
  border-top-left-radius: 8px;
  padding: 10px 0;
}


.react-datepicker__day--selected, 
.react-datepicker__day--in-range
 {
  border-radius: 50%;
  background-color: ${(props) => props.theme.keyColor};
  :hover {
    background-color: white;
}
}

.react-datepicker__current-month {
    color:${(props) => props.theme.textColor_btn};
}

.react-datepicker__tab-loop {
    position: fixed;
}

//일자
.react-datepicker__day{
  color: ${(props) => props.theme.textColor};
  display: inline-block;
  width: 1.7rem;
  line-height: 1.7rem;
  text-align: center;
  margin: 0.166rem;
  :hover{
    border-radius:50%;
    color:${(props) => props.theme.divBackGroundColor};
    background-color: ${(props) => props.theme.textColor_sub};
  }
}

//요일 전체
.react-datepicker__day-name{
    color:${(props) => props.theme.textColor_btn};
    margin-top: 10px;
}

.react-datepicker__navigation-icon{
::before {
  border-color: ${(props) => props.theme.textColor_btn};
}

:hover{
    border-color: #eee;
}
}

.react-datepicker__navigation:hover *::before {
  border-color: #eeeeee;
}

`;

export const SelectBoxOpen = styled.ul`
max-height: 200px;
z-index: 20;
border-radius: 8px;
position: absolute;
width: 200px;
border: ${(props) => props.theme.border};
background-color: ${(props) => props.theme.inputBoxBackground};
box-shadow: ${(props) => props.theme.boxShadow};
overflow-y: scroll;
margin-top: 4px;
`;

export const Option = styled.li`
cursor: pointer;
padding: 8px 12px;
:hover{
   background-color:${(props) => props.theme.keyColor};
   color:${(props) => props.theme.stackColor}
}
`;

export const Detail = styled.details`
height: 40px;
cursor: pointer;
`;

export const SelectArrow = styled(CapacityArrowDown)`
position: absolute;
margin-top: 8px;
right: 10px;
`;

export const HeadLine = styled.hr`
border: ${(props)=>props.theme.border};
`;
export default WriteSelect;