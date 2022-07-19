import instance from "../shared/axios";

export const postApis = {
    getMyBookmarkPost : async () => await instance.get(`/api/user/mypage/bookmark`),
    getMyParticipatePost : async () => await instance.get(`/api/user/participation`),
    getMyApplyPost: async () => await instance.get(`/api/user/mypage/apply`),
    getMyProjectPost: async () => await instance.get(`/api/user/mypage/post`),
    getBookmarkRank: async () => await instance.get("/api/bookMark/rank")
}