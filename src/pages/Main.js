import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled, { css } from "styled-components";
import {ReactComponent as CommentIcon} from "../styles/icon/u_comment-alt-lines.svg";
import { ReactComponent as BookmarkIcon } from "../styles/icon/u_bookmark.svg";
import { ReactComponent as BookmarkFill } from "../styles/icon/Vector 33.svg";

const Main = () => {
  const navigate = useNavigate();
  const [mark, setMark] = useState(false); 
  const [toggle, setToggle] = useState(true); 


  const getPostList = () => {
    return axios.get("http://localhost:5001/allpost");
  };

  const { isLoading, isError, data, error } = useQuery(
    "postList",
    getPostList,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        //console.log(data);
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

 const all = data.data
 //console.log(all)

 const mojib = toggle ? (all.filter(post => post.deadline === false)) : all;
 console.log(mojib)
 

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
    <>
      <Link to="/write">글쓰러 가기</Link>
      <ToggleWrap>
        <h3>모집중만 보기</h3>
        <ToggleBtn onClick={clickedToggle} toggle={toggle}>
          <Circle toggle={toggle} />
        </ToggleBtn>
        {/* <h3>{toggle ? "모집중만" : "모두보기"}</h3> */}
      </ToggleWrap>

      <Wrap>
        <ul style={{gap:"35px",flexWrap:"wrap"}}>
        {mojib.map((list) => {
          return (
            <Article
              key={list.id}
              onClick={() => {
                navigate("/detail/" + list.id);
              }}
            >
              {list.bookmark ? (
                <BookmarkFill onClick={bookMark} />
              ) : (
                <BookmarkIcon onClick={bookMark} />
              )}
              {/* <img src={u_bookmark} alt="bookmark" style={{ width: "30px" }} onClick={bookMark}/> */}
              <Date>시작예정일 | {list.startAt}</Date>
              <Content>
                <h1>{list.title}</h1>
                <p>{list.content}</p>
                <Hashtag>
                  <ul>
                    {list.stacks.map((lang, idx) => (
                      <li key={idx}>#{lang}</li>
                    ))}
                  </ul>
                  <p style={{ color: "#ffb673" }}>#{list.online}</p>
                </Hashtag>
              </Content>

              <Footer>
                <User>
                  <img src={list.profileImg} alt="profileImg" />
                  <p>{list.nickname}</p>
                </User>
                <Info>
                  <Comment>
                    <CommentIcon />
                    <p>{list.commentCnt}</p>
                  </Comment>
                  <Bookmark>
                    <BookmarkIcon />
                    <p>{list.bookmarkCnt}</p>
                  </Bookmark>
                </Info>
              </Footer>
            </Article>
          );
        })}
        </ul>
      </Wrap>
    </>
  );
};
const Wrap = styled.div`
  max-width: 996px;
  height: 100vh;
  margin: auto;
  display: flex;
  //justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 30px;
  box-sizing: border-box;

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
display:flex;
align-items:center;
`;
const ToggleBtn = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.toggle ? "#ffb673" : "none")};
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
// 
const Article = styled.li`
  flex-wrap: wrap;
  background-color: ${(props)=> props.theme.divBackGroundColor};
  padding: 16px 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  width: 300px;
  height: 350px;
  position: relative;
`;

const Date = styled.p`
 color: #8B8B8B;
 display:flex;
 justify-content:flex-end;

`;
const Content = styled.div`
margin :20px 0;
h1{
padding-bottom:20px;

}
`;

const Hashtag = styled.div`
position:absolute;
bottom:70px;
li {
    margin-right: 5px;
    color: #ffb673;
  }

`;
const Footer = styled.div`
  display: flex;
  width: 85%;
  justify-content: space-between;
  align-items: center;
  position:absolute;
  bottom:20px;

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

const Comment = styled.div`
  display: flex;
  margin-right: 10px;
`;

const Bookmark = styled.div`
  display: flex;
`;

const Info = styled.div`
  display: flex;
`;



export default Main;
