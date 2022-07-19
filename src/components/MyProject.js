import { useState } from "react"
import { useGetMyProjectPost } from "../hook/usePostListData"
import { MypagePostBox } from "../styles/style"
import MyPagePostList from "./MyPagePostList"
import ViewApply from "./ViewApply"

const MyProject = ({
  currentTab
}) => {

  const [viewApply, setViewApply] = useState(false);
  const [myPostId, setMyPostId] = useState();
  const { data: myProjectPost } = useGetMyProjectPost();

  function viewApplyModal(postId) {
    setViewApply((prev) => !prev);
    setMyPostId(postId)
  }

  // if (isLoading) {
  //   return (
  //     <h1>loading...</h1>
  //   )
  // }
  return (
    <>

      {viewApply ?
        <ViewApply viewApplyModal={viewApplyModal}
          myPostId={myPostId}
          postTitle={myProjectPost.data.title}
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

