import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
import instance from "../shared/axios";
import person from "../styles/images/person.png";

import styled from "styled-components";
import arrow from "../styles/icon/replyarrow.png";

const ReplyComment = (props) => {
  const [isEdit, setIsEdit] = useState(false);

  const isLogin = useRecoilValue(UserInfoAtom);

  const loginUser = isLogin.nickname;
  const writeUser = props.data.nickname;
  //console.log(writeUser, "글쓴이");

  const comment_ref = useRef("");

  //답글 수정 액션
  const modifyReply = (data) => {
    return instance.put(
      `api/comments/${props.commentId}/${props.data.id}`,
      data
    );
  };

  //답글 삭제 액션
  const removeReply = (data) => {
    return instance.delete(
      `api/comments/${props.commentId}/${props.data.id}`,
      data
    );
  };

  const queryClient = useQueryClient();

  // 답글 수정
  const { mutate: modifyReplies } = useMutation(modifyReply, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("commentList");
      console.log(data);
    },
  });

  const modifyReplyClick = () => {
    modifyReplies({ content: comment_ref.current.value });
    setIsEdit(false);
  };

  // 답글 삭제
  const { mutate: deleteReplies } = useMutation(removeReply, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("commentList");
      console.log(data);
    },
  });

  const deleteReplyClick = (id) => {
    deleteReplies(id);
  };

  console.log(props, "답글");

  return (
    <Contain>
      <Arr src={arrow} alt="사진" />
      <div style={{ marginLeft: "32px" }}>
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
          <p>{props.data.modifiedAt}</p>
        </Content>
        <Btn>
          {loginUser === writeUser && (
            <>
              {isEdit ? (
                <UpdateBtn
                  onClick={() => {
                    modifyReplyClick(props.data.id);
                  }}
                >
                  등록
                </UpdateBtn>
              ) : (
                <ModiBtn onClick={() => setIsEdit(true)}>수정</ModiBtn>
              )}
              <DeleteBtn
                onClick={() => {
                  deleteReplyClick(props.data.id);
                }}
              >
                삭제
              </DeleteBtn>
            </>
          )}
        </Btn>
      </div>
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

const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModiBtn = styled.button`
  background-color: white;
  border: 1px solid #777777;
  border-radius: 8px;
  padding: 4px 12px;
  width: 69px;
  height: 32px;
  font-size: 12px;
  font-weight: 400;
  margin-left: 10px;
`;

const UpdateBtn = styled(ModiBtn)`
  color: ${(props) => props.theme.textColor};
`;

const DeleteBtn = styled(ModiBtn)`
  border-color: #ff0000;
  color: #ff0000;
`;

export default ReplyComment;
