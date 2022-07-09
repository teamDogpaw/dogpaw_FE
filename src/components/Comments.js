import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  useDeleteCommentData,
  useAddCommentData,
  useCommentData,
} from "../hook/CommentData";
import instance from "../shared/axios";


const Comments = () => {
  const [isEdit,setIsEdit] = useState(false);

  const params = useParams();
  const comment_ref = useRef("");
 const id = params.postId


 const getCommentList = () => {
  return instance.get(`api/posts/${id}/comments`);
  //return instance.get("http://localhost:5001/comment/");
};

 const addComment = (data) => {
  return instance.post(`api/posts/${id}/comments`,data);
  //return instance.post("http://localhost:5001/comment/",data);
};
const removeComment = (commentId) => {
  return instance.delete(`api/posts/${id}/comments/${commentId}`);
};



  // const { isLoading, isError, data, error } = useCommentData(
  //   onSuccess,
  //   onError
  // );
 
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
  //const { mutate: addComments } = useAddCommentData(id);
  const {mutate :addComments} = useMutation(addComment,{
    onSuccess: () => {
      queryClient.invalidateQueries("commentList"); 
    },
    })

  const { mutate: deleteComments } = useMutation(removeComment,{
    onSuccess:(data)=>{
      queryClient.invalidateQueries("commentList"); 
    }
  });

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      const commentData = { comment: comment_ref.current.value };
      comment_ref.current.value = "";
      addComments(commentData);
    }
  };

  const handleAddCommentClick = () => {
    const comment = { comment: comment_ref.current.value };
    comment_ref.current.value = "";
    addComments(comment);
  };
  const DeleteComment = (commentId) => {
    deleteComments(commentId)
  };

  if (isLoading) {
    return <span>Loding...</span>;
  }

  if (isError) {
    return <span>Error:{error.message}</span>;
  }


  return (
    <Wrap>
      <h3>댓글 {data.data.length}개</h3>
      <CommentBox>
        <Input
          type="text"
          placeholder="댓글을 남겨주세요"
          ref={comment_ref}
          onKeyPress={onCheckEnter}
        />
        <Button onClick={handleAddCommentClick}>등록하기</Button>
      </CommentBox>

      <CommentList>
        {data.data.map((list) => {
          return (
            <div key={list.commentId}>
              <User>
                <Img src={list.profileImg} alt="프로필사진" />
                <p>{list.nickname}</p>
              </User>
              <Comment>
               {isEdit ? (<input type="text" defaultValue={list.comment}/>) : (<p>{list.comment}</p>)}
                <p>{list.modifedAt}</p>
              </Comment>
              <button onClick={()=>{DeleteComment(list.commentId)}}>삭제</button>
              <button >수정</button>
              <button >완료</button>
              <hr style={{ color: "#e2e2e2" }} />
            </div>
          );
        })}
      </CommentList>
    </Wrap>
  );
};

const Wrap = styled.div`
  background-color: ${(props) => props.theme.divBackGroundColor};
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
  height: 140px;
  margin-top:10px;
  
`;
const Input = styled.input`
  width: 100%;
  height: 88px;
  padding: 12px;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  outline: none;
  background-color: ${(props)=> props.theme.inputBoxBackground};
`;

const Button = styled.button`
  background: #ffb673;
  color: #fff;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  padding: 8px 12px;
  position: absolute;
  right: 0;
  bottom: 0;
  
  cursor: pointer;
  :hover {
   background-color: #FF891C;
}
:active{
   background-color: #D26500;
}
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
