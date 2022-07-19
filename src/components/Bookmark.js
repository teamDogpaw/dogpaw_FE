import {  MypagePostBox } from "../styles/style";
import {useGetMyBookmarkPost} from "../hook/usePostListData"
import MyPagePostList from "./MyPagePostList";
import { EmptyBody, EmptyImg } from "./ApplyList";

const Bookmark = ({
  viewApplyModal,
  currentTab
}) => {

const {data:myBookmarkPost, isLoading : isLoadingBMPost} = useGetMyBookmarkPost()
console.log(myBookmarkPost)


if (isLoadingBMPost) {
  return (
    <EmptyBody>
      <EmptyImg />
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
