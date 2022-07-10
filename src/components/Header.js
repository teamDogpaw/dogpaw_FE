import { useSetRecoilState } from "recoil";
import { DarkThemeAtom } from "../atom/theme";
import React, { useState } from "react";
import ModalOpen from "./Modal";
import axios from "axios";

const Header = () => {
  const isDarkTheme = useSetRecoilState(DarkThemeAtom);

  // 로그아웃
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("retoken");
    /* const data = {
      userId: localStorage.getItem("id"),
    };
    try {
      await axios
        .post("http://13.125.213.81/user/signup/addInfo", data)
        .then((res) => console.log(res, "로그아웃"));
      localStorage.removeItem("token", "retoken");
    } catch (err) {
      console.log(err);
    } */
  };
  return (
    <>
      <button onClick={() => isDarkTheme((prev) => !prev)}>모드 바꾸기</button>
      <ModalOpen />
      <button onClick={logout}>로그아웃</button>
    </>
  );
};

export default Header;
