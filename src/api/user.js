import instance from "../shared/axios";

export const userApis = {
    postApply : async (postId) => await instance.post(`/api/apply/${postId}`),
    putMyProfile : async (formData) => await instance.put(`/api/user/info`, formData, {headers: { "Content-Type": "multipart/form-data" }}),
    putMyProfileReset : async () => await instance.put(`/api/user/profile/basic`),
}