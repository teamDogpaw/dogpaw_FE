import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../shared/axios";

import styled, { css } from "styled-components";
import { ReactComponent as CommentIcon } from "../styles/icon/u_comment-alt-lines.svg";
import { ReactComponent as BookmarkIcon } from "../styles/icon/u_bookmark.svg";
import { ReactComponent as BookmarkFill } from "../styles/icon/Vector 33.svg";

import person from "../styles/images/person.png";
import banner from "../styles/images/main_banner.png";
import mainBanner01 from "../styles/images/main_banner02.png";

const Main = () => {
  const navigate = useNavigate();

  const [mark, setMark] = useState(false);
  const [toggle, setToggle] = useState(true);

  const isLogin = localStorage.getItem("token");

  const getPostList = () => {
    return instance.get("/api/allpost");
  };

  const { isLoading, isError, data, error } = useQuery(
    "postList",
    getPostList,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (e) => {
        console.log(e.message);
      }
    }
  );
  if (isLoading) {
    return null;
  }

  if (isError) {
    return <span>Error:{error.message}</span>;
  }

  // deadline :모집 마감 => true, 모집중 => false
  //toggle true : 모집중, false : 모두보기
  const all = data.data;
  const mojib = toggle ? all.filter((post) => post.deadline === false) : all;

  const bookMark = () => {
    if (mark === false) {
      setMark(true);
    } else {
      setMark(false);
    }
  };
  //console.log(mark);

  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <Wrap>
      <img src={mainBanner01} alt="" />
      <ToggleWrap>
        <ToggleBtn onClick={clickedToggle} toggle={toggle}>
          <p style={{ display: "flex" }}>
            <All>ALL</All>
            <Ing>모집중</Ing>
          </p>
          <Circle toggle={toggle}>
            <p>{toggle ? "모집중" : "ALL"}</p>
          </Circle>
        </ToggleBtn>
      </ToggleWrap>
      <ArticleWrap>
        {mojib.map((list) => {
          return (
            <Article
              key={list.postId}
              onClick={() => {
                if (!isLogin) {
                  window.alert("로그인이 필요한 서비스입니다!");
                  return;
                }
                navigate("/detail/" + list.postId);
              }}
            >
              <Content>
                <h1>{list.title}</h1>
                <p>{list.content}</p>
              </Content>

              <Hashtag>
                <ul>
                  {list.stacks.map((lang, idx) => (
                    <li key={idx}>#{lang}</li>
                  ))}
                </ul>
                <p style={{ color: "#ffb673" }}>
                  #{list.online ? "온라인" : "오프라인"}
                </p>
              </Hashtag>
              <Info>
                <Comment>
                  <CommentIcon />
                  <p>{list.commentCnt}</p>
                </Comment>
                <Bookmark>
                  <BookmarkIcon style={{ width: "10", height: "14" }} />
                  <p>{list.bookmarkCnt}</p>
                </Bookmark>
                <Date>시작예정일 {list.startAt}</Date>
              </Info>
              <Footer>
                <User>
                  <img src={list.profileImg || person} alt="profileImg" />
                  <p>{list.nickname}</p>
                </User>

                {list.bookMarkStatus ? (
                  <BookmarkFill onClick={bookMark} />
                ) : (
                  <BookmarkIcon onClick={bookMark} />
                )}
              </Footer>
            </Article>
          );
        })}
      </ArticleWrap>
    </Wrap>
  );
};
const Wrap = styled.div`
  width:1200px;
  margin: auto;

  @media screen and (max-width: 996px) {
    margin: 0px 40px;
  }

  ul {
    display: flex;
  }

  h1 {
    font-size: 25px;
  }
  p {
    font-size: 15px;
  }
`;
// 토글 스위치
const ToggleWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 ;
`;
const ToggleBtn = styled.button`
  width: 100px;
  height: 38px;
  border-radius: 30px;
  border: 2px solid #ffb673;
  cursor: pointer;
  background-color: ${(props) => props.theme.divBackGroundColor};
  //margin-left: 10px;
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const All = styled.span`
  width: 35px;
  font-weight: 700;
  color: #ffb673;
  opacity: 0.5;
  display: flex;
  align-items: center;
  padding-left: 6px;
`;
const Ing = styled(All)`
  width: 50px;
  flex-direction: row-reverse;
`;

const Circle = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
 background-color: #FF891C;
  //background-color: #ffb673;
  width: 48px;
  height: 32px;
  border-radius: 50px;
  position: absolute;
  left: 2%;
  transition: all 0.4s ease-in-out;
  ${(props) =>
    props.toggle &&
    css`
      transform: translate(44px, 0);
      transition: all 0.4s ease-in-out;
    `}

  p {
    width: 100%;
    color: white;
    font-weight: 700;
  }
`;
// 토글 스위치

const ArticleWrap = styled.ul`
width:1200px;
  gap: 2%;
  row-gap:24px;
  display: flex;
  flex-wrap: wrap;
  
`;
const Article = styled.li`
  background-color: ${(props) => props.theme.divBackGroundColor};
  padding: 16px 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  //border:1px solid #d1d1d1;
  width: 23.5%;
  height: 352px;
  position: relative;
  transition: 0.2s ease-in;
  cursor: pointer;

  &:hover {
    transform:scale(1.02);
  }
`;

const Content = styled.div`
  margin: 20px 0;

  h1 {
    padding-bottom: 20px;
  }

  p {
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const Hashtag = styled.div`
  position: absolute;
  bottom: 100px;

  li {
    margin-right: 5px;
    color: #ffb673;
  }
`;

const Deadline = styled.div`
  padding: 15px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Footer = styled.div`
  display: flex;
  width: 88%;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 20px;

  svg {
    margin-right: 5px;
  }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;
const Info = styled.div`
  display: flex;
  width: 87%;
  position: absolute;
  bottom: 70px;
  svg {
    margin-right: 5px;
  }
`;
const Comment = styled.div`
  display: flex;
  margin-right: 15px;
`;

const Bookmark = styled.div`
  display: flex;
`;
const Date = styled.p`
  color: #8b8b8b;
  width: 203px;
  display: flex;
  justify-content: flex-end;
`;

export default Main;
