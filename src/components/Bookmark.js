import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../shared/axios";
import { Btn, LineBtn, ListProfilePic, ListStack, MypagePostBox } from "../styles/style";
import { ReactComponent as BookmarkIcon } from "../styles/icon/post/bookmark.svg";
import { ReactComponent as BookmarkFill } from "../styles/icon/post/bookmarkFill.svg";
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
import MyPagePostList from "./MyPagePostList";

const Bookmark = ({
  viewApplyModal,
  currentTab
}) => {
  const navigate = useNavigate();
  const [isMyBookmark, setIsMyBookmark] = useState(<BookmarkFill />);

  const DoBookmark = async (postId) => {
    setIsMyBookmark((prev) => !prev)
    const response = await instance.post(`/api/bookMark/${postId}`)
    return response.data
  }

  const GetMyBookmark = async () => {
    try {
      const response = await instance.get(`/api/user/mypage/bookmark`)
      return response.data
    } catch (error) {
      alert(error)
    }
  };

  const { isLoading, data, error } = useQuery("mybookmark", GetMyBookmark,
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
    <MypagePostBox>
      {data?.map((content) => {
        return (
          <MyPagePostList key={content.postId}
            data={content}
            viewApplyModal={viewApplyModal}
            isMyBookmark={isMyBookmark}
            DoBookmark={DoBookmark}
            currentTab={currentTab}
          />
        )

      })}
    </MypagePostBox>
  );
};

export default Bookmark;
