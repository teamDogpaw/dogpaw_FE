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
import MyPagePostList from "./MyPagePostList";

const Bookmark = ({
  viewApplyModal,
  viewApply
}) => {
  const navigate = useNavigate();

  const GetMyBookmark = async () => {
    try{
      const response = await instance.get(`/api/user/mypage/bookmark`)
      return response.data
    } catch(error){
      alert(error)
    }
  };

  const {isLoading, data, error} = useQuery("mybookmark", GetMyBookmark,
   {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      return data
    }, onError: (error) => {
      alert(error)
    }
  });

  if (isLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <div>
      {data?.map((content) => {
        return (
          <MyPagePostList key={content.postId} 
          data={content} 
          viewApplyModal={viewApplyModal}
          />
        )

      })}
    </div>
  );
};

export default Bookmark;
