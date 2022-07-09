import styled from "styled-components";
import { ReactComponent as BookmarkIcon } from "../styles/icon/u_bookmark.svg";
import { ReactComponent as BookmarkFill } from "../styles/icon/Vector 33.svg";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import { useState } from "react";
import { instance } from "../shared/axios";

const Detail = () => {
  const [mark, setMark] = useState(false);
  const [apply, setApply] = useState(false);

  const params = useParams();
  const id = params.postId;

  const getPostList = () => {
    //return axios.get(`http://localhost:5001/allpost/${id}`);
    return instance.get(`api/post/detail/${id}`);
  };

  const bookmarkData = () =>{
    return instance.post(`api/bookMark/${id}`)
  }

  const applyData = () =>{
    return instance.post(`api/apply/${id}`)
  }

  const detailQuery = useQuery("detailList", getPostList, {
    refetchOnWindowFocus: false, // 사용자가 다른 곳에 갔다가 돌아올시 함수 재실행 여부
    onSuccess: (data) => {
      console.log("성공", data);
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

 const queryClient = useQueryClient();
  
  const {mutate:bookmark} = useMutation(bookmarkData,{
    onSuccess:(data)=>{
      console.log(data)
      queryClient.invalidateQueries("detailList");
    }
  })
  const {mutate:applymark} = useMutation(applyData,{
    onSuccess:(data)=>{
      console.log(data)
      queryClient.invalidateQueries("detailList");
    }
  })

  if (detailQuery.isLoading) {
    return <span>Loding...</span>;
  }



  const bookMark = () => {
  
    bookmark()
  };

  const applyBtn = () => {
    applymark()
  };

  // console.log(mark)
  const content = detailQuery.data.data;
  //console.log(content);
  return (
    <Wrap>
      
      <ArticleTop>
        <h1>{content.title}</h1>

        <Link to={`/write/${id}`} content={content}> 수정하기 </Link>
        삭제하기
        <User>
          <Img src={content.profileImg} alt="profile" />
          <p>{content.nickname}</p>
        </User>
        <Mark>
          {content.bookMarkStatus ? (
            <BookmarkFill onClick={bookMark} />
          ) : (
            <BookmarkIcon onClick={bookMark} />
          )}
          
        </Mark>

        <hr style={{ width: "100%", color: "#E2E2E2" }} />
        <ContentWrap>
          <div>
            <Online>
              <p>진행방식</p>
              <p> {content.onLine ? "온라인" : "오프라인"}</p>
            </Online>
            <div>
            <Stacks>
              <p>구인스택</p>
              <Stack>
                {content.stacks.map((lang, idx) => (
                  <div key={idx}> #{lang}</div>
                ))}
              </Stack>
            </Stacks>
            </div>
            <Date>
              <p>시작 예정일</p>
              <p> {content.startAt}</p>
            </Date>
            <Maxcapacity>
              <p>모집 인원</p>
              <p> {content.maxCapacity} 명</p>
            </Maxcapacity>
          </div>
          {!apply ? (
            <Button onClick={applyBtn}>프로젝트 지원하기</Button>
          ) : (
            <Button onClick={applyBtn}>지원 취소하기</Button>
          )}
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
  background-color: ${(props) => props.theme.divBackGroundColor};
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

const Online = styled.div`
  display: flex;



  p:first-child {
    
    width:90px;
  }
`;

const Stacks = styled(Online)``;

const Date = styled(Online)``;

const Maxcapacity = styled(Online)``;

const Content = styled.div`
  margin-left: 15px;
`;

const Stack = styled.div`
  display: flex;
  align-items: center;

  div {
    background-color: ${(props) => props.theme.stackBackground};
    padding: 0px 15px;
    border-radius: 24px;
    margin-right: 16px;
    color: ${(props) => props.theme.stackColor};
  }
`;

const Article = styled(ArticleTop)`
  margin-top: 30px;
  div {
    padding-top: 20px;
  }
`;

const Button = styled.button`
  height: 50px;
  width: 200px;
  background-color: #ffb673;
  border: none;
  border-radius: 8px;
  color: #fff;
  padding: 16px 24px;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
  bottom: 0px;
  cursor: pointer;

  :hover {
    background-color: #ff891c;
  }
  :active {
    background-color: #d26500;
  }
`;

export default Detail;
