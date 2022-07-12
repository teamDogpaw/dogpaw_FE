
import React, { useEffect, useRef, useState } from "react";
import Bookmark from "../components/Bookmark"
import MyProject from "../components/MyProject";
import JoinProject from "../components/JoinProject"
import { useMatch, useNavigate } from "react-router-dom";
import { Btn, MainBody, MyStack, Option, SelectBoxOpen } from "../styles/style"
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

import instance from "../shared/axios";
import { UserInfoAtom } from "../atom/userQuery";
import profilepic from "../styles/icon/defaultProfile.svg";
import { SelectBox } from "../components/WriteSelect";

const MyPage = () => {
   const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
   const navigate = useNavigate();
   const [tab, setTab] = useState(<Bookmark />);
   const [isEdit, setIsEdit] = useState(false);
   const stackdetailsRef = useRef(null);
   const imageRef = useRef();
   console.log(userInfo)

   const formData = new FormData()

   const [myData, setMyData] = useState({
      profileImg: userInfo?.profileImg,
      nickname: userInfo?.nickname,
      stacks: userInfo?.stacks
   })

   //프로필 이미지 넣지 않으면 편집 완료 못함
   const EditMyData = async () => {
      setIsEdit(false)
      console.log(myData.profileImg)
      try {
         await instance.put(`/api/user/info`, formData
         )
         navigate("/")
      }
      catch (error) {
         alert(error)
      }
   }

   const addStack = (newStack) => {
      if (!myData.stacks.includes(newStack)) {
         setMyData(prev => ({ ...prev, stacks: [...myData.stacks, newStack] }))

         const stack = JSON.stringify(myData.stacks)//(배열)
         console.log(stack)
         console.log([stack])
         const blob = new Blob([stack], {
            type: 'application/JSON'
          })
         formData.append('body', blob)

         // formData.append('stacks', {stacks: JSON.stringify(myData.stacks)});
         console.log(formData)
         for (const value of formData) console.log(value);
         console.log(myData)
      } else {
         return null
      }
      const details = stackdetailsRef.current;
      if (details) {
         details.open = false;
      }
   }

   const preview = new FileReader();

   const editImg = (e) =>{
      console.log(e)
      const img = e.target.files[0]
      formData.append('image', img);
      console.log(img)
      console.log(formData)
      // console.log(preview.readAsDataURL(img));
      setMyData((prev)=>({...prev, profileImg:img}))
      for (const value of formData) console.log(value);
   }

   const editNickname = (e)=>{
      const newNickname = e.target.value
      setMyData((prev)=> ({...prev, nickname:newNickname}))
      const nickname = JSON.stringify(newNickname)
      console.log([nickname])
      const blob = new Blob([nickname], {
         type: 'application/JSON'
       })
      formData.append('body', blob)
      console.log(blob)
      for (const value of formData) console.log(value);
   }

   const removeStack = (selectedStack) => {
      const newStacks = myData.stacks.filter((stack) => stack !== selectedStack)
      setMyData(prev => ({ ...prev, stacks: newStacks }))
   }

   return (
      <>
         <MainBody>
            {isEdit ?
               <>
                  {myData?.profileImg === null ? <Profilepic src={profilepic} /> : <Profilepic src={myData?.profileImg} />}
                 <form>
                 <input type="file" ref={imageRef} accept="image/*" onChange={(event)=>editImg(event)} />이미지 편집
                  <input defaultValue={userInfo?.nickname} onChange={(event) => editNickname(event)} />
                  {userInfo?.username}
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
                     {myData?.stacks.map((stack) => {
                        return (
                           <MyStack style={{ margin: "0px 10px 10px 0px" }} key={stack.id}>#{stack.stack} <svg onClick={() => removeStack(stack)} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.99996 18.3327C14.6023 18.3327 18.3333 14.6017 18.3333 9.99935C18.3333 5.39698 14.6023 1.66602 9.99996 1.66602C5.39759 1.66602 1.66663 5.39698 1.66663 9.99935C1.66663 14.6017 5.39759 18.3327 9.99996 18.3327Z" stroke="#FFB673" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M12.5 7.5L7.5 12.5" stroke="#FFB673" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M7.5 7.5L12.5 12.5" stroke="#FFB673" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                           </MyStack>
                        )
                     })}
                  </div>
                 </form>
                 
                  <Btn onClick={() => EditMyData()}>편집 완료</Btn>
               </>

               :
               <>
                  {userInfo?.profileImg === null ? <Profilepic src={profilepic} /> : <Profilepic src={userInfo?.profileImg} />}
                  {userInfo?.nickname} <br />
                  {userInfo?.username}
                  <div style={{ display: "flex" }}>
                     {userInfo?.stacks.map((mystack) => {
                        return (
                           <MyStack key={mystack.id}># {mystack.stack}</MyStack>
                        )
                     })}
                  </div>
                  <Btn onClick={() => setIsEdit(true)}>프로필 편집</Btn> <br />
               </>

            }

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


const Profilepic = styled.img`
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
  gap: 24px;
  @media screen and (max-width: 996px) {
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
