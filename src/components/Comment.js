import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
import instance from "../shared/axios";

import styled from "styled-components";
import person from "../styles/images/person.png";

import DropDown from "./DropDown";

const Comment = (props) => {
  //대댓글 드롭다운 열기/닫기
  const [dropdownVisibility, setDropdownVisibility] = React.useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const isLogin = useRecoilValue(UserInfoAtom);

  const loginUser = isLogin.nickname;
  const writeUser = props.data.nickname;
  //console.log(writeUser, "글쓴이");

  const params = useParams();
  const id = params.postId;
  const comment_ref = useRef("");
  const ReplyRef = useRef("");

  //수정 액션
  const modifyComment = (data) => {
    return instance.put(
      `api/posts/${id}/comments/${props.data.commentId}`,
      data
    );
  };

  //삭제 액션
  const removeComment = (commentId, data) => {
    return instance.delete(`api/posts/${id}/comments/${commentId}`, data);
  };

  const queryClient = useQueryClient();

  // 댓글 수정
  const { mutate: modifyComments } = useMutation(modifyComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("commentList");
      console.log(data);
    },
  });

  const modifyCommentClick = (commentId) => {
    modifyComments({ content: comment_ref.current.value, commentId });
    setIsEdit(false);
  };

  // 댓글 삭제
  const { mutate: deleteComments } = useMutation(removeComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("commentList");
      // console.log(data)
    },
  });

  const deleteCommentClick = (commentId) => {
    deleteComments(commentId);
  };

  // 답글 작성  액션
  const addReply = (data) => {
    console.log(props.data.commentId, "대댓글 주소");
    return instance.post(
      `/api/comments/${props.data.commentId}/commentReply`,
      data
    );
  };

  const { mutate: addReplies } = useMutation(addReply, {
    onSuccess: () => {
      queryClient.invalidateQueries("commentList");
    },
  });

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      const replyData = { content: ReplyRef.current.value };
      ReplyRef.current.value = "";
      addReplies(replyData);
    }
  };

  const handleAddCommentClick = () => {
    const reply = { content: ReplyRef.current.value };
    ReplyRef.current.value = "";
    addReplies(reply);
    //console.log(reply);
  };

  return (
    <div>
      <div>
        <User>
          <Img src={props.data.profileImg || person} alt="사진" />
          <p>{props.data.nickname}</p>
        </User>
        <Content>
          {isEdit ? (
            <input
              type="text"
              defaultValue={props.data.content}
              ref={comment_ref}
            />
          ) : (
            <p>{props.data.content}</p>
          )}
          <Date>
            {props.data.modifiedAt.substring(0, 10)}
            <button
              style={{ marginLeft: "10px" }}
              onClick={(e) => setDropdownVisibility(!dropdownVisibility)}
            >
              {dropdownVisibility ? "닫기" : "답글 쓰기"}
            </button>
          </Date>
          <Btn>
            {loginUser === writeUser && (
              <>
                {isEdit ? (
                  <UpdateBtn
                    onClick={() => {
                      modifyCommentClick(props.data.commentId);
                    }}
                  >
                    등록
                  </UpdateBtn>
                ) : (
                  <ModiBtn onClick={() => setIsEdit(true)}>수정</ModiBtn>
                )}
                <DeleteBtn
                  onClick={() => {
                    deleteCommentClick(props.data.commentId);
                  }}
                >
                  삭제
                </DeleteBtn>
              </>
            )}
          </Btn>
        </Content>
        <div className="commentList">
          <DropDown visibility={dropdownVisibility}>
            <ul>
              <li>
                <Wrap>
                  <CommentBox>
                    <Input
                      type="text"
                      placeholder="댓글을 남겨주세요"
                      ref={ReplyRef}
                      onKeyPress={onCheckEnter}
                    />
                    <Button onClick={handleAddCommentClick}>등록하기</Button>
                  </CommentBox>
                </Wrap>
              </li>
            </ul>
          </DropDown>
        </div>
      </div>
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
const Content = styled.div`
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

const Date = styled.span`
  font-size: 14px;
`;

const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModiBtn = styled.button`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 1px solid #777777;
  border-radius: 8px;
  padding: 4px 12px;
  width: 69px;
  height: 32px;
  font-size: 12px;
  font-weight: 400;
  margin-left: 10px;
`;

const DeleteBtn = styled(ModiBtn)`
  border-color: #ff0000;
  color: #ff0000;
`;

const UpdateBtn = styled(ModiBtn)`
  color: ${(props) => props.theme.textColor};
`;

const Wrap = styled.div`
  background-color: ${(props) => props.theme.divBackGroundColor};
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
  background-color: ${(props) => props.theme.inputBoxBackground};
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
  :hover {
    background-color: #ff891c;
  }
  :active {
    background-color: #d26500;
  }
`;

export default Comment;
