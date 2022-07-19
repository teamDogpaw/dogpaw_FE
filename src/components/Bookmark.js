import {  MypagePostBox } from "../styles/style";
import {useGetMyBookmarkPost} from "../hook/usePostListData"
import MyPagePostList from "./MyPagePostList";

const Bookmark = ({
  viewApplyModal,
  currentTab
}) => {

const {data:myBookmarkPost} = useGetMyBookmarkPost()
console.log(myBookmarkPost)

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
