import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import { useState } from "react";
import { Btn, LineBtn } from "../styles/style";
import { useDeletePost, useGetPost } from "../hook/usePostData";

import styled, { keyframes } from "styled-components";
import { ReactComponent as BookmarkIcon } from "../styles/icon/post/bookmark.svg";
import { ReactComponent as BookmarkFill } from "../styles/icon/post/bookmarkFill.svg";
import { ReactComponent as Arrow } from "../styles/icon/detail/backArrow.svg";
import person from "../styles/icon/global/profile.svg";
import paw from "../styles/icon/detail/paw.svg";
import edit from "../styles/icon/detail/edit.svg";
import remove from "../styles/icon/detail/remove.svg";
import { usePostBookmark} from "../hook/useUserData";
import {usePostApply} from "../hook/useApplyMutation"
import ViewApply from "../components/ViewApply";

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.postId;
  const [isHover, setIsHover] = useState(false);
  const [viewApply, setViewApply] = useState(false);
  const [myPostId, setMyPostId] = useState();

  const { data: postList } = useGetPost(id);
  console.log(postList?.data)
  const author = postList?.nickname;
  const userStatus = postList?.data.userStatus;

  const queryClient = useQueryClient();
  const { mutateAsync: deletePost } = useDeletePost();
  const { mutateAsync: bookmark } = usePostBookmark();
  const { mutateAsync: apply } = usePostApply();

  function viewApplyModal(id) {
    setViewApply((prev) => !prev);
    setMyPostId(id);
  }

  const deletePostClick =  async () => {
    await deletePost(id);
    navigate("/");
  };

  const bookMark = async () => {
    await bookmark(id);
    queryClient.invalidateQueries("detailPost");
  };

  const applyBtn = async (applyStatus) => {
    if (userStatus === "applicant") {
      alert("지원이 취소됐습니다");
      await apply(id);
    } else {
     
      await apply(id);
      alert("신청 완료");
    }
   queryClient.invalidateQueries("detailPost");
  };

  return (
    <>
      <Wrap>
        <ArticleTop>
          <User>
            <h1>{postList?.data.title}</h1>
            <Img src={postList?.data.profileImg || person} alt="profile" />
            <p>{author}</p>
          </User>
          <Leftarrow
            onClick={() => {
              navigate(-1);
            }}
          />
          <Mark>
            {userStatus === "author" ? (
              ""
            ) : postList?.data.bookMarkStatus ? (
              <BookmarkFill onClick={bookMark} />
            ) : (
              <BookmarkIcon onClick={bookMark} />
            )}
          </Mark>
          <Userbtn>
            {userStatus === "author" && (
              <>
                <ModifyBtn
                  onClick={() => navigate(`/write/${id}`, { state: postList })}
                >
                  <img src={edit} alt="" />
                  <span>게시글 수정</span>
                </ModifyBtn>
                <DeleteBtn onClick={deletePostClick}>
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
                <span> {postList?.data.onLine ? "온라인" : "오프라인"}</span>
              </Title>
              <Title>
                <p>구인스택</p>
                <Stack>
                  {postList?.data.stacks?.map((lang, idx) => (
                    <span key={idx}> #{lang}</span>
                  ))}
                </Stack>
              </Title>
              <Title>
                <p>예상 진행 기간</p>
                <span>{postList?.data.period}</span>
              </Title>
              <Title>
                <p>시작 예정일</p>
                <span> {postList?.data.startAt}</span>
              </Title>
              <Title>
                <p>모집 인원</p>
                <span>
                  {postList?.data.currentMember} / {postList?.data.maxCapacity} 명
                </span>
              </Title>
            </div>
            <div>
              {userStatus === "author" ? (
                <>
                  <Button2
                    onClick={() => {
                      viewApplyModal(id);
                    }}
                  >
                    지원자 보기
                  </Button2>

                  <Button>프로젝트 마감하기</Button>
                </>
              ) : userStatus === "MEMBER" ? (
                <div
                  onMouseOver={() => setIsHover(true)}
                  onMouseOut={() => setIsHover(false)}
                >
                  {isHover && (
                    <Alert>
                      <p>{postList?.data.applierCnt}명이 지원했어요!</p>
                    </Alert>
                  )}
                  <Button onClick={() => applyBtn(postList?.data.applyStatus)}>
                    프로젝트 지원하기
                  </Button>
                </div>
              ) : (
                <div
                  onMouseOver={() => setIsHover(true)}
                  onMouseOut={() => setIsHover(false)}
                >
                  {isHover && (
                    <Alert>
                      <p>{postList?.data.applierCnt}명이 지원했어요!</p>
                    </Alert>
                  )}
                  <Button onClick={() => applyBtn(postList?.data.applyStatus)}>
                    지원 취소하기
                  </Button>
                </div>
              )}
            </div>
          </ContentWrap>
        </ArticleTop>
        
        <Article>
          <div>
            <h1>프로젝트 소개</h1>
          </div>
          <pre>{postList?.data.content}</pre>
          <div>
            <img src={paw} alt="" />
          </div>
        </Article>
        <Comments />
        {viewApply && (
          <ViewApply viewApplyModal={viewApplyModal} myPostId={myPostId} />
        )}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  max-width: 996px;
  margin: auto;
  margin-bottom: 100px;

  h1 {
    font-size: 25px;
  }

  p {
    font-size: 16px;
  }

  hr {
    border: 1px solid #e2e2e2;
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
  display: flex;
  position: absolute;
  right: 30px;
  top: 150px;

  span {
    font-size: 12px;
    color: #777;
  }

  img {
    margin: 0 5px;
  }
`;

const ModifyBtn = styled.button`
  background-color: ${(props) => props.theme.divBackGroundColor};
  //width: 98px;
  padding: 0 10px 0 5px;
  height: 32px;
  border: 1px solid #777;
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const DeleteBtn = styled(ModifyBtn)`
  border: 1px solid #ff0000;
  margin-left: 10px;

  span {
    color: #ff0000;
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

const Button = styled(Btn)`
  height: 52px;
  //width: 180px;
  padding: 16px 24px;
  font-size: 17px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
  bottom: 0px;
`;
const Button2 = styled(LineBtn)`
  height: 52px;
  width: 180px;
  padding: 16px 24px;
  font-size: 17px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 200px;
  bottom: 0px;
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
  right: 28px;
  bottom: 20%;
  animation: ${alertAni} 0.2s linear;
`;

export default Detail;
