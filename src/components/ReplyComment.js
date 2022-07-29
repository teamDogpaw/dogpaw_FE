import React, { useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
import person from "../styles/images/person.png";
import styled from "styled-components";
import arrow from "../styles/icon/detail/replyarrow.svg";
import { useEditReply, useRemoveReply } from "../hook/useCommentData";
import { postApis } from "../api/post";
import { CommentDate, DeleteBtn, ModiBtn, UpdateBtn } from "./Comment";
import AlertModal from "./AlertModal";
import { Btn, GrayLineBtn } from "../styles/style";
import { Content } from "./ApplyBtn";

const ReplyComment = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modiModalOpen, setModiModalOpen] = useState(false);
  const isLogin = useRecoilValue(UserInfoAtom);

  const loginUser = isLogin?.nickname;
  const writeUser = props.data.nickname;

  const id = props.commentId;

  const replyRef = useRef("");

  const queryClient = useQueryClient();

  // 대 댓글 수정
  const { mutateAsync: editReply } = useEditReply();

  const modifyReplyClick = async (replyId) => {
    if(replyRef.current.value === ""){
      openModiModal();
      return;
    }
    const replyData = { content: replyRef.current.value, replyId, id };
    setIsEdit(false);
    await editReply(replyData);
    queryClient.invalidateQueries("commentList");
  };

  // 대 댓글 삭제
  const { mutateAsync: removeReply } = useRemoveReply();

  const deleteReplyClick = async (replyId) => {
    const replyData = { replyId, id };
    await removeReply(replyData);
    queryClient.invalidateQueries("commentList");
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

  return (
    <Contain>
      <Arr src={arrow} alt="사진" />
      <div style={{ marginLeft: "32px" }}>
        <User>
          <Img src={props.data.profileImg || person} alt="사진" />
          <p>{props.data.nickname}</p>
        </User>
        <Contents>
          {isEdit ? (
            <input
              type="text"
              defaultValue={props.data.content}
              ref={replyRef}
            />
          ) : (
            <p>{props.data.content}</p>
          )}
          <CommentDate>{props.data.modifiedAt.substring(0, 10)} </CommentDate>
        </Contents>
        <CommentBtnBox>
          {loginUser === writeUser && (
            <>
              {isEdit ? (
                <>
                  <UpdateBtn
                    onClick={() => {
                      modifyReplyClick(props.data.id);
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
      </div>

      <AlertModal open={modalOpen}>
        <Content>
          <h4>댓글을 삭제하시겠습니까?</h4>
          <div>
            <GrayLineBtn onClick={closeModal}> 취소 </GrayLineBtn>
            <Btn
              onClick={() => {
                deleteReplyClick(props.data.id);
              }}
            >
              삭제
            </Btn>
          </div>
        </Content>
      </AlertModal>

      <AlertModal open={modiModalOpen}>
        <Content>
          <h4>내용을 입력해주세요!</h4>
          <div>
            <Btn onClick={closeModiModal}> 확인 </Btn>
          </div>
        </Content>
      </AlertModal>
    </Contain>
  );
};

const Contain = styled.div`
  position: relative;
`;
const Arr = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  position: absolute;
`;

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
const Contents = styled.div`
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



export default ReplyComment;
