import { useRecoilValue } from "recoil";
import { DarkThemeAtom } from "../atom/theme";

import React, { useEffect, useRef, useState } from "react";
import { Link, useMatch, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { alertListAtom, UserInfoAtom } from "../atom/atom";
import ModalOpen from "./Modal_prev";
import Sse from "./Sse";

import logolight from "../styles/logo/logoLight.svg";
import logodark from "../styles/logo/logoDark.svg";
import person from "../styles/icon/global/profile.svg";
import arrowdown from "../styles/icon/global/arrowDown.svg";
import { ReactComponent as Write } from "../styles/icon/detail/edit.svg";
import bell from "../styles/icon/header/bell.svg";
import newBell from "../styles/icon/header/newBell.svg";

const Header = () => {
  const alert = useRecoilValue(alertListAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const isDark = useRecoilValue(DarkThemeAtom);
  const userInfo = useRecoilValue(UserInfoAtom);
  const detailsRef = useRef(null);
  const isLogin = localStorage.getItem("token");

  let [searchParams, setSearchParams] = useSearchParams();
  const isKakao = searchParams.get("nickname");
  const kakaoNick = localStorage.getItem("socialNick");
  useEffect(() => {
    if (isKakao) {
      const token = searchParams.get("token");
      const retoken = searchParams.get("refreshtoken");
      const userId = searchParams.get("userId");
      localStorage.setItem("id", userId);
      localStorage.setItem("token", token);
      localStorage.setItem("retoken", retoken);
      localStorage.setItem("socialNick", isKakao);
      window.location.replace("/");
    }

    if (kakaoNick === "default") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, []);

  const details = detailsRef.current;
  if (details) {
    details.open = false;
  }

  const viewModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("retoken");
    localStorage.removeItem("id");
    localStorage.removeItem("socialNick");
    window.location.replace("/");
  };

  return (
    <>
      {isModalOpen ? (
        <ModalOpen viewModal={viewModal} kakaoNick={kakaoNick} />
      ) : null}
      <Wrap>
        <ContentWrap>
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            {isDark ? (
              <Img src={logodark} alt="" />
            ) : (
              <Img src={logolight} alt="" />
            )}
          </div>
          <User>
            {!isLogin ? (
              <Contain>
                <span onClick={viewModal}>로그인 </span>
              </Contain>
            ) : (
              <>
                <StyledLink to="/write">
                  <Write />
                  게시글 작성{" "}
                </StyledLink>
                <Details>
                  <MessageList>
                    {alert?.length === 0 ? (
                      <img src={bell} alt="" />
                    ) : (
                      <img src={newBell} alt="" />
                    )}
                  </MessageList>
                  <Message>
                    <div>
                      <h4>나의 알림</h4>
                    </div>

                    <li>
                      <Sse />
                    </li>
                  </Message>
                </Details>
                <Details ref={detailsRef}>
                  <Summary>
                    <Profile src={userInfo?.profileImg || person} alt="" />
                    <img src={arrowdown} alt="" style={{ width: "15px" }} />
                  </Summary>
                  <Select>
                    <Option2>
                      <p onClick={() => navigate("/write")}>게시글 작성</p>
                    </Option2>
                    <Option>
                      <p onClick={() => navigate("/mypage")}>마이페이지</p>
                    </Option>
                    <Option>
                      <p onClick={logout}>로그아웃</p>
                    </Option>
                  </Select>
                </Details>
              </>
            )}
          </User>
        </ContentWrap>
      </Wrap>
    </>
  );
};

const summaryStyle = css`
  border-radius: 8px;
  position: absolute;
  border: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.inputBoxBackground};
  box-shadow: 0px 4px 4px 0px rgb(0, 0, 0, 0.1);
`;

const Wrap = styled.div`
  background-color: ${(props) => props.theme.BackGroundColor};
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  p {
    font-size: 16px;
  }


  summary::-webkit-details-marker {
  display: none;
}

  summary::-webkit-details-marker {
    display: none;
  }
`;

const Img = styled.img`
  cursor: pointer;
  width: 167px;
  height: 46px;

  @media screen and (max-width: 786px) {
    width: 130px;
  }
`;

const ContentWrap = styled.div`
  width: 1200px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;

  @media (max-width: 770px) {
    margin: 0px 20px;
  }
`;

const Contain = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  cursor: pointer;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  width: 250px;

  @media screen and (max-width: 500px) {
    width: 100px;
  }
`;

const Profile = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Details = styled.details`
  position: relative;
  cursor: pointer;
`;

const Summary = styled.summary`
  cursor: pointer;
  list-style: none;

  img {
    width: 38px;
    height: 38px;
  }

  @media screen and (max-width: 786px) {
    img {
      width: 34px;
      height: 34px;
    }
  }
`;

const Select = styled.ul`
  ${summaryStyle}
  right: 0;
  width: 100px;
  height: 80px;
  z-index: 10;

  @media screen and (max-width: 500px) {
    height: 120px;
  }

  button {
    border: none;
    background-color: #fff;
    font-size: 14px;
    cursor: pointer;
    padding: 3px 0;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  stroke: ${(props) => props.theme.headerTextColor};
  text-decoration: none;
  color: ${(props) => props.theme.headerTextColor};
  font-weight: 500;

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const Option = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 13px;
  padding-bottom: 10px;
`;

const Option2 = styled(Option)`
  @media screen and (min-width: 501px) {
    display: none;
  }
`;

const Message = styled.ul`
  ${summaryStyle}
  right:0;
  width: 350px;
  padding: 16px;
  z-index: 99;

  h4 {
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
  }

  li {
    padding: 16px 0;
  }

  @media screen and (max-width: 500px) {
    right: -60px;
    width: 250px;
  }
`;

const MessageList = styled.summary``;

export default Header;
