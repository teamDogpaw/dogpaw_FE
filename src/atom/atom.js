import { atom } from "recoil";
import Login from "../components/Login";

export const UserInfoAtom = atom({
  key: "UserInfo",
  default: []
});

export const modalContentAtom = atom({
  key: "modalContentAtom",
  default: <Login />,
});

export const alertListAtom = atom({
  key: "alertList",
  default: [],
});

export const newAlertListAtom = atom({
  key: "newAlertList",
  default: [],
});
