import axios from "axios";
import { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const getCommentList = () => {
  return axios.get("http://localhost:5001/comment/");
};
const addComment = (data) => {
  return axios.post("http://localhost:5001/comment/", data);
};

const Comments = () => {
  const params = useParams();
  const comment_ref = useRef("");

  const queryClient = useQueryClient();

  const id = params.id;

  const { isLoading, isError, data, error } = useQuery(
    "commentList",
    getCommentList,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        //console.log(data);
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );


  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      const commentData = { comment: comment_ref.current.value };
      mutate(commentData);
    }
  };
  const { mutate } = useMutation(addComment, {
    onSuccess: (data) => {
      // 댓글 목록 다시 불러오면 됨
      queryClient.invalidateQueries("commentList"); // 새로 추가 요청을 했기 때문에 상한 쿼리는 무효화 시켜
      comment_ref.current.value = "";
    },
  });

  if (isLoading) {
    return <span>Loding...</span>;
  }

  if (isError) {
    return <span>Error:{error.message}</span>;
  }

  //console.log(data.data);
  return (
    <Wrap>
      <CommentBox>
        <Input
          type="text"
          placeholder="댓글을 남겨주세요"
          ref={comment_ref}
          onKeyPress={onCheckEnter}
        />
        <Button
          onClick={() => {
            const data = { comment: comment_ref.current.value };
            mutate(data);
          }}
        >
          등록하기
        </Button>
      </CommentBox>

      <CommentList>
        {data.data.map((list) => {
          return (
            <div key={list.id}>
              <User>
                <Img src={list.profileImg} alt="프로필사진" />
                <p>{list.nickname}</p>
              </User>

              <Comment>
                <p>{list.comment}</p>
                <p>{list.modifedAt}</p>
              </Comment>
              <hr style={{color:"#e2e2e2"}}/>
            </div>
          );
        })}
      </CommentList>
    </Wrap>
  );
};

const Wrap = styled.div`
  background-color: white;
  margin: auto;
  border-radius: 16px;
  padding: 32px;
  margin-top: 30px;
  box-sizing: border-box;
`;
const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  //background-color:gold;
  height: 140px;
`;
const Input = styled.input`
  width: 100%;
  height: 88px;
  padding: 12px;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  outline:none;
`;

const Button = styled.button`
  background: #ffb673;
  color: #fff;
  font-weight:700;
  border-radius: 8px;
  border: none;
  padding: 8px 12px;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
`;

const CommentList = styled.div`
  //background-color:olive;
`;
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
const Comment = styled.div`
  margin-top: 10px;
  & p:last-child {
    color: #777777;
    padding-top: 10px;
  }
`;

export default Comments;
