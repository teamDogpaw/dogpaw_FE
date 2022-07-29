import instance from "../shared/axios";

export const othersApi = {
    getOthersPage: async (nickname) => await instance.get(decodeURI(`/api/user/${nickname}/other/mypage/info`)),
}