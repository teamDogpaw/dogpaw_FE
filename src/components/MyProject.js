import axios from "axios"
import { useEffect } from "react"
import { useQuery } from "react-query"
import styled from "styled-components"
import instance from "../shared/axios"
import { Btn, ListProfilePic, ListStack, ListTitle, MypagePostBox } from "../styles/style"
import MyPagePostList from "./MyPagePostList"
import ViewApply from "./ViewApply"

const MyProject = ({
  viewApply,
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
  

  const {isLoading, data, isError} = useQuery("joinproject", GetMyProject, 
  {
    refetchOnWindowFocus: false, // 사용자가 다른 곳에 갔다가 돌아올시 함수 재실행 여부
    onSuccess: (data) => {
      console.log(data.data)
      return data.data
    },
    onError: (e) => {
      console.log(e.message);
    },
  });


   if (isLoading) {
      return (
         <h1>loading...</h1>
      )
   }
   return (
    <>
    {viewApply ? 
    <ViewApply viewApplyModal={viewApplyModal}
    postId={data.postId}
     /> 
    : null}

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
      </>
    );
  };


export default MyProject;

