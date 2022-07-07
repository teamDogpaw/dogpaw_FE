import styled from "styled-components";
import { ReactComponent as BookmarkIcon } from "../styles/icon/u_bookmark.svg";
import { ReactComponent as BookmarkFill } from "../styles/icon/Vector 33.svg";

import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import { useState } from "react";

const Detail = () => {
  const [mark, setMark] = useState(false);
  const [apply, setApply] = useState(false);

  const params = useParams();
  const id = params.id;

  const getPostList = () => {
    return axios.get(`http://localhost:5001/allpost/${id}`);
  };

  const detailQuery = useQuery("detailList", getPostList, {
    refetchOnWindowFocus: false, // 사용자가 다른 곳에 갔다가 돌아올시 함수 재실행 여부
    onSuccess: (data) => {
      //console.log("성공", data);
    },
  });

  if (detailQuery.isLoading) {
    return null;
  }

  const bookMark = () => {
    //  북마크 체크
    // if (mark === false) {
    //   setMark(true);
    // } else {
    //   setMark(false);
    // }
    setMark((mark)=>!mark)
  };

  const applyBtn = () =>{
   setApply((apply)=>!apply)
  }

 // console.log(mark)
  const content = detailQuery.data.data;
  //console.log(content);
  return (
    <Wrap>
      <ArticleTop>
        <h1>{content.title}</h1>
        <User>
          <Img src={content.profileImg} alt="profile" />
          <p>{content.nickname}</p>
        </User>
        <Mark>
          {mark ? (
            <BookmarkFill onClick={bookMark} />
          ) : (
            <BookmarkIcon onClick={bookMark} />
          )}
        </Mark>

        <hr style={{ width: "100%", color: "#E2E2E2" }} />
        <ContentWrap>
          <Title>
            <p>진행방식</p>
            <p>구인스택</p>
            <p>예상 진행 기간</p>
            <p>시작 예정일</p>
            <p>모집 인원</p>
          </Title>
          <Content>
            <p> {content.online}</p>
            <Stack>
              {content.stacks.map((lang, idx) => (
                <p key={idx}> #{lang}</p>
              ))}
            </Stack>

            <p>{content.period}</p>
            <p> {content.startAt}</p>
            <p> {content.capacity} 명</p>
          </Content>
          { !apply ? (<Button onClick={applyBtn}>프로젝트 지원하기</Button>) :(<Button onClick={applyBtn}>지원 취소하기</Button>)}
        </ContentWrap>
      </ArticleTop>

      <Article>
        <h1>프로젝트 소개</h1>
        <div>{content.content}</div>
      </Article>

      <Comments />
    </Wrap>
  );
};
const Wrap = styled.div`
  max-width: 996px;
  //height:100vh;
  margin: auto;
  box-sizing: border-box;
  h1 {
    font-size: 25px;
  }

  p {
    font-size: 16px;
  }

  @media screen and (max-width: 996px) {
    margin: 0px 40px;
  }
`;
const ArticleTop = styled.article`
  background-color: ${(props)=> props.theme.divBackGroundColor};
  margin: auto;
  border-radius: 16px;
  padding: 32px;
  position: relative;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Mark = styled.div`
  position: absolute;
  top: 25px;
  right: 30px;
`;

const ContentWrap = styled.div`
  display: flex;
  padding-top: 10px;
  line-height: 48px;
  position: relative;
  // background-color:olive;
`;

const Title = styled.div``;

const Content = styled.div`
  margin-left: 15px;
`;

const Stack = styled.div`
  display: flex;
  align-items: center;
  

  p {
    padding: 0px 15px;
    background: #fff6c6;
    border-radius: 24px;
    margin-right: 10px;
    text-align: center;
    color:black;
    
  }
`;

const Article = styled(ArticleTop)`
  margin-top: 30px;
  div {
    padding-top: 20px;
  }
`;

const Button = styled.button`
  height: 53px;
  width: 200px;
  background-color: #ffb673;
  border: none;
  border-radius: 8px;
  color: #fff;
  padding: 16px 24px;
  font-size: 20px;
  font-weight: 700;
  position: absolute;
  right: 0px;
  bottom: 0px;
  cursor: pointer;
  :hover {
   background-color: #FF891C;
}
:active{
   background-color: #D26500;
}
`;

export default Detail;
