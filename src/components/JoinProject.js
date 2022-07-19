
import { useState } from "react"
import { MypagePostBox } from "../styles/style"
import { useGetMyParticipatePost } from "../hook/usePostListData"
import MyPagePostList from "./MyPagePostList"
import ViewApply from "./ViewApply";
import { EmptyBody, EmptyImg } from "./ApplyList";

const JoinProject = ({
  currentTab
}) => {


  const {data:myParticipatePost, isLoading : isLoadingPartiPost} = useGetMyParticipatePost();

  const [viewApply, setViewApply] = useState(false);
  
  const [myPostData,setMyPostData] = useState({
    id:1,
    title:"",
    deadline:false
  })

  function viewApplyModal(data) {
    setViewApply((prev) => !prev);
    setMyPostData(()=> ({
      id: data.postId,
      title:data.title,
      deadline:data.deadline
    }))
  }

  if (isLoadingPartiPost) {
    return (
      <EmptyBody>
        <EmptyImg />
      </EmptyBody>
    )
  }

  return (
    <>
    
    {viewApply ?
      <ViewApply viewApplyModal={viewApplyModal}
        myPostData={myPostData}
        currentTab={currentTab}
      />
      : null}
    <MypagePostBox>
      {myParticipatePost?.data.map((content) => {
        return (
          <MyPagePostList key={content.postId} 
          data={content} 
          viewApplyModal={viewApplyModal}
          currentTab={currentTab}
          />
        )
      })}
    </MypagePostBox>
    </>
    
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