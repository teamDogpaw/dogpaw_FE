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
        />
        : null}

      <MypagePostBox>
        {myProjectPost?.data.map((content) => {
          return (
            <MyPagePostList
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

