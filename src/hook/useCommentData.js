import { useMutation, useQuery } from "react-query";
import { commentApis } from "../api/comment";

export function useGetCommentList(postId) {
  return useQuery(["commentList"], () => {
    return commentApis.getCommentList(postId);
  });
}

export function usePostComment() {
  return useMutation((commentData) => {
    return commentApis.postComment(commentData);
  });
}

export function useEditComment() {
  return useMutation((commentData) => {
    return commentApis.editComment(commentData);
  });
}

export function useRemoveComment() {
  return useMutation((commentData) => {
    return commentApis.removeComment(commentData);
  });
}

export function usePostReply() {
  useMutation((replyData) => {
    return commentApis.postReply(replyData);
  });
}

export function useEditReply() {
  useMutation((replyData) => {
    return commentApis.editReply(replyData);
  });
}

export function useRemoveReply() {
  useMutation((replyData) => {
    return commentApis.removeReply(replyData);
  });
}
