import instance from "../shared/axios";

export const informApis = {
  notification: async () => await instance.get("/notifications"),
  notificationRead: async (notificationId) =>
    await instance.post(`notification/read/${notificationId}`),
  notificationCnt: async () => await instance.get("/notifications/count"),
  notificationDeleteAll: async () =>
    await instance.delete("notifications/delete"),
  notificationDelete: async (notificationId) =>
    await instance.delete(`notifications/delete/${notificationId}`),
};
