import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useMatch } from 'react-router-dom';
import { useGetMyProjectPost } from '../../hook/usePostListData';
import { MypagePostBox } from '../../styles/style';
import { EmptyBody, EmptyImg } from '../common/ApplyList';
import EmptyPage from '../emptyPage';
import MyPagePostList from './MyPagePostList';
import ViewApply from '../common/ViewApply';

const MyProject = ({ currentTab }) => {
  const { data: myProjectPost, isLoading: isLoadingMyProject } =
    useGetMyProjectPost();

  //console.log(myProjectPost)
  const [viewApply, setViewApply] = useState(false);

  const [myPostData, setMyPostData] = useState({
    postId: 1,
    title: '',
    deadline: false,
    applierCnt: 0,
    currentMember: 0,
    maxCapacity: 0,
  });

  const [myPostId, setMyPostId] = useState(0);

  function viewApplyModal(postId) {
    setViewApply((prev) => !prev);
    setMyPostId(postId);
  }
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   queryClient.invalidateQueries('myproject');
  // }, [myProjectPost]);

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
