import instance from "../shared/axios";

export const projectApis = {
  getApplicantLists: async (postId) =>
    await instance.get(`api/allApplicants/info/${postId}`),
  getParticipantsLists: async (postId) =>
    await instance.get(`/api/user/team/${postId}`),
  rejectApply: async (data) =>
    await instance.delete(
      `api/applicant/${data.userId}/rejection/${data.postId}`
    ),
  acceptApply: async (data) =>
    await instance.post(
      `api/applicant/${data.userId}/acceptance/${data.postId}`
    ),
  explusionMate: async (data) =>
    await instance.delete(
      `/api/expulsion/${data.userId}/teammate/${data.postId}`
    ),
};
