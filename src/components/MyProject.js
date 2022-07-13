import axios from "axios"
import { useEffect } from "react"
import { useQuery } from "react-query"
import styled from "styled-components"
import instance from "../shared/axios"
import { Btn, ListProfilePic, ListStack, ListTitle, MypagePostBox } from "../styles/style"
import MyPagePostList from "./MyPagePostList"

const MyProject = ({
   viewApplyModal
}) => {

  const GetMyProject = async () => {
    try {
      const response = await instance.get(`/api/user/mypage/post`);
      console.log(response);
      return response.data
    } catch (error) {
      console.log(error);
    }
  };

  const {isLoading, data, isError} = useQuery("joinproject", GetMyProject);

   if (isLoading) {
      return (
         <h1>loading...</h1>
      )
   }
   return (
      <MypagePostBox>
        {data?.map((content) => {
          return (
            <MyPagePostList key={content.postId} 
            data={content} 
            viewApplyModal={viewApplyModal}
            />
          )
  
        })}
      </MypagePostBox>
    );
  };

export default MyProject;

