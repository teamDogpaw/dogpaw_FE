import {  MypagePostBox } from "../styles/style";
import {useGetMyBookmarkPost} from "../hook/usePostListData"
import MyPagePostList from "./MyPagePostList";
import { EmptyBody, EmptyImg } from "./ApplyList";

const Bookmark = ({
  viewApplyModal,
  currentTab
}) => {

const {data:myBookmarkPost, isLoading : isLoadingBMPost, isError:isErrorMyBM} = useGetMyBookmarkPost()
//console.log(myBookmarkPost)

if(isErrorMyBM){
  return(
    null
  )
}

if (isLoadingBMPost) {
  return (
    <EmptyBody>
      <EmptyImg />
    </EmptyBody>
  )
}

if(myBookmarkPost.data.length === 0){
  return(
    <EmptyBody>
    <EmptyImg />
   <span>아직 북마크한 프로젝트가 없습니다.
    </span> 
  </EmptyBody>
  ) 
}
  return (
    <MypagePostBox>
      {myBookmarkPost?.data.map((content) => {
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

export default Bookmark;
