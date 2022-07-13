import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../shared/axios";
import { Btn, LineBtn, ListProfilePic, ListStack } from "../styles/style";
import { ReactComponent as BookmarkIcon } from "../styles/icon/u_bookmark.svg";
import { ReactComponent as BookmarkFill } from "../styles/icon/Vector 33.svg";
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
const Bookmark = () => {
  const navigate = useNavigate()
  const [isMyBookmark, setIsMyBookmark] = useState(<BookmarkFill/>);

  const userInfo = useRecoilValue(UserInfoAtom);

  const GetMyBookmark = async () => {
    try{
      const response = await instance.get(`/api/user/mypage/bookmark`)
      return response.data
    } catch(error){
      alert(error)
    }
  };

  const myBookmark = useQuery("mybookmark", GetMyBookmark);


  const DoBookmark = async (postId) => {
    setIsMyBookmark((prev) => !prev)
    const response = await instance.post(`/api/bookMark/${postId}`)
    return response.data
  }


  if (myBookmark.isLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <div>
      {myBookmark?.data?.map((content) => {
        return (
             <div key={content.postId} navigate={`/detail/${content.postId}`}>
            <ListProfilePic src={content.profileImg} />
            {content.nickname}<br />
            {isMyBookmark ?   <BookmarkFill onClick={()=>{DoBookmark(content.postId)}}/> :
             <BookmarkIcon onClick={()=>{DoBookmark(content.postId)}}/> }
           

            {content.title}<br />
            {content.content}<br />
            {content.stacks.map((stack, index) => {
              return (
                <ListStack key={index}>#{stack}</ListStack>
              )

            })}

 
            {content.startAt}

            {content.nickname === userInfo.nickname ? 
            null : 
            <LineBtn>지원자 보기</LineBtn>}

          </div>
         

        )

      })}
    </div>
  );
};

export default Bookmark;
