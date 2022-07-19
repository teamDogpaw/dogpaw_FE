
import { useState } from "react"
import { MypagePostBox } from "../styles/style"
import { useGetMyParticipatePost } from "../hook/usePostListData"
import MyPagePostList from "./MyPagePostList"

const JoinProject = ({
  viewApplyModal,
  currentTab
}) => {

  const [isApply, setIsApply] = useState(true);
  const {data:myParticipatePost} = useGetMyParticipatePost();

  return (
    <MypagePostBox>
      {myParticipatePost?.data.map((content) => {
        return (
          <MyPagePostList key={content.postId} 
          data={content} 
          viewApplyModal={viewApplyModal}
          isApply={isApply}
          currentTab={currentTab}
          />
        )
      })}
    </MypagePostBox>
  );
};

export default JoinProject;

  
  //✅
  // const GetJoinProject = async () => {
  //   try {
  //     const response = await instance.get(`/api/user/participation`);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };




  // if (isLoading) {
  //   return <h1>loading...</h1>;
  // }