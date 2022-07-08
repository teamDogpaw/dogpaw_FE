import axios from "axios";
import { atom } from "recoil";

export const UserInfoAtom = atom({
    key:"UserInfo",
    default:[],
});