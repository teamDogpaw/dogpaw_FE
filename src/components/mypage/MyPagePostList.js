import {
  LineBtn,
  ListProfilePic,
  ListStack,
  ListTitle,
  PostBody,
} from '../../styles/style';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DefaultProfile from '../../styles/icon/global/profile.svg';
import { ReactComponent as CommentCnt } from '../../styles/icon/post/commentCnt.svg';
import { ReactComponent as BookmarkCnt } from '../../styles/icon/post/bookmarkCnt.svg';
import UserBookmark from './UserBookmark';
import { usePostApply } from '../../hook/useApplyMutation';
import AlertModal from '../common/AlertModal';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

const MyPagePostList = ({ data, viewApplyModal, currentTab }) => {
  const [completeMessage, setCompleteMessage] = useState('');
  const [completeModal, setCompleteModal] = useState(false);
  const postId = data.postId;
  const isMypage = useMatch('/mypage');
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: postApply } = usePostApply();

  const applyBtn = async () => {
    try {
      const response = await postApply(postId);
      console.log(response);
      if (response.status === 200) {
        setModalOpen(false);
        queryClient.invalidateQueries('applyproject');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const closeCompleteModal = () => {
    setCompleteModal(false);
  };

  return (
    <>
      <PostBody key={data.postId}>
        <AlertModal
          open={modalOpen}
          setAlertModalOpen={closeModal}
          message={'프로젝트 지원을 취소하시겠습니까?'}
          action={applyBtn}
          actionMessage={'지원취소'}
        />

        <AlertModal
          open={completeModal}
          setAlertModalOpen={closeCompleteModal}
          message={completeMessage}
        />
        <HeadBody>
          {currentTab !== 4 ? (
            <>
              <ListProfilePic
                src={
                  data.profileImg === null ? DefaultProfile : data.profileImg
                }
              />
              {data.nickname}
            </>
          ) : null}

          {data.bookMarkStatus ? (
            <UserBookmark
              postId={data.postId}
              bookmarkStatus={data.bookMarkStatus}
              currentTab={currentTab}
            />
          ) : (
            <UserBookmark postId={data.postId} currentTab={currentTab} />
          )}
        </HeadBody>

        <ListTitle onClick={() => navigate(`/detail/${data.postId}`)}>
          {data.title}
        </ListTitle>
        <ListContent>
          {data.content}
          <div>
            {data.stacks.map((stack, index) => {
              return <ListStack key={index}>#{stack}</ListStack>;
            })}
          </div>
        </ListContent>

        <ListBottom>
          시작 예정일 {data.startAt}
          <Count>
            <CommentCnt /> {data.commentCnt}
            <BookmarkCnt /> {data.bookmarkCnt}
          </Count>
        </ListBottom>
        {currentTab === 3 ? (
          <MyPageBtn onClick={openModal}>지원 취소하기</MyPageBtn>
        ) : null}

        {(isMypage !== null && currentTab === 2) || currentTab === 4 ? (
          <MyPageBtn onClick={() => viewApplyModal(data.postId)}>
            팀원 목록 보기
          </MyPageBtn>
        ) : null}
      </PostBody>
    </>
  );
};

const HeadBody = styled.div`
  gap: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

const ListContent = styled.div`
  line-height: 16px;
  font-size: 0.875rem;
  margin-top: 8px;
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

const ListBottom = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  font-size: 0.813rem;
  margin-top: 18px;
`;

const Count = styled(ListBottom)`
  margin-top: 0px;
  margin-left: auto;
`;

const MyPageBtn = styled(LineBtn)`
  margin-top: 24px;
  width: 100%;
`;

export default MyPagePostList;
