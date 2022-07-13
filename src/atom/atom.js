import { atom } from "recoil";
import instance from "../shared/axios";
import Login from "../components/Login";
const token = localStorage.getItem("token");

const GetUserInfo = async () => {
  if (token) {
    try {
      const response = await instance.get("/user/userinfo");
      const userData = response.data;
      return userData;
    } catch (error) {
      console.log(error);
    }
  }
};


export const UserInfoAtom = atom({
  key: "UserInfo",
  default: GetUserInfo(),
});

export const modalChange = atom({
  key: "modalChange",
  default: <Login />,
});