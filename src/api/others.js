import instance from "../shared/axios";

export const othersApi = {
    getOthersPage: async (nickname) => await instance.get(`/api/user/${nickname}/mypage/info)`),
}