import instance from "../shared/axios";


export const postApiss = {
  getPostList: async (id) => {
    const { data } = await instance.get(`api/post/detail/${id}`);
    return data;
  },
  deletePost: async (id) => {
    const {data} = await instance.delete(`/api/post/${id}`);
    return data;
  },
    getBookmarkRank: async () => {
    const { data } = await instance.get("/api/bookMark/rank");
    return data;
  }, 
  getMyBookmarkPost : async () => await instance.get(`/api/user/mypage/bookmark`),
  getMyParticipatePost : async () => await instance.get(`/api/user/participation`),
  getMyApplyPost: async () => await instance.get(`/api/user/mypage/apply`),
  getMyProjectPost: async () => await instance.get(`/api/user/mypage/post`)
};

