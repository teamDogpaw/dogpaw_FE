import { useNavigate, useParams,useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { MainBody, Btn, GrayLineBtn } from "../styles/style";
import styled from "styled-components";
import "../styles/style.css"
import dayjs from "dayjs";
import WriteSelect from "../components/WriteSelect";
import { useEditProject, usePostProject } from "../hook/usePostMutation";

const Write = () => {
   const {state} = useLocation()
   console.log(state)
   const [isEdit, setIsEdit] = useState(false);
   console.log(isEdit)
   const params = useParams()
   const postId = params.id
   const navigate = useNavigate()
   const {mutateAsync: editProject} = useEditProject();
   const {mutateAsync : postProject} = usePostProject();
   const processdetailsRef = useRef(null);
 
   const perioddetailsRef = useRef(null);
   const capacitydetailsRef = useRef(null);

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

   const publishPost = async () => {
      try {
         await postProject(selectedData)
         navigate("/")
      }
      catch (error) {
         alert(error)
      }
   }

   const editPost = async () => {
      await editProject({data:selectedData, postId} )
      navigate(`/detail/${postId}`)
}

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
      if (postId !== undefined) {
         setIsEdit(true);
         setStack(state.stacks)
         setSelectedData({
            content: state.content,
            online: state.onLine,
            stacks: state.stacks,
            title: state.title,
            maxCapacity: state.maxCapacity,
            period: state.period,
            startAt: state.startAt
         })
      }
   }, [])




   return (
      <>
         <span onClick={() => navigate(-1)}> ⬅️ </span>
         <br />
         <WriteBody>
            <WriteSelect
               selectedData={selectedData}
               handleTitle={handleTitle}
               handleCapacity={handleCapacity}
               
             
               handleProcess={handleProcess}
               handleStartDate={handleStartDate}
               setPeriod={setPeriod}
               stack={stack}
               startDate={startDate}
               processdetailsRef={processdetailsRef}
               capacitydetailsRef={capacitydetailsRef}
             
               perioddetailsRef={perioddetailsRef}
               isEdit={isEdit}
               setSelectedData={setSelectedData}
             
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
            <Btn type="submit" onClick={editPost}>프로젝트 수정하기</Btn>: 
            <Btn type="submit" onClick={publishPost}>프로젝트 등록하기</Btn>}
            
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

