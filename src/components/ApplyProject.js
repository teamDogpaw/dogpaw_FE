
import { MypagePostBox } from "../styles/style"
import MyPagePostList from "./MyPagePostList"
import { useGetMyApplyPost } from "../hook/usePostListData"
import { EmptyBody, EmptyImg } from "./ApplyList";

const ApplyProject = ({
  viewApplyModal,
  currentTab
}) => {

  const {data : myApplyPost, isLoading:isLoadingApplyPost} = useGetMyApplyPost();

  
  if (isLoadingApplyPost) {
    return (
      <EmptyBody>
        <EmptyImg />
      </EmptyBody>
    )
  }

  return (
    <MypagePostBox>
      {myApplyPost?.data.map((content) => {
        return (
          <MyPagePostList key={content.postId} 
          data={content} 
          viewApplyModal={viewApplyModal}
          currentTab={currentTab}
          />
        )

      })}
    </MypagePostBox>
  );
};

export default ApplyProject;
