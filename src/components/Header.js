import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { DarkThemeAtom } from "../atom/theme";
import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserInfoAtom } from "../atom/userQuery";
import ModalOpen from "./Modal";

import logo from "../styles/images/logo.png";
import lightMode from "../styles/icon/toggleLight.svg";
import dogpaw from "../styles/icon/개발바닥.svg";
import darkMode from "../styles/icon/toggleDark.svg";
import sun from "../styles/icon/sun.svg";
import moon from "../styles/icon/moon.svg";
import person from "../styles/images/person.png";

const Header = () => {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useRecoilState(DarkThemeAtom);

  const userInfo = useRecoilValue(UserInfoAtom);

  const isLogin = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("retoken");
    localStorage.removeItem("id");
    window.location.replace("/");
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
      <div>
        <img
          src={dogpaw}
          onClick={() => {
            navigate("/");
          }}
          alt=""
        />
      </div>
      <User>
        <ModeBtn onClick={() => setIsDark((prev) => !prev)} isDark={isDark}>
          <ModeCircle isDark={isDark} />
        </ModeBtn>
        <StyledLink to="/write">게시글 작성</StyledLink>
        <Details>
          <Summary>
            <img src={userInfo?.profileImg || person} alt="" />
          </Summary>
          <Select>
            <Option>
              <button>
                <StyledLink to="/mypage">마이페이지</StyledLink>
              </button>
            </Option>
            <Option>
              {isLogin ? (
                <button onClick={logout}>로그아웃</button>
              ) : (
                <ModalOpen />
              )}{" "}
            </Option>
          </Select>
        </Details>
      </User>
    </Wrap>
  );
};

const Wrap = styled.div`
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 96px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: #fff;

  img {
    width: 167px;
    height: 46px;
  }
`;

const ModeBtn = styled.button`
  background-image: url(${(props) =>
    props.isDark ? `${darkMode}` : `${lightMode}`});
  background-repeat: no-repeat;
  background-size: cover;

  width: 78px;
  height: 35px;
  border-radius: 30px;
  border: none;

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

  width: 42px;
  height: 42px;
  border-radius: 50px;
  position: absolute;
  right: 0%;
  bottom: -4px;
  transition: all 0.4s ease-in-out;
  ${(props) =>
    props.isDark &&
    css`
      transform: translate(-35px, 0);
      transition: all 0.4s ease-in-out;
    `}
`;
const User = styled.div`
  display: flex;
  width: 280px;
  align-items: center;
  justify-content: space-between;
`;

const Profile = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: gold;
`;

const Details = styled.details`
  position: relative;
`;

const Summary = styled.summary`
  cursor: pointer;
  list-style: none;
  img {
    width: 48px;
    height: 48px;
  }
`;

const Select = styled.ul`
  width: 100px;
  height: 88px;
  z-index: 10;
  border-radius: 8px;
  position: absolute;
  left: -25px;

  border: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.inputBoxBackground};
  box-shadow: 0px 4px 4px 0px rgb(0, 0, 0, 0.1);

  button {
    border: none;
    background-color: #fff;
    font-size: 14px;
    cursor: pointer;
    padding: 3px 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Option = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export default Header;
