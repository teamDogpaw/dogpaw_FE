import { Link, useNavigate, useParams } from "react-router-dom";
import ReactDatePicker from "react-datepicker";

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { MainBody, Btn, LineBtn, MyStack, GrayLineBtn } from "../styles/style";
import styled from "styled-components";
import "../styles/style.css"
import { Mutation, useMutation, useQuery } from "react-query"

import dayjs from "dayjs";
import axios from "axios";
import instance from "../shared/axios";
import WriteSelect from "../components/WriteSelect";

const Write = () => {
   const [isEdit, setIsEdit] = useState(false);
   const params = useParams()
   const postId = params.id
   const navigate = useNavigate()

   const processdetailsRef = useRef(null);
   const stackdetailsRef = useRef(null);
   const perioddetailsRef = useRef(null);
   const capacitydetailsRef = useRef(null);

   //⚠️ 데이터 부르지말고 detail에서 가져와서 쓰기
   const getPostData = () => {
      if(isEdit){
return instance.get(`api/post/detail/${postId}`);
      }
      
   };

   const { isLoading, error, data } = useQuery("detailList", getPostData, {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
         const PostData = data?.data
         return PostData
      },
      onError: (e) => {
         console.log(e.message);
      },
   });

   const [startDate, setStartDate] = useState(new Date());
   const [stack, setStack] = useState([])
   const [selectedData, setSelectedData] = useState({
      title: "",
      maxCapacity: 1,
      period: "예상 진행 기간",
      stacks: [],
      online: "온라인",
      content: "",
      startAt: dayjs(new Date()).format("YYYY/MM/DD")
   })

   const PostPublish = async () => {
      try {
         await instance.post(`/api/post`, selectedData)
         navigate("/")
      }
      catch (error) {
         alert(error)
      }
   }

   const PostEdit = useMutation(() => {
      instance.put(`/api/post/${postId}`, selectedData)
      navigate("/")
})


   
   const handleStartDate = startDate => {
      setStartDate(startDate)
      setSelectedData(prev => ({ ...prev, startAt: dayjs(startDate).format("YYYY/MM/DD") }))
   }

   const handleTitle = title => {
      setSelectedData(prev => ({ ...prev, title }));
   }

   const handleContent = content => {
      setSelectedData(prev => ({ ...prev, content }));
   }

   const handleCapacity = capacity => {
      setSelectedData(prev => ({ ...prev, maxCapacity: capacity }));
      const details = capacitydetailsRef.current;
      if (details) {
         details.open = false;
      }
   }

   const setPeriod = period => {
      setSelectedData(prev => ({ ...prev, period }))
      const details = perioddetailsRef.current;
      if (details) {
         details.open = false;
      }
   }

   const handleProcess = (selectedProcess) => {
      setSelectedData(prev => ({ ...prev, online: selectedProcess }))
      const details = processdetailsRef.current;
      if (details) {
         details.open = false;
      }
   }



   useEffect(() => {
      console.log(selectedData)
      console.log(postId)
      if (postId !== undefined) {
         setIsEdit(true);
         console.log(data?.data.stacks)
         setStack(data?.data.stacks)
         setSelectedData({
            content: data?.data.content,
            online: data?.data.onLine,
            stacks: data?.data.stacks,
            title: data?.data.title,
            maxCapacity: data?.data.maxCapacity,
            period: data?.data.period,
            startAt: data?.data.startAt
         })

      }
   }, [])

   const addStack = (newStack) => {

      if (!stack.includes(newStack)) {
         setStack([...stack, newStack])
         setSelectedData(prev => ({ ...prev, stacks: stack }))
      } else {
         return null
      }
      const details = stackdetailsRef.current;
      if (details) {
         details.open = false;
      }

   }

   const removeStack = (selectedStack) => {
      console.log(stack)
      console.log(selectedStack)
      const newStacks = stack.filter((stack) => stack !== selectedStack)
      console.log(newStacks)
      setStack(newStacks)
      setSelectedData(prev => ({ ...prev, stacks: newStacks }))
   }

   return (
      <>
         <span onClick={() => navigate(-1)}> ⬅️ </span>
         <br />
         <WriteBody>
            <WriteSelect
               selectedData={selectedData}
               handleTitle={handleTitle}
               handleCapacity={handleCapacity}
               addStack={addStack}
               removeStack={removeStack}
               handleProcess={handleProcess}
               handleStartDate={handleStartDate}
               setPeriod={setPeriod}
               stack={stack}
               startDate={startDate}
               processdetailsRef={processdetailsRef}
               capacitydetailsRef={capacitydetailsRef}
               stackdetailsRef={stackdetailsRef}
               perioddetailsRef={perioddetailsRef}
               isEdit={isEdit}
            />
         </WriteBody>

         <MainBody>
            <h3>프로젝트 소개</h3>
            <ProjectTextarea placeholder="컨텐츠에 대한 설명을 작성해주세요."
               onChange={(event) => { handleContent(event.target.value) }}
               defaultValue={isEdit ? selectedData.content : null}
            />
         </MainBody>

         <Publish>
            <GrayLineBtn>전체 삭제</GrayLineBtn>
            {isEdit ? 
            <Btn type="submit" onClick={()=>{PostEdit.mutate(selectedData)}}>프로젝트 수정하기</Btn>: 
            <Btn type="submit" onClick={PostPublish}>프로젝트 등록하기</Btn>}
            
         </Publish>
      </>
   )
}


const WriteBody = styled(MainBody)`
  margin-bottom: 40px;
  margin-top: 143px;
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


const Publish = styled.div`
  display: flex;
  justify-content: center;
  margin: 80px;
  gap:26px;
`;



export default Write;

