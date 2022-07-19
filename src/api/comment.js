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
};