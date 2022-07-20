import { useState } from "react"
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

  if (isLoadingMyProject) {
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

