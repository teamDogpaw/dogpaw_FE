import instance from "../shared/axios";

export const postApis = {
  getPostList : async (id) => await instance.get(`api/post/detail/${id}`),
  postProject : async (selectedData) => await instance.post(`/api/post`, selectedData),
  editProject : async (data) => await instance.put(`/api/post/${data.postId}`, data.data),
  deletePost : async (id) => await instance.delete(`/api/post/${id}`),
  getBookmarkRank: async () => await instance.get("/api/bookMark/rank"),
  getMyBookmarkPost : async () => await instance.get(`/api/user/mypage/bookmark`),
  getMyParticipatePost : async () => await instance.get(`/api/user/participation`),
  getMyApplyPost : async () => await instance.get(`/api/user/mypage/apply`),
  getMyProjectPost : async () => await instance.get(`/api/user/mypage/post`),
  postDeadlineProject : async (postId) => await instance.post(`api/post/${postId}/deadline`),
  getKeepPostList : async(pageParam) => {
    const res = await instance.get(`/api/allpost?page=${pageParam}`);
    const { postList, isLast } = res.data;
    return { postList, nextPage: pageParam + 1, isLast };
  }
};

