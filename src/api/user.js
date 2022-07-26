import instance from "../shared/axios";

export const userApis = {
  signUp: async (data) => await instance.post(`/user/signup`, data),
  postApply: async (postId) => await instance.post(`/api/apply/${postId}`),
  putMyProfile: async (formData) => await instance.put(`/api/user/info`, formData, { headers: { "Content-Type": "multipart/form-data" }}),
  putMyProfileReset: async () => await instance.put(`/api/user/profile/basic`),
  withdrawParticipate: async (postId) => await instance.delete(`/api/withdraw/team/${postId}`),
  postBookmark: async (id) => await instance.post(`api/bookMark/${id}`),
};
