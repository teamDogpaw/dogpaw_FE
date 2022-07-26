import { useState } from "react"
import { useMatch } from "react-router-dom"
import { useGetMyProjectPost } from "../hook/usePostListData"
import { MypagePostBox } from "../styles/style"
import { EmptyBody, EmptyImg } from "./ApplyList"
import MyPagePostList from "./MyPagePostList"
import ViewApply from "./ViewApply"

const MyProject = ({
  currentTab
}) => {

  
  
  const { data: myProjectPost, isLoading : isLoadingMyProject } = useGetMyProjectPost();

  console.log(myProjectPost)
  const [viewApply, setViewApply] = useState(false);
  
  const [myPostData,setMyPostData] = useState({
    postId:1,
    title:"",
    deadline:false
  })

  function viewApplyModal(data) {
    setViewApply((prev) => !prev);
    setMyPostData(()=> ({
      postId: data.postId,
      title:data.title,
      deadline:data.deadline
    }))
  }

  if (isLoadingMyProject) {
    return (
      <EmptyBody>
        <EmptyImg />
      </EmptyBody>
    )
  }

  if(myProjectPost.data.length === 0){
    return(
      <EmptyBody>
      <EmptyImg />
     <span>아직 작성한 프로젝트가 없습니다.
      </span> 
    </EmptyBody>
    )
  }
  return (
    <>

      {viewApply ?
        <ViewApply viewApplyModal={viewApplyModal}
          myPostData={myPostData}
          
        />
        : null}

      <MypagePostBox>
        {myProjectPost?.data.map((content) => {
          return (
            <MyPagePostList
              key={content.postId}
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

export default MyProject;

