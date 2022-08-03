import { useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../../atom/atom';
import {
  useEditComment,
  useRemoveComment,
  usePostReply,
} from '../../hook/useCommentData';
import styled from 'styled-components';
import DropDown from '../DropDown';
import { Btn } from '../../styles/style';
import AlertModal from '../common/AlertModal';
import ModalOpen from '../common/Modal_prev';

import person from '../../styles/images/person.png';

const Comment = ({ data }) => {
  const params = useParams();
  const id = params.postId;
  const commentId = data.commentId;
  const comment_ref = useRef('');
  const replyRef = useRef('');
  const isLogin = useRecoilValue(UserInfoAtom);
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modiModalOpen, setModiModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const loginUser = isLogin?.nickname;
  const writeUser = data.nickname;

  const queryClient = useQueryClient();
  const { mutateAsync: editComment } = useEditComment();
  const { mutateAsync: removeComment } = useRemoveComment();

  const modifyCommentClick = async (commentId) => {
    if (comment_ref.current.value === '') {
      openModiModal();
      return;
    }
    const commentData = { id, commentId, content: comment_ref.current.value };
    setIsEdit(false);
    await editComment(commentData);
    queryClient.invalidateQueries('commentList');
  };

  const deleteCommentClick = async () => {
    const commentData = { commentId, id };
    await removeComment(commentData);
    queryClient.invalidateQueries('commentList');
  };

  // 대댓글 작성
  const { mutateAsync: addReply } = usePostReply();

  const onCheckEnter = (e) => {
    if (e.key === 'Enter') {
      addReplyClick();
    }
  };

  const addReplyClick = async () => {
    if (isLogin && replyRef.current.value === '') {
      openModiModal();
      return;
    }
    const replyData = { commentId, content: replyRef.current.value };
    await addReply(replyData);
    replyRef.current.value = '';
    queryClient.invalidateQueries('commentList');
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const openModiModal = () => {
    setModiModalOpen(true);
  };
  const closeModiModal = () => {
    setModiModalOpen(false);
  };

  const viewModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const userChk = () => {
    const isLogin = localStorage.getItem('token');
    if (!isLogin) {
      viewModal();
    }
  };

  return (
    <div>
      <User>
        <Img src={data.profileImg || person} alt="사진" />
        <p>{data.nickname}</p>
      </User>
      <Contents>
        {isEdit ? (
          <input type="text" defaultValue={data.content} ref={comment_ref} />
        ) : (
          <p>{data.content}</p>
        )}
        <CommentDate>{data.modifiedAt.substring(0, 10)} </CommentDate>
      </Contents>
      <ReplyBtn onClick={(e) => setDropdownVisibility(!dropdownVisibility)}>
        {dropdownVisibility ? '닫기' : '답글 쓰기'}
      </ReplyBtn>
      <CommentBtnBox>
        {loginUser === writeUser && (
          <>
            {isEdit ? (
              <>
                <UpdateBtn
                  onClick={() => {
                    modifyCommentClick(data.commentId);
                  }}
                >
                  등록
                </UpdateBtn>
                <DeleteBtn onClick={() => setIsEdit(false)}>취소</DeleteBtn>
              </>
            ) : (
              <>
                <ModiBtn onClick={() => setIsEdit(true)}>수정</ModiBtn>
                <DeleteBtn onClick={openModal}>삭제</DeleteBtn>
              </>
            )}
          </>
        )}
      </CommentBtnBox>
      {/* 대 댓글 작성할 수 있는 input 박스 */}
      <div className="commentList">
        <DropDown visibility={dropdownVisibility}>
          <ul>
            <li>
              <Wrap>
                <CommentBox>
                  <Input
                    type="text"
                    placeholder="댓글을 남겨주세요"
                    ref={replyRef}
                    onKeyPress={onCheckEnter}
                  />
                  <Button
                    onClick={() => {
                      userChk();
                      addReplyClick();
                    }}
                  >
                    등록하기
                  </Button>
                </CommentBox>
              </Wrap>
            </li>
          </ul>
        </DropDown>
      </div>

      <AlertModal
        open={modalOpen}
        message={'댓글을 삭제하시겠습니까?'}
        setAlertModalOpen={closeModal}
        action={deleteCommentClick}
        actionMessage={'삭제'}
      />

      <AlertModal
        open={modiModalOpen}
        message={'내용을 입력해주세요!'}
        setAlertModalOpen={closeModiModal}
      />

      {isModalOpen && <ModalOpen viewModal={viewModal} />}
    </div>
  );
};

const User = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  p {
    font-weight: 500;
  }
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ReplyBtn = styled(Btn)`
  margin-left: auto;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Contents = styled.div`
  position: relative;
  margin-top: 10px;
  line-height: 2;

  input {
    width: 100%;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    padding: 10px;
  }
  & p:last-child {
    color: #777777;
  }
`;

const CommentBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CommentDate = styled.span`
  color: ${(props) => props.theme.textColor_sub};
  font-size: 0.875rem;
`;

export const ModiBtn = styled.button`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 1px solid #777777;
  border-radius: 8px;
  padding: 4px 12px;
  width: 69px;
  height: 32px;
  font-size: 0.75rem;
  font-weight: 400;
  margin-left: 10px;
  cursor: pointer;
`;

export const DeleteBtn = styled(ModiBtn)`
  border-color: #ff0000;
  color: #ff0000;
`;

export const UpdateBtn = styled(ModiBtn)`
  color: ${(props) => props.theme.textColor};
`;

const Wrap = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  margin: auto;

  box-sizing: border-box;
`;
const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 140px;
  margin-top: 20px;
`;
const Input = styled.input`
  width: 100%;
  height: 88px;
  padding: 12px;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  outline: none;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Button = styled.button`
  background: #ffb673;
  color: #fff;
  width: 92px;
  height: 40px;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  padding: 8px 12px;
  position: absolute;
  right: 0;
  bottom: 0;

  font-size: 0.938rem;

  cursor: pointer;
  :hover {
    background-color: #ff891c;
  }
  :active {
    background-color: #d26500;
  }
`;
// const DropBTN = styled(Btn)`
//   /* background: #ffb673;
//   color: #fff;
//   margin-left: 5px;
//   width: 70px;
//   height: 32px; */
//   /* border-radius: 8px;
//   border: none; */
//   cursor: pointer;
//   :hover {
//     background-color: #ff891c;
//   }
//   :active {
//     background-color: #d26500;
//   }
// `;
export default Comment;
