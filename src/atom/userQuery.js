/*import axios from "axios";
import { atom } from "recoil";

export const token = localStorage.getItem("token");

export const instance = axios.create({
  baseURL: "http://13.125.213.81/",
  headers: { Authorization: `Bearer ${token}` },
});

 const GetUserInfo = async () => {
  return await instance.get(`http://13.125.213.81/user/userinfo`);
};

export const UserInfoAtom = atom({
  key: "UserInfo",
  default: GetUserInfo(),
}); */
