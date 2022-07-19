import { useMutation, useQuery } from "react-query";
import { commentApis } from "../api/comment";


export  function useGetCommentList(postId){
  return useQuery(["commentList"], () => {
    return commentApis.getCommentList(postId)
  });
}

export  function usePostComment(){
  return useMutation(commentData => {
    return commentApis.postComment(commentData);
  });
}

export function useEditComment(){
  return useMutation(commentData => {
    return commentApis.editComment(commentData);
  })
}

export function useRemoveComment(){
  return useMutation(commentData =>{
    return commentApis.removeComment(commentData)
  })
}