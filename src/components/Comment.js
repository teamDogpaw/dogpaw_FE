import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../shared/axios";

const Comment = (props) => {
  const data = props.data.data;

  const params = useParams();
  const id = params.postId;

  const removeComment = (commentId) => {
    return instance.delete(`api/posts/${id}/comments/${commentId}`);
  };

  const queryClient = useQueryClient();
  const { mutate: deleteComments } = useMutation(removeComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("commentList");
    },
  });

  const DeleteComment = (commentId) => {
    deleteComments(commentId);
  };

  return (
    <div>
      {data.map((list) => {
        return (
          <div key={list.commentId}>
            <User>
              <Img src={list.profileImg} alt="프로필사진" />
              <p>{list.nickname}</p>
            </User>
            <Content>
              {/* {isEdit ? (<input type="text" defaultValue={list.comment}/>) : (<p>{list.comment}</p>)} */}
              <p>{list.modifedAt}</p>
            </Content>
            <button
              onClick={() => {
                DeleteComment(list.commentId);
              }}
            >
              삭제
            </button>
            <button>수정</button>
            <button>완료</button>
            <hr style={{ color: "#e2e2e2" }} />
          </div>
        );
      })}
    </div>
  );
};

const User = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;
const Content = styled.div`
  margin-top: 10px;
  & p:last-child {
    color: #777777;
    padding-top: 10px;
  }
`;

export default Comment;
