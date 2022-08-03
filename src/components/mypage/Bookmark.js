import { MypagePostBox } from '../../styles/style';
import { useGetMyBookmarkPost } from '../../hook/usePostListData';
import MyPagePostList from './MyPagePostList';
import { EmptyBody, EmptyImg } from '../common/ApplyList';
import EmptyPage from '../emptyPage';

const Bookmark = ({ viewApplyModal, currentTab }) => {
  const {
    data: myBookmarkPost,
    isLoading: isLoadingBMPost,
    isError: isErrorMyBM,
  } = useGetMyBookmarkPost();

  if (isErrorMyBM) {
    return null;
  }

  if (isLoadingBMPost) {
    return (
      <EmptyBody>
        <EmptyImg />
      </EmptyBody>
    );
  }

  if (myBookmarkPost.data.length === 0) {
    return <EmptyPage message={'아직 북마크한 프로젝트가 없습니다!'} />;
  }
  return (
    <MypagePostBox>
      {myBookmarkPost?.data.map((content) => {
        return (
          <MyPagePostList
            key={content.postId}
            data={content}
            viewApplyModal={viewApplyModal}
            currentTab={currentTab}
          />
        );
      })}
    </MypagePostBox>
  );
};

export default Bookmark;
