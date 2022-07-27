import { useNavigate, useParams,useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { MainBody, Btn, GrayLineBtn } from "../styles/style";
import styled from "styled-components";
import "../styles/style.css"
import dayjs from "dayjs";
import WriteSelect from "../components/WriteSelect";
import { useEditProject, usePostProject } from "../hook/usePostMutation";
import { ReactComponent as Arrow } from "../styles/icon/detail/backArrow.svg";
import AlertModal from "../components/AlertModal";
import { Content } from "../components/ApplyBtn";

const Write = () => {
   const location = useLocation()
   const {state} = useLocation()
   const [isEdit, setIsEdit] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);
   console.log(isEdit)
   const params = useParams()
   const postId = params.id
   console.log(params)
   const navigate = useNavigate()
   const {mutateAsync : editProject} = useEditProject();
   const {mutateAsync : postProject} = usePostProject();
   const processdetailsRef = useRef(null);
   const perioddetailsRef = useRef(null);
   const capacitydetailsRef = useRef(null);

   const [startDate, setStartDate] = useState(new Date());
   const [selectedData, setSelectedData] = useState({
      title: "",
      maxCapacity: 1,
      period: "예상 진행 기간",
      stacks: [],
      online: "온라인",
      content: "",
      startAt: dayjs(new Date()).format("YYYY/MM/DD")
   })

   const openModal = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };

   const publishPost = async () => {
     if (selectedData.title.length === 0) {
      openModal();
     } else {
       try {
         await postProject(selectedData);
         navigate("/");
       } catch (error) {
         alert(error);
       }
     }
   };

   const editPost = async () => {
      await editProject({ data:selectedData, postId} )
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
     
      console.log(state)
      console.log(postId)
      if (postId !== undefined) {
         setIsEdit(true);
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
      console.log(selectedData)
   }, [state])

   return (
      <Wrap>
     <Leftarrow
            onClick={() => {
              navigate(-1);
            }}
          />
         <WriteBody>
      
            <WriteSelect
               selectedData={selectedData}
               handleTitle={handleTitle}
               handleCapacity={handleCapacity}
               
             
               handleProcess={handleProcess}
               handleStartDate={handleStartDate}
               setPeriod={setPeriod}
               startDate={startDate}
               processdetailsRef={processdetailsRef}
               capacitydetailsRef={capacitydetailsRef}
             
               perioddetailsRef={perioddetailsRef}
               isEdit={isEdit}
               setSelectedData={setSelectedData}
             
            />
         </WriteBody>

         <MainBody>
            <TextareaTitle>프로젝트 소개</TextareaTitle>
            <ProjectTextarea placeholder="컨텐츠에 대한 설명을 작성해주세요."
               onChange={(event) => { handleContent(event.target.value) }}
               defaultValue={isEdit ? selectedData.content : null}
            />
         </MainBody>

         <Publish>
            {/* <GrayLineBtn>전체 삭제</GrayLineBtn> */}
            {isEdit ? 
            <Btn type="submit" onClick={editPost}>프로젝트 수정하기</Btn>: 
            <Btn type="submit" onClick={publishPost}>프로젝트 등록하기</Btn>}
            
         </Publish>
         <AlertModal open={modalOpen}>
        <Content>
          <h4>글 제목을 입력해 주세요!</h4>
          <div>
            <Btn onClick={closeModal}> 닫기 </Btn>
          </div>
        </Content>
      </AlertModal>
      </Wrap>
   )
}

const Wrap = styled.div`
max-width: 996px;
  margin: auto;
  margin-bottom: 150px;
  position: relative;


  `;

const WriteBody = styled(MainBody)`
  margin-bottom: 40px;
padding-top: 80px;
@media screen and (max-width:700px){
   width: 100%;
   margin: 0;
  }
`;

const TextareaTitle = styled.h3`
text-align: center;
`;

const ProjectTextarea = styled.textarea`
margin: 24px 0px;
border: ${(props) => props.theme.border};
background-color: ${(props) => props.theme.backgroundColor};
resize: none;
width:100%;
height: 160px;
border-radius: 8px;
padding: 12px;
font-size: 16px;
:focus{
   outline: none;
}
@media screen and (max-width:700px){
   width: 100%;
   padding: 12px;
   height: 300px;
   font-size: 14px;
  }

`;

const Publish = styled.div`
position: absolute;
right: 32px;
margin-bottom: 500px;
`;

const Leftarrow = styled(Arrow)`
  position: absolute;
  top:25px;
  left: 30px;
  stroke: ${(props) => props.theme.toggleFontColor};


`;

export default Write;

