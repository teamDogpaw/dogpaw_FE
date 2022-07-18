
import axios from "axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import instance from "../shared/axios"
import { Btn, ListProfilePic, ListStack, MypagePostBox } from "../styles/style"
import MyPagePostList from "./MyPagePostList"


const ApplyProject = ({
  viewApplyModal
}) => {
    const [isApply, setIsApply] = useState(true);


    
  const GetApplyProject = async () => {
    try {
      const response = await instance.get(`/api/user/mypage/apply`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const{isLoading, data, isError} = useQuery("applyproject", GetApplyProject);



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
          isApply={isApply}
          />
        )

      })}
    </MypagePostBox>
  );
};

export default ApplyProject;