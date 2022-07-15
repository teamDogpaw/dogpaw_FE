import styled, { keyframes } from "styled-components";
import { ReactComponent as BookmarkIcon } from "../styles/icon/post/bookmark.svg";
import { ReactComponent as BookmarkFill } from "../styles/icon/post/bookmarkFill.svg";
import { ReactComponent as Arrow } from "../styles/icon/detail/backArrow.svg";
import person from "../styles/images/person.png";
import paw from "../styles/icon/detail/paw.svg";
import edit from "../styles/icon/detail/edit.svg";
import remove from "../styles/icon/detail/remove.svg";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import { instance } from "../shared/axios";
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
import { useState } from "react";
import Loading from "../shared/Loading";

const Detail = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(UserInfoAtom);

  const params = useParams();
  const id = params.postId;
  const [isHover, setIsHover] = useState(false);
  const [dataSet, setDataset] = useState([]);

  const PostDelete = useMutation(() => {
    instance.delete(`/api/post/${id}`);
    navigate("/");
  });

  const getPostList = () => {
    return instance.get(`api/post/detail/${id}`);
  };

  const bookmarkData = () => {
    return instance.post(`api/bookMark/${id}`);
  };

  const applyData = () => {
    return instance.post(`api/apply/${id}`);
  };
  const {
    nickname: author,
    applyStatus,
    bookMarkStatus,
    content,
    maxCapacity,
    onLine,
    profileImg,
    currentMember,
    title,
    startAt,
    stacks,
    period,
  } = dataSet;

  const { isLoading, isError, error } = useQuery("detailList", getPostList, {
    refetchOnWindowFocus: false, // 사용자가 다른 곳에 갔다가 돌아올시 함수 재실행 여부
    onSuccess: (data) => {
      setDataset(data.data);
      console.log("데이터 조회", data);
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

  const userId = user.nickname;

  // 뮤테이션
  const queryClient = useQueryClient();

  const { mutate: bookmark } = useMutation(bookmarkData, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("detailList");
    },
    onError: (e) => {
      console.log(e.message);
    },
  });
  const { mutate: applymark } = useMutation(applyData, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("detailList");
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <span>Error:{error.message}</span>;
  }

  const bookMark = () => {
    bookmark();
  };

  const applyBtn = () => {
    applymark();
  };

  return (
    <>
      <Wrap>
        <ArticleTop>
          <User>
            <h1>{title}</h1>
            <Img src={profileImg || person} alt="profile" />
            <p>{author}</p>
          </User>
          <Leftarrow
            onClick={() => {
              navigate(-1);
            }}
          />
          <Mark>
            {author === userId ? (
              ""
            ) : bookMarkStatus ? (
              <BookmarkFill onClick={bookMark} />
            ) : (
              <BookmarkIcon onClick={bookMark} />
            )}
          </Mark>
          <Userbtn>
            {author === userId && (
              <>
                <ModifyBtn onClick={() => navigate(`/write/${id}`)}>
                  <img src={edit} alt="" />
                  <span>게시글 수정</span>
                </ModifyBtn>
                <DeleteBtn onClick={() => PostDelete.mutate()}>
                  <img src={remove} alt="" />
                  <span>게시글 삭제</span>
                </DeleteBtn>
              </>
            )}
          </Userbtn>

          <hr />
          <ContentWrap>
            <div>
              <Title>
                <p>진행방식</p>
                <span> {onLine ? "온라인" : "오프라인"}</span>
              </Title>

              <Title>
                <p>구인스택</p>
                <Stack>
                  {stacks?.map((lang, idx) => (
                    <span key={idx}> #{lang}</span>
                  ))}
                </Stack>
              </Title>
              <Title>
                <p>예상 진행 기간</p>
                <span>{period}</span>
              </Title>
              <Title>
                <p>시작 예정일</p>
                <span> {startAt}</span>
              </Title>
              <Title>
                <p>모집 인원</p>
                <span>
                  {currentMember} / {maxCapacity} 명
                </span>
              </Title>
            </div>
            <div>
              <div
                onMouseOver={() => setIsHover(true)}
                onMouseOut={() => setIsHover(false)}
              >
                {isHover && (
                  <Alert>
                    <p>{currentMember}명이 지원했어요!</p>
                  </Alert>
                )}
                {author === userId ? (
                  <>
                    <Button>지원자 보기</Button>
                    <Button2>프로젝트 마감하기</Button2>
                  </>
                ) : !applyStatus ? (
                  <Button onClick={applyBtn}>프로젝트 지원하기</Button>
                ) : (
                  <Button onClick={applyBtn}>지원 취소하기</Button>
                )}
              </div>
            </div>
          </ContentWrap>
        </ArticleTop>

        <Article>
          <div>
            <h1>프로젝트 소개</h1>
          </div>
          <pre>{content}</pre>
          <div>
            <img src={paw} alt="" />
          </div>
        </Article>
        <Comments />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  max-width: 996px;
  margin: auto;

  h1 {
    font-size: 25px;
  }

  p {
    font-size: 16px;
  }

  hr {
    border:1px solid #e2e2e2 ;
    
  }

  span {
    font-weight: 500;
  }

  @media screen and (max-width: 996px) {
    margin: 0px 40px;
  }
`;
const ArticleTop = styled.div`
  background-color: ${(props) => props.theme.divBackGroundColor};
  height: 514px;
  margin: auto;
  padding: 32px;
  position: relative;
`;

const User = styled.div`
  height: 153px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 60px;
`;

const Userbtn = styled.div`
display:flex;
position:absolute;
right:30px;
top:150px;


span {
  font-size:12px;
  color: #777;
}

img {
  margin:0 5px;
}

`;

const ModifyBtn = styled.button`
background-color:${(props)=>props.theme.divBackGroundColor};
width:98px;
height:32px;
border:1px solid #777;
border-radius:8px;
display:flex;
align-items:center;
cursor: pointer;

`;

const DeleteBtn = styled(ModifyBtn)`
border:1px solid #FF0000;
margin-left:10px;

span {
  color:#FF0000;
}
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const Leftarrow = styled(Arrow)`
  position: absolute;
  top: 25px;
  left: 30px;
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
`;

const Title = styled.div`
  display: flex;

  p:first-child {
    width: 120px;
  }
`;

const Stack = styled.div`
  display: flex;
  align-items: center;

  span {
    background-color: ${(props) => props.theme.stackBackground};
    height: 38px;
    display: flex;
    align-items: center;
    padding: 0px 15px;
    border-radius: 24px;
    margin-right: 16px;
    color: ${(props) => props.theme.stackColor};
  }
`;

const Article = styled.div`
 background-color: ${(props) => props.theme.divBackGroundColor};
  margin: auto;
 
  line-height: 1.5;
  letter-spacing: -0.004em;
  padding: 32px;
  

  div {
    display: flex;
    justify-content: center;
    padding: 32px;
  }

  pre {
    white-space: pre-wrap;
  }
`;

const Button = styled.button`
  height: 52px;
  width: 180px;
  background-color: #ffb673;
  border: none;
  border-radius: 8px;
  color: #fff;
  padding: 16px 24px;
  font-size: 17px;
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
const Button2 = styled.button`

height: 52px;
  width: 180px;
  background-color:#fff;
  border: 2px solid #ffb673;
  border-radius: 8px;
  color: #ffb673;
  padding: 16px 24px;
  font-size: 17px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right:200px;
  bottom: 0px;
  cursor: pointer;

  :hover {
    background-color: #ff891c;
    color:white;
  }
  :active {
    background-color: #d26500;
  }

`;

const alertAni = keyframes`
from {
  transform : translateY(30px);
}

to {
  transform : translateY(0);
}
`;

const Alert = styled.div`
  position: absolute;
  right: 35px;
  bottom: 20%;
  animation: ${alertAni} 0.2s linear;
`;

export default Detail;
