import instance from "../shared/axios";

export const commentApis = {
  getCommentList: async (id) => {
    const { data } = await instance.get(`api/posts/${id}/comments`);
    return data;
  },

  postComment: async (commentData) => {
    const { data } = await instance.post(
      `api/posts/${commentData.id}/comments`,
      commentData
    );
    return data;
  },

  editComment: async (commentData) => {
    const { data } = await instance.put(
      `api/posts/${commentData.id}/comments/${commentData.commentId}`,
      commentData
    );
    return data;
  },

  removeComment: async (commentData) => {
    const { data } = await instance.delete(
      `api/posts/${commentData.id}/comments/${commentData.commentId}`
    );
    return data;
  },
};
