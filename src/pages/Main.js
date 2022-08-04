import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../atom/atom';
import { useGetKeepPostList } from '../hook/usePostData';
import BookmarkRank from '../components/bookmark/BookmarkRank';
import { usePostBookmark } from '../hook/useUserData';
import { useQueryClient } from 'react-query';

import Tutoral from '../components/etc/Tutorial';
import Loading from '../shared/Loading';
import Carousel from '../components/common/Carousel';
import styled, { css, keyframes } from 'styled-components';
import { ReactComponent as CommentIcon } from '../styles/icon/post/commentCnt.svg';
import { ReactComponent as BookmarkIcon } from '../styles/icon/post/bookmark.svg';
import { ReactComponent as BookmarkFill } from '../styles/icon/post/bookmarkFill.svg';
import award from '../styles/icon/main/award.svg';
import person from '../styles/icon/global/profile.svg';
import help from '../styles/icon/main/help.svg';

const Main = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(UserInfoAtom);
  const [toggle, setToggle] = useState(true);
  const [isTuto, setIsTuto] = useState(false);
  const { ref, inView } = useInView();

  const isLogin = localStorage.getItem('token');
  const userMe = user?.nickname;

  const queryClient = useQueryClient();
  const { mutateAsync: bookmark } = usePostBookmark();
  const { data, status, fetchNextPage, isFetchingNextPage } =
    useGetKeepPostList();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return null;
  }

  const dataList = data?.pages.map((arr) => arr.postList);
  const postList = dataList.reduce((acc, cur) => acc.concat(cur));
  const list = toggle
    ? postList.filter((post) => post.deadline === false)
    : postList;

  const bookMark = (e) => {
    e.stopPropagation();
  };

  const bookMarkBtn = async (id) => {
    await bookmark(id);
    queryClient.invalidateQueries('postList');
  };

  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  const openTuto = () => {
    setIsTuto((prev) => !prev);
    if (isTuto === false) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  };

  return (
    <Wrap>
      <Help>
        <Tuto onClick={openTuto}>
          {isTuto && <Tutoral />}
          <img src={help} alt="" />
        </Tuto>
        <span onClick={openTuto}>이용가이드</span>
      </Help>

      <Carousel />
      <Award>
        <img src={award} alt="" />
        <span>인기 게시글</span>
      </Award>
      <BookmarkRank />
      <ToggleWrap>
        <ToggleBtn onClick={clickedToggle} toggle={toggle}>
          <Toggle>
            <p>ALL</p>
            <p>모집중</p>
          </Toggle>
          <Circle toggle={toggle}>
            <p>{toggle ? '모집중' : 'ALL'}</p>
          </Circle>
        </ToggleBtn>
      </ToggleWrap>
      <ArticleWrap>
        {list.map((post) => {
          return (
            <Article
              key={post.postId}
              onClick={() => {
                navigate('/detail/' + post.postId);
              }}
            >
              <Content>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
              </Content>
              <Hashtag>
                <ul>
                  {post.stacks.map((lang, idx) => (
                    <li key={idx}>#{lang}</li>
                  ))}
                </ul>
                <p style={{ color: '#ffb673' }}>#{post.online}</p>
              </Hashtag>
              <Info>
                <div>
                  <Comment>
                    <CommentIcon />
                    <p>{post.commentCnt}</p>
                  </Comment>
                  <Bookmark>
                    <BookmarkIcon style={{ width: '10', height: '14' }} />
                    <p>{post.bookmarkCnt}</p>
                  </Bookmark>
                </div>
                <Date>시작예정일 {post.startAt}</Date>
              </Info>
              <Footer>
                <User>
                  <img src={post.profileImg || person} alt="profileImg" />
                  <p>{post.nickname}</p>
                </User>
                <div onClick={bookMark}>
                  {isLogin &&
                    userMe !== post.nickname &&
                    (post.bookMarkStatus ? (
                      <BookmarkFill onClick={() => bookMarkBtn(post.postId)} />
                    ) : (
                      <BookmarkIcon onClick={() => bookMarkBtn(post.postId)} />
                    ))}
                </div>
              </Footer>
              {post.deadline === true && (
                <>
                  <DeadlineWrap />
                  <Deadline>모집마감</Deadline>
                </>
              )}
            </Article>
          );
        })}
      </ArticleWrap>
      {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
    </Wrap>
  );
};

const ellipsisText = css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;
const displyStyle = css`
  display: flex;
  align-items: center;
`;

const Wrap = styled.div`
  max-width: 1200px;
  margin: auto;
  margin-bottom: 100px;

  ul {
    display: flex;
  }
  li {
    list-style: none;
  }
  h1 {
    font-size: 1.563rem;
    line-height: 1.2;
  }
  p {
    font-size: 0.938rem;
  }

  @media screen and (max-width: 1200px) {
    margin: 0px 30px 100px 30px;
  }
`;

const Help = styled.div`
  ${displyStyle}
  justify-content: flex-end;
  margin-bottom: 10px;

  span {
    font-weight: 500;
    color: #ffb673;
    margin-left: 5px;
    cursor: pointer;
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const Move = keyframes`
0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
`;
const Tuto = styled.div`
  animation: ${Move} 1s ease-in-out;
  cursor: pointer;
`;

const Award = styled.div`
  ${displyStyle}
  margin-top: 20px;
  span {
    font-weight: 500;
    color: ${(props) => props.theme.keyColor};
  }
`;

const ToggleWrap = styled.div`
  ${displyStyle}
  margin-top: 20px;
  margin-bottom: 20px;
`;
const ToggleBtn = styled.div`
  ${displyStyle}
  position: relative;
  height: 45px;
  border-radius: 30px;
  border: 2px solid #ffb673;
  cursor: pointer;
  background-color: ${(props) => props.theme.divBackGroundColor};
`;

const Toggle = styled.div`
  ${displyStyle}
  justify-content:space-around;

  & p:first-child {
    margin-left: 3px;
    padding: 0 10px;
  }

  & p:nth-child(2) {
    padding: 0 5px;
  }

  p {
    font-weight: 700;
    color: #ffb673;
    opacity: 0.5;
    margin-right: 3px;
  }
`;

const Circle = styled.div`
  ${displyStyle}
  flex-direction: center;
  background-color: #ff891c;
  width: 52px;
  height: 35px;
  border-radius: 50px;
  position: absolute;
  left: 2px;
  transition: all 0.4s ease-in-out;
  ${(props) =>
    props.toggle &&
    css`
      transform: translate(95%, 0);
      transition: all 0.4s ease-in-out;
    `}

  p {
    width: 100%;
    color: white;
    font-weight: 700;
    text-align: center;
  }
`;

const ArticleWrap = styled.ul`
  max-width: 1200px;
  gap: 2%;
  row-gap: 24px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;

  @media screen and (max-width: 1200px) {
    gap: 1.1%;
    row-gap: 12px;
  }
  @media screen and (max-width: 996px) {
    gap: 2%;
    row-gap: 24px;
  }
`;
const Article = styled.li`
  background-color: ${(props) => props.theme.divBackGroundColor};
  padding: 16px 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.09);
  border-radius: 16px;
  width: 23.5%;
  height: 352px;
  position: relative;
  transition: 0.2s ease-in;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 1200px) {
    width: 32.6%;
  }
  @media (max-width: 996px) {
    width: 49%;
  }
  @media (max-width: 669px) {
    width: 100%;
  }
`;

export const Content = styled.div`
  margin: 5px 0;

  h1 {
    margin-bottom: 20px;
    ${ellipsisText}
    -webkit-line-clamp: 2;
    line-height: 150%;
  }

  p {
    line-height: 20px;
    ${ellipsisText}
    -webkit-line-clamp: 3;
  }
`;
export const Hashtag = styled.div`
  width: 85%;
  position: absolute;
  bottom: 100px;

  li {
    margin-right: 5px;
    color: #ffb673;
  }

  p {
    margin-top: 5px;
  }

  ${ellipsisText}
  -webkit-line-clamp: 1;
`;

export const DeadlineWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.deadlineColor};
  border-radius: 16px;
  opacity: 0.8;
`;

export const Deadline = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 16px;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  background-color: #4e4e4e;
  border-radius: 6px;
`;

export const Footer = styled.div`
  ${displyStyle}
  justify-content: space-between;
  width: 88%;
  position: absolute;
  bottom: 20px;
  svg {
    margin-right: 5px;
  }
`;
export const User = styled.div`
  ${displyStyle}
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;
export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 87%;
  position: absolute;
  bottom: 70px;
  div {
    display: flex;
  }
  svg {
    margin-right: 5px;
  }
`;
export const Comment = styled.div`
  display: flex;
  margin-right: 15px;
`;
export const Bookmark = styled.div`
  display: flex;
`;
export const Date = styled.p`
  color: #8b8b8b;
  display: flex;
  justify-content: flex-end;
`;

export default Main;
