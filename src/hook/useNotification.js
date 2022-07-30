import { useMutation, useQuery } from "react-query";
import { informApis } from "../api/inform";

export function useGetMessageAlert() {
  return useQuery("alertList", informApis.notification);
}

export function useGetUnreadAlert() {
  return useQuery("unreadList", informApis.notificationCnt);
}

export function usePostReadAlert() {
  return useMutation((notificationId) => {
    return informApis.notificationRead(notificationId);
  });
}

export function useDeleteAlert() {
  return useMutation((notificationId) => {
    return informApis.notificationDelete(notificationId);
  });
}

export function useDeleteAlertAll() {
  return useMutation(() => {
    return informApis.notificationDeleteAll();
  });
}
