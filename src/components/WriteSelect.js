import styled from "styled-components"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ko } from "date-fns/esm/locale"
import { MyStack } from "../styles/style"
import { ReactComponent as CapacityArrowDown } from "../styles/icon/capacityArrowDown.svg"
import { ReactComponent as CapacityArrowUp } from "../styles/icon/capacityArrowUp.svg"
import { useEffect, useRef } from "react"

const WriteSelect = ({
    selectedData,
    handleTitle,
    handleCapacity,
    addStack,
    removeStack,
    handleProcess,
    handleStartDate,
    setPeriod,
    stack,
    startDate,
    processdetailsRef,
    capacitydetailsRef,
    stackdetailsRef,
    perioddetailsRef,
    isEdit
}) => {

    useEffect(()=>{},[isEdit])
    
   console.log(isEdit)

    const period = ["1개월 미만", "1개월", "2개월", "3개월", "4개월", "5개월", "6개월", "6개월 이상"];
    const capacity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <>
            <TitleInput placeholder="컨텐츠 제목을 작성해주세요"
                required onChange={(event) => handleTitle(event.target.value)} maxLength={25} 
                defaultValue={isEdit ? selectedData.title : null }/>

            <hr style={{ border: "1px solid #e2e2e2" }} />

            <div style={{
                display: "grid",
                gridTemplateColumns: "150px auto",
                gridTemplateRows: "repeat(5, 1fr)",
                gap: "16px 0px", marginTop: "32px"
            }}>

                <SelectTitle>진행방식</SelectTitle>
                <details style={{ height: "40px" }} ref={processdetailsRef}>
                    <SelectBox>{selectedData.online}</SelectBox>
                    <SelectBoxOpen>
                        <Option onClick={() => handleProcess("온라인")}>온라인</Option>
                        <Option onClick={() => handleProcess("오프라인")}>오프라인</Option>
                    </SelectBoxOpen>
                </details>
                <SelectTitle>구인스택</SelectTitle>
                <div>
                    <details style={{ height: "40px" }} ref={stackdetailsRef}>
                        <SelectBox>스택을 선택해주세요.</SelectBox>
                        <SelectBoxOpen>
                            <Option onClick={() => addStack("Java")}>Java</Option>
                            <Option onClick={() => addStack("Javascript")}>Javascript</Option>
                            <Option onClick={() => addStack("TypeScript")}>TypeScript</Option>
                            <Option onClick={() => addStack("React")}>React</Option>
                            <Option onClick={() => addStack("Vue")}>Vue</Option>
                        </SelectBoxOpen>
                    </details>
                    <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
                        {stack?.map((stack, index) => {
                            return (
                                <MyStack style={{ margin: "0px 10px 10px 0px" }} key={index}>#{stack} <svg onClick={() => removeStack(stack)} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.99996 18.3327C14.6023 18.3327 18.3333 14.6017 18.3333 9.99935C18.3333 5.39698 14.6023 1.66602 9.99996 1.66602C5.39759 1.66602 1.66663 5.39698 1.66663 9.99935C1.66663 14.6017 5.39759 18.3327 9.99996 18.3327Z" stroke="#FFB673" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12.5 7.5L7.5 12.5" stroke="#FFB673" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.5 7.5L12.5 12.5" stroke="#FFB673" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                </MyStack>
                            )
                        })}
                    </div>
                </div>
                <SelectTitle>예상 진행 기간</SelectTitle>
                <details style={{ height: "40px" }} ref={perioddetailsRef}>

                    <SelectBox>{selectedData.period}<CapacityArrowDown /></SelectBox>
                    <SelectBoxOpen>
                        {period.map(month => (
                            <Option key={month}
                                onClick={() => { setPeriod(month) }}>{month}</Option>
                        ))}

                    </SelectBoxOpen>
                </details>
                <SelectTitle>시작 예정일 </SelectTitle>
                <DateInput
                    showPopperArrow={false}
                    fixedHeight
                    locale={ko}
                    dateFormat="yyyy/MM/dd (eee)"
                    selected={startDate}
                    placeholderText="날짜를 선택하세요"
                    minDate={new Date()}
                    onChange={date => handleStartDate(date)} />
                <SelectTitle ref={capacitydetailsRef}>모집인원</SelectTitle>

                <details style={{ height: "40px" }} ref={capacitydetailsRef}>

                    <SelectBox>{selectedData.maxCapacity}명 <CapacityArrowDown /></SelectBox>
                    <SelectBoxOpen>
                        {capacity.map(member => (
                            <Option key={member}
                                onClick={() => { handleCapacity(member) }}>{member}명</Option>
                        ))}

                    </SelectBoxOpen>
                </details>
            </div>
        </>
    )
}

export const SelectTitle = styled.div`
display: flex;
align-items: center;
`;

export const SelectBox = styled.summary`
line-height: 25px;
width: 200px;
height: 37px;
padding: 5px 10px;
border: ${(props) => props.theme.border};
border-radius: 8px;
font-size: 16px;
background-color: ${(props) => props.theme.inputBoxBackground};
list-style: none;
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

export const Option = styled.li`
cursor: pointer;
padding: 8px 12px;
:hover{
   background-color:${(props) => props.theme.keyColor};
   color:${(props) => props.theme.stackColor}
}
`;

export default WriteSelect;