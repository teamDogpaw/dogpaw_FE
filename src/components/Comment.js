import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/userQuery";
import instance from "../shared/axios";

import styled from "styled-components";
import person from "../styles/icon/person.png"


const Comment = ({ data }) => {
  const [isEdit, setIsEdit] = useState(false);

  const isLogin = useRecoilValue(UserInfoAtom);

  const loginUser = isLogin.nickname;
  const writeUser = data.nickname;

  const params = useParams();
  const id = params.postId;
  const comment_ref = useRef("");

  const modifyComment = (data) => {
    return instance.put(`api/posts/${id}/comments/${data.commentId}`, data);
  };

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

  // 댓글 삭제
  const { mutate: deleteComments } = useMutation(removeComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("commentList");
      // console.log(data)
    },
  });

  const modifyCommentClick = (commentId) => {
    modifyComments({ content: comment_ref.current.value, commentId });
    setIsEdit(false);
  };
  const deleteCommentClick = (commentId) => {
    deleteComments(commentId);
  };

  return (
    <div>
      <div>
        <User>
          <Img src={data.profileImg || person} alt="사진" />
          <p>{data.nickname}</p>
        </User>
        <Content>
          {isEdit ? (
            <input type="text" defaultValue={data.content} ref={comment_ref} />
          ) : (
            <p>{data.content}</p>
          )}
          <p>{data.modifiedAt.substring(0, 10)}</p>
        </Content>

        <Btn>
          {loginUser === writeUser && (
            <>
              {isEdit ? (
                <UpdateBtn
                  onClick={() => {
                    modifyCommentClick(data.commentId);
                  }}
                >
                  등록
                </UpdateBtn>
              ) : (
                <ModiBtn onClick={() => setIsEdit(true)}>수정</ModiBtn>
              )}
              <DeleteBtn
                onClick={() => {
                  deleteCommentClick(data.commentId);
                }}
              >
                삭제
              </DeleteBtn>
            </>
          )}
        </Btn>

        <hr style={{ color: "#e2e2e2" }} />
      </div>
    </div>
  );
};

const User = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  p{
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
    border-radius:8px;
    padding:10px;
  }
  & p:last-child {
    color: #777777;
    margin-top:10px;
  
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

const DeleteBtn = styled(ModiBtn)`
  border-color: #ff0000;
  color: #ff0000;
`;

const UpdateBtn = styled(ModiBtn)``;
export default Comment;
