import { useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { useGetCommentList, usePostComment } from "../hook/useCommentData";
import Comment from "./Comment";
import ReplyComment from "./ReplyComment";

const Comments = () => {
  const params = useParams();
  const comment_ref = useRef("");
  const [btnState, setBtnState] = useState(false);

  const id = params.postId;


  const queryClient = useQueryClient();
  // 댓글 조회 및 대 댓글 조회
  const { data: commentList } = useGetCommentList(id);
console.log(commentList)
  const { mutateAsync: addComment } = usePostComment();


  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      addCommentClick();
    }
  };

  const addCommentClick = async () => {
    const commentData = { id, content: comment_ref.current.value };
    await addComment(commentData);
    comment_ref.current.value = "";
    queryClient.invalidateQueries("commentList");
  };


  const onChange = (e) => {
    const commentText = comment_ref.current.value;
    if (commentText.length > 0) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  };


  return (
    <Wrap>
      <h3>댓글 {commentList?.data.data.length}개</h3>
      <CommentBox>
        <Input
          type="text"
          placeholder="자유롭게 의견을 남겨주세요."
          ref={comment_ref}
          onKeyPress={onCheckEnter}
          onChange={onChange}
        />

        <Button onClick={addCommentClick} isActive={btnState}>
          등록하기
        </Button>
      </CommentBox>
      <div>
        {commentList?.data.data.map((data) => (
          <>
            {/* 댓글 부분 */}
            <Comment key={data.commentId} data={data} />
            {data.commentReplyList.map((reply) => (
              /* 대 댓글 부분 */

              <ReplyComment
                key={reply.id}
                data={reply}
                commentId={data.commentId}
              />
            ))}
            <hr style={{ color: "#e2e2e2" }} />
          </>
        ))}

      </div>

    </Wrap>
  );
};

const Wrap = styled.div`
  background-color: ${(props) => props.theme.divBackGroundColor};
  margin: auto;
  padding: 32px;
  box-sizing: border-box;
  margin-top:20px;
`;
const CommentBox = styled.div`
  position: relative;
  height: 140px;
  margin-top: 20px;
`;
const Input = styled.input`
  width: 100%;
  padding: 15px 12px 55px 12px;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  outline: none;
  background-color: ${(props) => props.theme.textareaBackground};
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
  font-size: 15px;
  cursor: pointer;
  ${(props) =>
    props.isActive
      ? css`
          background-color: #ff891c;
        `
      : css`
          background-color: #ffb673;
        `}
`;
export default Comments;
