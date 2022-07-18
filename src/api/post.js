import instance from "../shared/axios";

export const PostApis = {
  getPostList: async (id) => {
    const { data } = await instance.get(`api/post/detail/${id}`);
    return data;
  },
  deletePost: async (id) => {
    const {data} = await instance.delete(`/api/post/${id}`);
    return data;
  },
};
