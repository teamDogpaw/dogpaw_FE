import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import { useDeletePost, useGetPost } from "../hook/usePostData";
import styled from "styled-components";
import { ReactComponent as BookmarkIcon } from "../styles/icon/post/bookmark.svg";
import { ReactComponent as BookmarkFill } from "../styles/icon/post/bookmarkFill.svg";
import { ReactComponent as Arrow } from "../styles/icon/detail/backArrow.svg";
import person from "../styles/icon/global/profile.svg";
import paw from "../styles/icon/detail/paw.svg";
import {ReactComponent as Edit} from "../styles/icon/detail/edit.svg";
import {ReactComponent as Remove} from "../styles/icon/detail/remove.svg";
import { usePostBookmark } from "../hook/useUserData";
import ApplyBtn, { Content } from "../components/ApplyBtn";
import Loading from "../shared/Loading";
import { useEffect, useState } from "react";
import AlertModal from "../components/AlertModal";
import { Btn, GrayLineBtn } from "../styles/style";


const Detail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.postId;
  const isLogin = localStorage.getItem("token");
  const [modalOpen, setModalOpen] = useState(false);
 
  const { data: postList, isLoading: isLoadingPost } = useGetPost(id);
  //console.log(postList?.data);

  const author = postList?.data.nickname;
  const userStatus = postList?.data.userStatus;

  const queryClient = useQueryClient();
  const { mutateAsync: deletePost } = useDeletePost();
  const { mutateAsync: bookmark } = usePostBookmark();

  // useEffect(()=>{
  //   queryClient.invalidateQueries("detailPost");
  // },[userStatus])


  if (isLoadingPost) {
    return <Loading />;
  }

  const deletePostClick = async () => {
    await deletePost(id);
    navigate("/");
  };

  const bookMark = async () => {
    await bookmark(id);
    queryClient.invalidateQueries("detailPost");
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Wrap>
        <ArticleTop>
          <LinkBtn>
            <ArrowBtn
              onClick={() => {
                navigate(-1);
              }}
            />
            <div>
              {isLogin && 
                  userStatus !== "author" &&
                  (postList?.data.bookMarkStatus ? (
                    <BookmarkFill onClick={bookMark} />
                  ) : (
                    <BookmarkIcon onClick={bookMark} />
                  ))
              }
            </div>
          </LinkBtn>
          <User>
            <h3>{postList?.data.title}</h3>
            <div
              // onClick={() => {
              //   userStatus === "author"
              //     ? navigate(`/mypage`)
              //     : navigate(`/mypage/${author}`);
              // }}
            >
              <img src={postList?.data.profileImg || person} alt="profile" />
              <p>{author}</p>
            </div>
          </User>

          <Userbtn>
            {userStatus === "author" && (
              <>
                <ModifyBtn
                  onClick={() =>
                    navigate(`/write/${id}`, { state: postList.data })
                  }
                >
                  <Edit />
                  <span>게시글 수정</span>
                </ModifyBtn>
                <DeleteBtn >
                  <Remove/>
                  <span onClick={openModal}>게시글 삭제</span>
                </DeleteBtn>
              </>
            )}
          </Userbtn>
          <hr />
          <ContentWrap>
            <div>
              <Title>
                <p>진행방식</p>
                <span> {postList?.data.onLine}</span>
              </Title>
              <Title>
                <p>구인스택</p>

                <Stack>
                  {postList?.data.stacks?.map((lang, idx) => (
                    <span key={idx}>#{lang}</span>
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
                  {postList?.data.currentMember} / {postList?.data.maxCapacity}
                  명
                </span>
              </Title>
            </div>
            <ApplyBtn myPostData={postList?.data} />
          </ContentWrap>
        </ArticleTop>
        <Article>
          <div>
            <h3>프로젝트 소개</h3>
          </div>
          <pre>{postList?.data.content}</pre>
          <Paw>
            <img src={paw} alt="" />
          </Paw>
        </Article>
        <Comments />

        <AlertModal open={modalOpen}>
        <Content>
          <h4>게시글을 삭제하시겠습니까?</h4>
          <div>
            <GrayLineBtn onClick={closeModal}> 닫기 </GrayLineBtn>
            <Btn onClick={deletePostClick}> 삭제 </Btn>
          </div>
        </Content>
      </AlertModal>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  max-width: 996px;
  min-width: 375px;
  margin: auto;
  margin-bottom: 100px;
  h3 {
    font-size: 1.563rem;
  }
  p {
    font-size: 1rem;
  }
  hr {
    border: ${(props)=>props.theme.border};
  }
  span {
    font-weight: 500;
  }
  @media screen and (max-width: 996px) {
    margin: 0px;
    background-color: #fff8e5;
    margin-bottom: 150px;
  }
`;
const ArticleTop = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  height: 514px;
  margin: auto;
  padding: 32px;
  padding-top: 16px;
  position: relative;

  @media (max-width: 786px) {
    height: 580px;
    padding: 0 16px 16px 16px;
  }
`;

const User = styled.div`
  position: relative;
  height: 153px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 30px;


  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:15px;

    
    p {
      padding-top: 5px;
    }
  }

  h3 {
    padding-bottom: 15px;

  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  @media screen and (max-width: 786px) {
    h3 {
      padding:0 10px;
      
    }
   

    
  }
`;
const ArrowBtn = styled(Arrow)`
  stroke: ${(props) => props.theme.toggleFontColor};

  @media screen and (max-width: 786px) {
    width: 12px;
  }
`;
const Userbtn = styled.div`
  display: flex;
  position: absolute;
  right: 30px;
  top: 150px;
  span {
    font-size: 0.75rem;
    color: #777;
  }
  img {
    margin: 0 5px;
  }

  @media screen and (max-width: 786px) {
    top:130px;
  }
`;

const ModifyBtn = styled.button`
  background-color: ${(props) => props.theme.divBackGroundColor};
  padding:0 10px 0 5px;
  height: 32px;
  border: ${(props) => props.theme.modifyBtnBorder};
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  stroke: ${props => props.theme.headerTextColor};

  span {
    color: ${(props) => props.theme.headerTextColor};
    padding-left:5px;
  }

  @media screen and (max-width: 770px) {
    span {
      display: none;
    }
    padding: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    justify-content: center;
  }
`;

export const DeleteBtn = styled(ModifyBtn)`
  border: ${props => props.theme.alertBorder};
  margin-left: 10px;
  stroke: ${props => props.theme.removeBtnColor};

  span {
    color: ${props => props.theme.removeBtnColor};
    
  }
`;

const LinkBtn = styled.div`
  display: flex;
  svg{
    cursor: pointer;
  }
  
  justify-content: space-between;
  //padding-bottom: 10px;
  @media screen and(max-width:768) {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;
export const Leftarrow = styled(Arrow)`
  position: absolute;
  top: 25px;
  left: 30px;
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
  flex-wrap:wrap;
  row-gap:10px;
  max-width: 750px;
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
  @media screen and (max-width: 770px) {
    row-gap:0px;
    flex-wrap:nowrap;
    max-width: 220px;
    overflow-x: auto;
    white-space: nowrap;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Article = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  margin: auto;
  margin-top: 20px;
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

const Paw = styled.div`
  img {
    width: 80px;
  }
  @media screen and (max-width: 770px) {
    img {
      display: none;
    }
  }
`;
export default Detail;
