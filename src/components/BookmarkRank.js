import { useGetBookmarkRank } from "../hook/usePostData";
import styled from "styled-components";

import { ReactComponent as CommentIcon } from "../styles/icon/post/commentCnt.svg";
import { ReactComponent as BookmarkIcon } from "../styles/icon/post/bookmark.svg";
import { ReactComponent as BookmarkFill } from "../styles/icon/post/bookmarkFill.svg";

import gold from "../styles/icon/main/medal0.svg";
import silver from "../styles/icon/main/medal1.svg";
import bronze from "../styles/icon/main/medal2.svg";
import person from "../styles/icon/global/profile.svg";
import { Bookmark, Comment, Content, Date, Footer, Hashtag, Info, User } from "../pages/Main";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BookmarkRank = () => {
    const navigate = useNavigate();
    const [mark, setMark] = useState(false);
    const isLogin = localStorage.getItem("token");
    const { data: rankList } = useGetBookmarkRank();
    //console.log(rankList)

    const bookMark = () => {
        if (mark === false) {
          setMark(true);
        } else {
          setMark(false);
        }
      };
  
    return (
        <ArticleWrap2>

        {rankList?.data.map((list, idx) => {
          return (
            <Article2
              key={list.postId}
              onClick={() => {
                if (!isLogin) {
                  window.alert("로그인이 필요한 서비스입니다!");
                  return;
                }
                navigate("/detail/" + list.postId);
              }}
            >
              {idx === 0 ? (
                <img src={gold} alt="" />
              ) : idx === 1 ? (
                <img src={silver} alt="" />
              ) : (
                <img src={bronze} alt="" />
              )}
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
                  #{list.online}
                </p>
              </Hashtag>
              <Info>
                <div>
                  <Comment>
                    <CommentIcon />
                    <p>{list.commentCnt}</p>
                  </Comment>
                  <Bookmark>
                    <BookmarkIcon style={{ width: "10", height: "14" }} />
                    <p>{list.bookmarkCnt}</p>
                  </Bookmark>
                </div>
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
            </Article2>
          );
        })} 
      </ArticleWrap2>
    )
}
const ArticleWrap2 = styled.div`
 max-width: 1200px;
  gap: 2%;
  row-gap: 24px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const Article2 = styled.div`
  background-color: ${(props) => props.theme.divBackGroundColor};
  padding: 16px 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.09);
  border-radius: 16px;
  width: 32%;
  height: 364px;
  position: relative;
  transition: 0.2s ease-in;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
  @media screen and (max-width:996px){
   width:49%;
  }
  @media screen and (max-width:669px){
   width:100%;
  }
 
`;



export default BookmarkRank;