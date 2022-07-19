import instance from "../shared/axios";

export const commentApis = {
  getCommentList: async (id) => await instance.get(`api/posts/${id}/comments`),

  postComment: async (commentData) =>
    await instance.post(`api/posts/${commentData.id}/comments`, commentData),

  editComment: async (commentData) =>
    await instance.put(
      `api/posts/${commentData.id}/comments/${commentData.commentId}`,
      commentData
    ),

  removeComment: async (commentData) =>
    await instance.delete(
      `api/posts/${commentData.id}/comments/${commentData.commentId}`
    ),

  postReply: async (replyData) =>
    await instance.post(
      `/api/comments/${replyData.id}/commentReply`,
      replyData
    ),

  editReply: async (replyData) =>
    await instance.put(
      `api/comments/${replyData.id}/${replyData.replyId}`,
      replyData
    ),

  removeReply: async (replyData) =>
    await instance.delete(`api/comments/${replyData.id}/${replyData.replyId}`),
};
