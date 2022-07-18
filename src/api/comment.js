import instance from "../shared/axios";

export const commentApis = {
  getCommentList: async (id) => {
    const { data } = await instance.get(`api/posts/${id}/comments`);
    return data;
  },

  postComment: async (commentData) => {
    try {
      await instance.post(`api/posts/${commentData.id}/comments`, commentData);
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  },

  editComment: async (commentData) => {
    try {
      await instance.put(
        `api/posts/${commentData.id}/comments/${commentData.commentId}`,
        commentData
      );
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  },

  removeComment: async (commentData) => {
    try {
      await instance.delete(
        `api/posts/${commentData.id}/comments/${commentData.commentId}`
      );
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  },
};
