import { useGetMyProjectPost } from '../../hook/usePostListData';
import { MypagePostBox } from '../../styles/style';
import { EmptyBody, EmptyImg } from '../common/ApplyList';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useMatch } from 'react-router-dom';
import EmptyPage from '../emptyPage';
import MyPagePostList from './MyPagePostList';
import ViewApply from '../common/ViewApply';

const MyProject = ({ currentTab }) => {
  const { data: myProjectPost, isLoading: isLoadingMyProject } =
    useGetMyProjectPost();
  const [viewApply, setViewApply] = useState(false);
  const [myPostId, setMyPostId] = useState(0);
  function viewApplyModal(postId) {
    setViewApply((prev) => !prev);
    setMyPostId(postId);
  }

  if (isLoadingMyProject) {
    return (
      <EmptyBody>
        <EmptyImg />
      </EmptyBody>
    );
  }

  if (myProjectPost.data.length === 0) {
    return <EmptyPage message={'아직 작성한 프로젝트가 없습니다.'} />;
  }
  return (
    <>
      {viewApply ? (
        <ViewApply viewApplyModal={viewApplyModal} postId={myPostId} />
      ) : null}

      <MypagePostBox>
        {myProjectPost?.data.map((content) => {
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

export default MyProject;
