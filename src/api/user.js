import instance from "../shared/axios";

export const bookmarkApis = {
  getBookmarkRank: async () => {
    const { data } = await instance.get("/api/bookMark/rank");
    return data;
  },
  postBookmark: async (id) => {
    const { data } = await instance.post(`api/bookMark/${id}`);
    console.log(data);
    return data;
  },
  postApply: async (id)=> {
    const {data} = await instance.post(`api/apply/${id}`);
    return data;
  }
};
