import axios from "axios";
import { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const getCommentList = () => {
    return axios.get("http://localhost:5001/comment/");
  };
  const addComment = (data) => {
    return axios.post("http://localhost:5001/comment/",data);
  };

const Comments = () => {
  const params = useParams();
  const comment_ref = useRef("");

  const queryClient = useQueryClient();

  const id = params.id;

  const { isLoading, isError, data, error } = useQuery("commentList",getCommentList,{
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );

  const onCheckEnter = (e) => {
    if(e.key === 'Enter') {
        const commentData = {comment:comment_ref.current.value}
        mutate(commentData);  
    }
  }
  const {mutate} = useMutation(addComment,{
    onSuccess:(data)=>{ // 댓글 목록 다시 불러오면 됨 
        queryClient.invalidateQueries("commentList") // 새로 추가 요청을 했기 때문에 상한 쿼리는 무효화 시켜
        comment_ref.current.value = ""; 
    }
  })

  if (isLoading) {
    return <span>Loding...</span>;
  }

  if (isError) {
    return <span>Error:{error.message}</span>;
  }

  console.log(data.data);
  return (
    <div>
      <input type="text" placeholder="댓글을 남겨주세요" ref={comment_ref} onKeyPress={onCheckEnter}/>
      <button onClick={()=>{
        const data = {comment:comment_ref.current.value}
        mutate(data);
      }}>등록하기</button>
      <div>
        {data.data.map((list) => {
          return (
            <div key={list.id}>
              <User>    
                <Img src={list.profileImg} alt="프로필사진" />
                <p>{list.nickname}</p>
              </User>

              <p>{list.comment}</p>
              <p>{list.modifedAt}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const User = styled.div`
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export default Comments;
