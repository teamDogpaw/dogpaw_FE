import instance from "../shared/axios";

export const detailApis = {
    getPostList: async id => {
        const { data } = await instance.get(
            `api/post/detail/${id}`);
        return data;
      },
   
  };
  