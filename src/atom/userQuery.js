import { atom, selector } from "recoil";
import instance from "../shared/axios";
import Login from "../components/Login";
import { useQuery } from "react-query";


export const UserInfoAtom = atom({
  key: "UserInfo",
  default: []
});


export const modalChange = atom({
  key: "modalChange",
  default: <Login />,
});


