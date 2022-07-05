import React, { useState } from "react";
import Bookmark from "../components/Bookmark"
import MyProject from "../components/MyProject";
import JoinProject from "../components/JoinProject"
import { useMatch } from "react-router-dom";

const MyPage = () => {
   const [tab, setTab] = useState(<Bookmark />);
   
   return (
      <>

         <h1> 마이페이지 </h1>
         <div>
            닉네임 <br />
            <button>편집</button> <br />
            회원탈퇴
         </div>
         <div onClick={() => {setTab(<Bookmark />) }}> 관심 프로젝트 </div>
         <div onClick={() => {setTab(<MyProject />) }}> 내가 쓴 프로젝트 </div>
         <div onClick={() => {setTab(<JoinProject />) }}> 내가 참여한 프로젝트 </div>
         {tab}

   
      </>
   )
}

export default MyPage;