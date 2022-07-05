import axios from "axios";
import { useQuery } from "react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import u_comment from "../styles/icon/u_comment-alt-lines.svg";
import { ReactComponent as BookmarkIcon } from "../styles/icon/u_bookmark.svg";
import {ReactComponent as BookmarkFill} from "../styles/icon/Vector 33.svg";


const Main = () => {
  const navigate = useNavigate();
  const [mark, setMark] = useState(false);

  const getPostList = () => {
    return axios.get("http://localhost:5001/allpost");
  };

  const { isLoading, isError, data, error } = useQuery( "postList",getPostList, {
   refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );
  //   const mainQuery = useQuery("postList", getPostList, {
  //      refetchOnWindowFocus: false, // 사용자가 다른 곳에 갔다가 돌아올시 함수 재실행 여부
  //     onSuccess: (data) => {
  //       console.log("성공했어!", data);
  //     },
  //   });

  if (isLoading) {
    return <span>Loding...</span>;
  }

  if (isError) {
    return <span>Error:{error.message}</span>;
  }

 console.log(data.data)

  const bookMark = () => {
    if (mark === false) {
      setMark(true);
    } else {
      setMark(false);
    }
  };
  console.log(mark);

  return (
    <Wrap>
      {data.data.map((list) => {
        return (
          <div
            key={list.id}
            // onClick={() => {
            //   navigate("/detail/" + list.id);
            // }}
          >
            {list.title}
            <TitleWrap>
              <Img src={list.profileImg} alt="profileImg" />
              <p>{list.nickname}</p>
              {mark ? (
                <BookmarkFill onClick={bookMark} />
              ) : (
                <BookmarkIcon onClick={bookMark} />
              )}
              {/* <img src={u_bookmark} alt="bookmark" style={{ width: "30px" }} onClick={bookMark}/> */}
            </TitleWrap>
            <p>{list.title}</p>
            <p>{list.content}</p>
            <ul>
              {list.stacks.map((lang, idx) => (
               <li key={idx}>#{lang}</li>
                
              ))}
              <li>#{list.online}</li>
            </ul>
            <Info>
              <Comment>
                <img src={u_comment} alt="comment" />
                <p>{list.commentCnt}</p>
              </Comment>
              <Bookmark>
                {/* <img src={u_bookmark} alt="bookmark"/> */}
                <BookmarkIcon />
                <p>{list.bookmarkCnt}</p>
              </Bookmark>
              <p>시작예정일 : {list.startAt}</p>
            </Info>
          </div>
        );
      })}
    </Wrap>
  );
};
const Wrap = styled.div`
  display: flex;

  ul {
    display: flex;
  }
  li {
    margin-right: 5px;
    color: #6d8dff;
  }
`;
const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Stack = styled.li`
  display: flex;
  background-color: yellow;
`;

const Comment = styled.div`
  display: flex;
`;

const Bookmark = styled.div`
  display: flex;
`;

const Info = styled.div`
  display: flex;
`;

export default Main;
