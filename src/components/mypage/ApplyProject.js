import { MypagePostBox } from '../../styles/style';
import MyPagePostList from './MyPagePostList';
import { useGetMyApplyPost } from '../../hook/usePostListData';
import { EmptyBody, EmptyImg } from '../common/ApplyList';
import EmptyPage from '../emptyPage';

const ApplyProject = ({ viewApplyModal, currentTab }) => {
  const { data: myApplyPost, isLoading: isLoadingApplyPost } =
    useGetMyApplyPost();

  if (isLoadingApplyPost) {
    return (
      <EmptyBody>
        <EmptyImg />
      </EmptyBody>
    );
  }
  if (myApplyPost.data.length === 0) {
    return <EmptyPage message={'아직 신청한 프로젝트가 없습니다!'} />;
  }

  return (
    <MypagePostBox>
      {myApplyPost?.data.map((content) => {
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

export default ApplyProject;
