import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled, { css } from "styled-components";
import { ReactComponent as CommentIcon } from "../styles/icon/u_comment-alt-lines.svg";
import { ReactComponent as BookmarkIcon } from "../styles/icon/u_bookmark.svg";
import { ReactComponent as BookmarkFill } from "../styles/icon/Vector 33.svg";
import instance from "../shared/axios";

const Main = () => {
  const navigate = useNavigate();
  const [mark, setMark] = useState(false);
  const [toggle, setToggle] = useState(true);

  const getPostList = () => {
    //return axios.get("http://localhost:5001/allpost");
    return instance.get("api/allpost");
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
      },
    }
  );
  if (isLoading) {
    return <span>Loding...</span>;
  }

  if (isError) {
    return <span>Error:{error.message}</span>;
  }

  // console.log(data.data);

  //   const test = data.data.filter(item => item.deadline === toggle) // deadline :모집 마감 => true, 모집중 => false
  //  console.log(test)

  const all = data.data;
  //console.log(all)

  const mojib = toggle ? all.filter((post) => post.deadline === false) : all;
  //console.log(mojib);

  //toggle true : 모집중, false : 모두보기

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
      <Link to="/write">글쓰러 가기</Link>
      <ToggleWrap>
        <h3>모집중</h3>
        <ToggleBtn onClick={clickedToggle} toggle={toggle}>
          <Circle toggle={toggle} />
        </ToggleBtn>
        {/* <h3>{toggle ? "모집중만" : "모두보기"}</h3> */}
      </ToggleWrap>
      <ArticleWrap>
        {mojib.map((list, idx) => {
          return (
            <Article
              key={idx}
              onClick={() => {
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
                <Date>시작예정일 | {list.startAt}</Date>
              </Info>
              <Footer>
                <User>
                  <img src={list.profileImg} alt="profileImg" />
                  <p>{list.nickname}</p>
                </User>

                {list.bookmark ? (
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
 // background-color: gold;
  display: flex;
  flex-direction: column;
  margin: auto;
  //align-items:center;
  flex-wrap: wrap;

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
  margin-bottom: 20px;
`;
const ToggleBtn = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.toggle ? "#ffb673" : "none")};
  margin-left: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;
const Circle = styled.div`
  background-color: white;
  width: 26px;
  height: 26px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle &&
    css`
      transform: translate(30px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;
// 토글 스위치

const ArticleWrap = styled.ul`
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  
`;
const Article = styled.li`
  background-color: ${(props) => props.theme.divBackGroundColor};
  padding: 16px 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  width: 304px;
  height: 350px;
  position: relative;
  
 

  
`;

const Content = styled.div`
  margin: 20px 0;
  
  h1 {
    padding-bottom: 20px;
  }
`;

const Hashtag = styled.div`


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
  width:100%;
  background-color:gold;
  position: absolute;
  bottom: 70px;
  svg {
    margin-right: 5px;
  }
`;
const Comment = styled.div`
  display: flex;
  margin-right: 10px;
`;

const Bookmark = styled.div`
  display: flex;
`;
const Date = styled.p`
  color: #8b8b8b;
  //margin-left: 25px;
`;

export default Main;
