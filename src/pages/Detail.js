import styled from "styled-components";

import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";

const Detail = () => {
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

  const content = detailQuery.data.data;
  //console.log(content);
  return (
    <div>
      <div>
        <p>{content.title}</p>
        <User>
          <Img src={content.profileImg} alt="profile" />
          <p>{content.nickname}</p>
        </User>
        <ContentWrap>
          <Title>
            <p>진행방식</p>
            <p>구인스택</p>
            <p>예상 진행 기간</p>
            <p>시장 예정일</p>
            <p>모집 인원</p>
          </Title>
          <div>
          <p> {content.online}</p>
          <Stack>
            {content.stacks.map((lang, idx) => (
              <p key={idx}> #{lang}</p>
            ))}
          </Stack>

          <p>{content.period}</p>
          <p> {content.startAt}</p>
          <p> {content.capacity} 명</p>
          </div>
          <button>프로젝트 지원하기</button>
        </ContentWrap>

        
      </div>

      <Article>
        <p>프로젝트 소개</p>
        <div>{content.content}</div>
      </Article>

      <Comments/>
    </div>
  );
};

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ContentWrap = styled.div`
display:flex;

button{
   height:30px;
}
`;

const Title = styled.div`

`;

const Stack = styled.div`
  display: flex;
`;

const Article = styled.article`
margin-top:30px;

`;
export default Detail;
