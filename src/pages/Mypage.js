
import React, { useEffect, useRef, useState } from "react";
import Bookmark from "../components/Bookmark"
import MyProject from "../components/MyProject";
import JoinProject from "../components/JoinProject"
import { useMatch, useNavigate } from "react-router-dom";
import { Btn, MainBody, MyStack, Option, SelectBoxOpen, PostBody } from "../styles/style"
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import ViewApply from "../components/ViewApply";

import instance from "../shared/axios";
import { UserInfoAtom } from "../atom/atom";
import profilepic from "../styles/icon/defaultProfile.svg";
import { SelectBox } from "../components/WriteSelect";
import bookmark_fill from "../styles/icon/u_bookmark.svg"
import { ReactComponent as StackDelete} from "../styles/icon/stackDelete.svg"

const MyPage = () => {
   const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
   const navigate = useNavigate();
   const [isEdit, setIsEdit] = useState(false);
   const stackdetailsRef = useRef(null);
   const imageRef = useRef();
   const [viewApply, setViewApply] = useState(false);
   const [tab, setTab] = useState(<Bookmark viewApply={viewApply} viewApplyModal={viewApplyModal} />);
console.log(userInfo)
console.log(viewApply)
   const formData = new FormData()

   useEffect(()=>{},[userInfo])
   const [myData, setMyData] = useState({
      profileImg: userInfo?.profileImg,
      nickname: userInfo?.nickname,
      stacks: userInfo?.stacks
   })

   //⚠️ 프로필 이미지 넣지 않으면 편집 완료 못함
   const EditMyData = async () => {
      console.log(myData)
      formData.append("image", myData.profileImg);
      const data = {
         stacks: myData.stacks,
         nickname: myData.nickname
      }
      const formdata = JSON.stringify(data)
      const blob = new Blob([formdata], { type: 'application/json' })
      formData.append("body", blob)
      try {
         await instance.put(`/api/user/info`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
         })
      }
      catch (error) {
         alert(error)
      }
      setIsEdit(false)
      navigate("/mypage")
   }

   const basic = async () => {
      try {
         await instance.post(`/api/user/profile/basic`)
      } catch (error) {
         alert(error)
      }
   }

   //    image - imagefile
   //    body {stacks: value,
   //          nickname: value}
   // =>    한번에 만들어서 한번에 blovb
   //          {nickname: value}

   //state안에 새 stack 넣기
   const addStack = (newStack) => {
      if (!myData.stacks.includes(newStack)) {
         setMyData(prev => ({ ...prev, stacks: [...myData.stacks, newStack] }))
         console.log(myData.stacks)
      } else {
         return null
      }
      const details = stackdetailsRef.current;
      if (details) {
         details.open = false;
      }
   }

   const preview = new FileReader();

   const editImg = (e) => {
      const img = e.target.files[0]
      console.log(img)
      setMyData((prev) => ({ ...prev, profileImg: img }))
   }

   const editNickname = (e) => {
      const newNickname = e.target.value
      setMyData((prev) => ({ ...prev, nickname: newNickname }))
   }

   const removeStack = (selectedStack) => {
      const newStacks = myData.stacks.filter((stack) => stack !== selectedStack)
      setMyData(prev => ({ ...prev, stacks: newStacks }))
   }

   function viewApplyModal() {
      if(viewApply) {
         setViewApply(false);
      } else {
         setViewApply(true);
      }
   }

   return (
      <WholeBody>
      {viewApply ? <ViewApply viewApply={viewApply} viewApplyModal={viewApplyModal} /> :  null }
         <PostBody>
            
            {isEdit ?
               <>
                  {myData?.profileImg === null ? <Profilepic src={profilepic} /> : <Profilepic src={myData?.profileImg} />}
                  <form>
                     <input type="file" ref={imageRef} accept="image/*" onChange={(event) => editImg(event)} />이미지 편집
                     <input defaultValue={userInfo?.nickname} onChange={(event) => editNickname(event)} />
                     {userInfo.username}
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
                        {userInfo.stacks.map((stack, index) => {
                           return (
                              <MyStack style={{ margin: "0px 10px 10px 0px", display:"flex", alignItems:"center", gap:"5px"}} key={index}>#{stack} 
                           <StackDelete onClick={()=>{removeStack(stack)}} />
                              </MyStack>
                           )
                        })}
                     </div>
                  </form>
                  <Btn onClick={() => basic()}>기본 이미지로 변경</Btn>
                  <Btn onClick={() => EditMyData()}>편집 완료</Btn>
               </>

               :
               <>
            
                  {userInfo?.profileImg === null ? <Profilepic src={profilepic} /> : <Profilepic src={userInfo?.profileImg} />}
                  {userInfo?.nickname} <br />
                  {userInfo?.username}
                  <div style={{ display: "flex" }}>
                     {userInfo.stacks?.map((mystack,index) => {
                        return (
                           <MyStack key={index}>#{mystack}</MyStack>
                        )
                     })}
                       
                  </div>
                  <Btn onClick={() => setIsEdit(true)}>프로필 편집</Btn> <br />
               </>

            }

         </PostBody>



   
            <TabBody>
               <Tab onClick={() => { setTab(<Bookmark viewApply={viewApply} viewApplyModal={viewApplyModal} />) }}> 관심 프로젝트 </Tab>
               <Tab onClick={() => { setTab(<JoinProject viewApply={viewApply} viewApplyModal={viewApplyModal}/>) }}> 참여한 프로젝트 </Tab>
               <Tab onClick={() => { setTab(<MyProject viewApply={viewApply} viewApplyModal={viewApplyModal}/>) }}> 내가 쓴 프로젝트 </Tab>

            </TabBody>
            <div>
               {tab}
            </div>

     




            </WholeBody>
   )
}


const Profilepic = styled.img`
  background-color: lightgray;
  width: 160px;
  height: 160px;
  border-radius: 80px;
`;

const WholeBody = styled.div`
max-width: 996px;
margin: 0px auto 200px auto;
  @media screen and (max-width: 996px) {
    margin: 24px 40px 100px;
  }
`;

const Tab = styled.div`
  line-height: 48px;
  color:${(props) => props.theme.keyColor};
`;

const TabBody = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
display: grid;
grid-template-columns: repeat(3,1fr);
text-align: center;
margin: 24px auto;
`;

export default MyPage;
