import instance from "../shared/axios";

export const projectApis = {
    getApplicantLists : async (postId) => await instance.get(`api/allApplicants/info/${postId}`),
    getParticipantsLists : async (postId) => await instance.get(`/api/user/team/${postId}`),
    rejectApply : async (userId, postId) => await instance.delete(`api/applicant/${userId}/rejection/${postId}`),
    acceptApply :async (userId, postId) => await instance.post(`api/applicant/${userId}/acceptance/${postId}`),
    explusionMate : async (userId, postId) => await instance.delete(`/api/expulsion/${userId}/teammate/${postId}`)
}