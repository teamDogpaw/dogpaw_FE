import { useState } from 'react';
import { MypagePostBox } from '../../styles/style';
import { useGetMyParticipatePost } from '../../hook/usePostListData';
import MyPagePostList from './MyPagePostList';
import ViewApply from '../common/ViewApply';
import { EmptyBody, EmptyImg } from '../common/ApplyList';
import EmptyPage from '../emptyPage';

const JoinProject = ({ currentTab }) => {
  const { data: myParticipatePost, isLoading: isLoadingPartiPost } =
    useGetMyParticipatePost();
  //console.log(myParticipatePost)
  const [viewApply, setViewApply] = useState(false);
  const [myPostData, setMyPostData] = useState({
    id: 1,
    title: '',
    deadline: false,
  });
  const [myPostId, setMyPostId] = useState(0);

  function viewApplyModal(postId) {
    setViewApply((prev) => !prev);
    setMyPostId(postId);
  }

  if (isLoadingPartiPost) {
    return (
      <EmptyBody>
        <EmptyImg />
      </EmptyBody>
    );
  }

  if (myParticipatePost.data.length === 0) {
    return <EmptyPage message={'아직 참여한 프로젝트가 없습니다.'} />;
  }

  return (
    <>
      <MypagePostBox>
        {viewApply ? (
          <ViewApply
            viewApplyModal={viewApplyModal}
            currentTab={currentTab}
            setViewApply={setViewApply}
            postId={myPostId}
          />
        ) : null}
        {myParticipatePost?.data.map((content) => {
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
    </>
  );
};

export default JoinProject;
