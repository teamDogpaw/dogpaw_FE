
import { useState } from "react"
import { MypagePostBox } from "../styles/style"
import MyPagePostList from "./MyPagePostList"
import { useGetMyApplyPost } from "../hook/usePostListData"

const ApplyProject = ({
  viewApplyModal
}) => {

  const [isApply, setIsApply] = useState(true);
  const {data : myApplyPost} = useGetMyApplyPost();

  // if (isLoading) {
  //   return <h1>loading...</h1>;
  // } 
  
  return (
    <MypagePostBox>
      {myApplyPost?.data.map((content) => {
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
