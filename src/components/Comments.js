import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import instance from "../shared/axios";
import ReplyComment from "./ReplyComment";
import Comment from "./Comment";

const Comments = () => {
  const params = useParams();
  const comment_ref = useRef("");
  const [btnState, setBtnState] = useState(false);

  const id = params.postId;

  // 댓글 조회 액션
  const getCommentList = () => {
    return instance.get(`api/posts/${id}/comments`);
  };

  // 댓글 작성  액션
  const addComment = (data) => {
    return instance.post(`api/posts/${id}/comments`, data);
  };

  const { isLoading, isError, data, error } = useQuery(
    "commentList",
    getCommentList,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );

  const queryClient = useQueryClient();

  const { mutate: addComments } = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("commentList");
    },
  });

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      const commentData = { content: comment_ref.current.value };
      comment_ref.current.value = "";
      addComments(commentData);
    }
  };

  const handleAddCommentClick = () => {
    const comment = { content: comment_ref.current.value };
    comment_ref.current.value = "";
    addComments(comment);
  };

  if (isLoading) {
    return <h1>로딩중</h1>;
  }

  if (isError) {
    return <span>Error:{error.message}</span>;
  }

  const onChange = (e) => {
    const commentText = comment_ref.current.value;
    if (commentText.length > 0) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  };

  console.log(data.data, "댓글");

  return (
    <Wrap>
      <h3>댓글 {data.data.length}개</h3>
      <CommentBox>
        <Input
          type="text"
          placeholder="자유롭게 의견을 남겨주세요."
          ref={comment_ref}
          onKeyPress={onCheckEnter}
          onChange={onChange}
        />
        <Button onClick={handleAddCommentClick} isActive={btnState}>
          등록하기
        </Button>
      </CommentBox>
      <CommentList>
        {data.data.map((data) => (
          <>
            <Comment key={data.commentId} data={data}></Comment>
            {data.commentReplyList.map((reply) => (
              <ReplyComment
                key={reply.id}
                data={reply}
                commentId={data.commentId}
              />
            ))}
            <hr style={{ color: "#e2e2e2" }} />
          </>
        ))}
      </CommentList>
    </Wrap>
  );
};

const Wrap = styled.div`
  background-color: ${(props) => props.theme.divBackGroundColor};
  margin: auto;
  padding: 32px;
  box-sizing: border-box;
`;
const CommentBox = styled.div`
  //display: flex;
  //flex-direction: column;
  position: relative;
  height: 140px;
  margin-top: 20px;
`;
const Input = styled.input`
  width: 100%;
  //height: 88px;
  padding: 15px 12px 55px 12px;
  //padding-bottom:60px;
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

const CommentList = styled.div`
  //background-color:olive;
`;
// const User = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 10px 0;
// `;

// const Img = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   margin-right: 10px;
// `;
// const Comment = styled.div`
//   margin-top: 10px;
//   & p:last-child {
//     color: #777777;
//     padding-top: 10px;
//   }
// `;

export default Comments;
