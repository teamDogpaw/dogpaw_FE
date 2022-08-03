import { MypagePostBox } from '../../styles/style';
import MyPagePostList from './MyPagePostList';
import { useGetMyApplyPost } from '../../hook/usePostListData';
import { EmptyBody, EmptyImg } from '../common/ApplyList';

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
    return (
      <EmptyBody>
        <EmptyImg />
        <span>아직 신청한 프로젝트가 없습니다.</span>
      </EmptyBody>
    );
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
