
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
import profilepic from "../styles/icon/global/profile.svg";
import { SelectBox } from "../components/WriteSelect";
import bookmark_fill from "../styles/icon/post/bookmark.svg"
import { ReactComponent as StackDelete } from "../styles/icon/stackSelect/stackDelete.svg"
import ApplyProject from "../components/ApplyProject";

const MyPage = () => {
   const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
   const navigate = useNavigate();
   const [isEdit, setIsEdit] = useState(false);
   const stackdetailsRef = useRef(null);
   const imageRef = useRef();
   const [viewApply, setViewApply] = useState(false);
   const [currentTab, setTab] = useState(0);
   console.log(userInfo)
   console.log(viewApply)
   const formData = new FormData()

   const tabList = [
      { id: 1, name: '관심 프로젝트', content: <Bookmark /> },
      { id: 2, name: '참여한 프로젝트', content: <JoinProject /> },
      { id: 3, name: '신청한 프로젝트', content: <ApplyProject /> },
      { id: 4, name: '내가 쓴 프로젝트', content: <MyProject viewApply={viewApply} viewApplyModal={viewApplyModal} /> }
   ];

   useEffect(() => { }, [userInfo])
   const [myData, setMyData] = useState({
      profileImg: userInfo?.profileImg,
      nickname: userInfo?.nickname,
      stacks: userInfo?.stacks
   })

   console.log(myData)
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
         await instance.put(`/api/user/profile/basic`)
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

      if (myData.stacks === undefined) {
         setMyData({ stacks: [newStack] })
         console.log(myData.stacks)
      } else if (!myData.stacks.includes(newStack)) {
         setMyData(prev => ({ ...prev, stacks: [...myData.stacks, newStack] }))
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
      if (viewApply) {
         setViewApply(false);
      } else {
         setViewApply(true);
      }
   }

   return (
      <WholeBody>
         {/* {viewApply ? <ViewApply viewApply={viewApply} viewApplyModal={viewApplyModal} /> : null} */}
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
                        {myData.stacks?.map((stack, index) => {
                           return (
                              <MyStack style={{ margin: "0px 10px 10px 0px", display: "flex", alignItems: "center", gap: "5px" }} key={index}>#{stack}
                                 <StackDelete onClick={() => { removeStack(stack) }} />
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
                     {userInfo.stacks?.map((mystack, index) => {
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
            {tabList.map((tab, index) => {
               return (
                  <>
                     <Tab
                        onClick={() => { setTab(index) }}
                        key={tab.id}
                        className={currentTab === index ? "focused" : null}
                     >
                        {tab.name}
                     </Tab>
                  </>
               )
            })}
         

         </TabBody>
         <div>
            {tabList[currentTab].content}
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
 font-weight: bold;
  border-radius: 8px;
  cursor: pointer;

  &.focused {
   box-shadow: rgb(255 182 115 / 50%) 0px 2px 12px 0px ;
   background-color: ${(props) => props.theme.keyColor};
   color: #fff;
  }
`;

const TabBody = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
display: grid;
grid-template-columns: repeat(4,1fr);
text-align: center;
margin: 24px auto;
gap: 16px;
`;

export default MyPage;
