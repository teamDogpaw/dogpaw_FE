import { useSetRecoilState } from "recoil";
import { DarkThemeAtom } from "../atom/theme";
import React, { useState } from "react";
import ModalOpen from "./Modal";

const Header = () => {
  const isDarkTheme = useSetRecoilState(DarkThemeAtom);

  return (
    <>
      <button onClick={() => isDarkTheme((prev) => !prev)}>모드 바꾸기</button>
      <ModalOpen />
    </>
  );
};

export default Header;
