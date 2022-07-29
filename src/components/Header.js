import { useRecoilValue } from "recoil";
import { DarkThemeAtom } from "../atom/theme";

import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { newAlertListAtom, UserInfoAtom } from "../atom/atom";
import ModalOpen from "./Modal_prev";
import Sse from "./Sse";

import logolight from "../styles/logo/logoLight.svg";
import logodark from "../styles/logo/logoDark.svg";
import person from "../styles/icon/global/profile.svg";
import arrowdown from "../styles/icon/global/arrowDown.svg";
import { ReactComponent as Write } from "../styles/icon/detail/edit.svg";
import { ReactComponent as Bell } from "../styles/icon/header/bell.svg";
import newBell from "../styles/icon/header/newBell.svg";
import {ReactComponent as GiftIcon} from "../styles/icon/header/gift.svg";
import {ReactComponent as Arrow} from "../styles/icon/header/arrow.svg";


const Header = () => {
  const newAlert = useRecoilValue(newAlertListAtom);
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
      <Gift>
      <a href="https://docs.google.com/forms/d/1LIU4LaYTaw1UWRPkThKzrF-jJ_1y3U_oj7OwVDOYjII/viewform?edit_requested=true" target="_black">
        <div>
          <GiftIcon/>
          개발바닥에 대한 피드백 작성하시고
          상품 받아가세요! ~7/30까지
          <Arrow/>
        </div>
        </a>
      </Gift>
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
                    {newAlert?.length === 0 ? (
                      <Bell />
                    ) : (
                      <img src={newBell} alt="" />
                    )}
                  </MessageList>
                  <Message>
                    <div>
                      <h4>나의 알림</h4>
                    </div>

                    <AlertList>
                      <Sse />
                    </AlertList>
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

const Gift = styled.div`
cursor: pointer;
background-color:${props =>props.theme.keyColor};
width: 100%;
height: 60px;
position:fixed;
top:0;
z-index:40;
display:flex;
justify-content:center ;
align-items:center;

a{
  text-decoration:none;
}

div {
  gap:5px;
  display:flex;
  align-items:center;
  font-weight: bold;
  color:${props => props.theme.textColor_btn};

  svg{
    fill:${props => props.theme.textColor_btn};
  }

 @media screen and (max-width:786px){
  width:360px;
  justify-content:space-between;
  text-align:center;
  //background-color:gold;
  
 }
}
`;

const Wrap = styled.header`
  background-color: ${(props) => props.theme.backgroundColor};
  box-shadow: ${(props)=>props.theme.boxShadow};
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 30;
  margin-top:60px;

  p {
    font-size: 1rem;
  }

  summary::marker {
    font-size: 0;
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
    font-size: 0.875rem;
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
cursor: pointer;
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
    padding: 14px 0;
    padding-right:5px;
  }

  @media screen and (max-width: 786px) {
    right: -60px;
    width: 250px;

    li {
      padding: 12px 0;
    }
  }
`;
const AlertList = styled.li`
  height: 300px;

  padding-top:5px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px;
    height: 9px;
  }
  /* &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    border: ${props => props.theme.border};
    background: ${props => props.theme.scrollBackgroundColor};
  } */

  @media screen and (max-width:786px) {
    height:220px;
  }
`;
const MessageList = styled.summary`
  stroke: ${(props) => props.theme.headerTextColor};
`;
export default Header;
