import React, { useState } from "react";
import Bookmark from "../components/Bookmark"
import MyProject from "../components/MyProject";
import JoinProject from "../components/JoinProject"
import { useMatch } from "react-router-dom";
import { MainBody } from "../styles/style"
import styled from "styled-components";

const MyPage = () => {
   const [tab, setTab] = useState(<Bookmark />);

   return (
      <>
         <MainBody>
            <Profilepic />
            닉네임 <br />
            <button>편집</button> <br />
         </MainBody>



         <WholeBody>
            <TabBody>
               <Tab onClick={() => { setTab(<Bookmark />) }}> 관심 프로젝트 </Tab>
               <Tab onClick={() => { setTab(<JoinProject />) }}> 참여한 프로젝트 </Tab>
               <Tab onClick={() => { setTab(<MyProject />) }}> 내가 쓴 프로젝트 </Tab>

            </TabBody>
            <PostBody>

               {tab}
            </PostBody>

         </WholeBody>




      </>
   )
}

const Profilepic = styled.div`
background-color: lightgray;
width: 160px;
height: 160px;
border-radius: 80px;
`;

const WholeBody = styled(MainBody)`
margin: 24px auto;
display: grid;
grid-template-columns: fit-content(40%) 100%;
max-width: 996px;
background-color: transparent;
padding: 0px;
gap:24px;
@media screen and (max-width: 996px){
  margin: 24px 40px;
}
`;

const Tab = styled.div`
line-height: 48px;
`;

const PostBody = styled.div`
background-color: ${(props) => props.theme.divBackGroundColor};
max-width: 792px;
border-radius: 16px;
padding: 32px;

`;

const TabBody = styled.div`
background-color: ${(props) => props.theme.divBackGroundColor};
width: 180px;
height: 251px;
border-radius: 16px;
padding: 32px 24px;

`;

export default MyPage;