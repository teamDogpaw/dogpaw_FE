import { useRecoilState, useSetRecoilState } from "recoil";
import { DarkThemeAtom } from "../atom/theme";
import React, { useState } from "react";
import ModalOpen from "./Modal";
import axios from "axios";
import { Link } from "react-router-dom";


import { ReactComponent as Logo } from "../styles/icon/logoLight.svg";
import lightMode  from "../styles/icon/toggleLight.svg";
import darkMode  from "../styles/icon/toggleDark.svg";
import sun  from "../styles/icon/sun.svg";
import moon  from "../styles/icon/moon.svg";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";


const Header = () => {
  
  const navigate = useNavigate();
  const [isDark,setIsDark] = useRecoilState(DarkThemeAtom);



  const logout = async () => {
    localStorage.removeItem("token"); 


    localStorage.removeItem("retoken");
    localStorage.removeItem("id");

    // const data = {
    //   userId: localStorage.getItem("id"),
    // };
    // try {
    //   await axios
    //     .post("http://13.125.213.81/user/signup/addInfo", data)
    //     .then((res) => console.log(res, "로그아웃"));
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <Wrap>
      <Logo onClick={()=>{navigate("/")}}/>
      <Link to="/mypage">마이페이지</Link>

    
      <ModeBtn onClick={() => setIsDark((prev) => !prev)} isDark={isDark}>
        <ModeCircle isDark={isDark}/>
      </ModeBtn>
    
      <ModalOpen/>
      <button onClick={logout}>로그아웃</button>
      
    </Wrap>
  );
};

const Wrap = styled.div`
background: #FFFFFF;
box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
height:70px;
margin-bottom:50px;
display: flex;


`;

const ModeBtn = styled.button`
  background-image: url(${(props) => (props.isDark ? `${darkMode}` : `${lightMode}`)});
  background-repeat: no-repeat;
  background-size: cover;

  width: 80px;
  height: 34px;
  border-radius: 30px;
  border: none;
  cursor: pointer;

  margin-left: 10px;
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;


const ModeCircle = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  background-image: url(${(props) => (props.isDark ? `${moon}` : `${sun}`)});

  background-repeat: no-repeat;
  background-size: cover;

  width: 44px;
  height: 44px;
  border-radius: 50px;
  position: absolute;
  right: 0%;
  bottom: -6px;
  transition: all 0.4s ease-in-out;
  ${(props) =>
    props.isDark &&
    css`
      transform: translate(-35px, 0);
      transition: all 0.4s ease-in-out;
    `}

`;


export default Header;
