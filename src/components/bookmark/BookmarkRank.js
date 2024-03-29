import { useGetBookmarkRank } from '../../hook/usePostData';
import styled from 'styled-components';
import {
  Bookmark,
  Comment,
  Content,
  Date,
  Deadline,
  DeadlineWrap,
  Footer,
  Hashtag,
  Info,
  User,
} from '../../pages/Main';
import { usePostBookmark } from '../../hook/useUserData';
import { useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../../atom/atom';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as CommentIcon } from '../../styles/icon/post/commentCnt.svg';
import { ReactComponent as BookmarkIcon } from '../../styles/icon/post/bookmark.svg';
import { ReactComponent as BookmarkFill } from '../../styles/icon/post/bookmarkFill.svg';
import gold from '../../styles/icon/main/medal0.svg';
import silver from '../../styles/icon/main/medal1.svg';
import bronze from '../../styles/icon/main/medal2.svg';
import person from '../../styles/icon/global/profile.svg';

const BookmarkRank = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(UserInfoAtom);
  ////console.log(rankList)
  const isLogin = localStorage.getItem('token');
  const userMe = user?.nickname;
  const queryClient = useQueryClient();
  const { data: rankList } = useGetBookmarkRank();
  const { mutateAsync: bookmark } = usePostBookmark();

  const bookMark = (e) => {
    e.stopPropagation();
  };

  const bookMarkBtn = async (id) => {
    await bookmark(id);
    queryClient.invalidateQueries('bookmarkRank');
  };

  return (
    <ArticleWrap2>
      {rankList?.data.map((list, idx) => {
        return (
          <Article2
            key={list.postId}
            onClick={() => {
              navigate('/detail/' + list.postId);
            }}
          >
            {idx === 0 ? (
              <img src={gold} alt="" />
            ) : idx === 1 ? (
              <img src={silver} alt="" />
            ) : (
              <img src={bronze} alt="" />
            )}
            <h1>{list.title}</h1>
            <Content>
              <p style={{ paddingBottom: '10' }}>{list.content}</p>
            </Content>
            <Hashtag>
              <ul>
                {list.stacks.map((lang, idx) => (
                  <li key={idx}>#{lang}</li>
                ))}
              </ul>
              <p style={{ color: '#ffb673' }}>#{list.online}</p>
            </Hashtag>
            <Info>
              <div>
                <Comment>
                  <CommentIcon />
                  <p>{list.commentCnt}</p>
                </Comment>
                <Bookmark>
                  <BookmarkIcon style={{ width: '10', height: '14' }} />
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
              <div onClick={bookMark}>
                {isLogin &&
                  userMe !== list.nickname &&
                  (list.bookMarkStatus ? (
                    <BookmarkFill onClick={() => bookMarkBtn(list.postId)} />
                  ) : (
                    <BookmarkIcon onClick={() => bookMarkBtn(list.postId)} />
                  ))}
              </div>
            </Footer>
            {list.deadline === true && (
              <>
                <DeadlineWrap />
                <Deadline>모집마감</Deadline>
              </>
            )}
          </Article2>
        );
      })}
    </ArticleWrap2>
  );
};
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
  height: 375px;
  position: relative;
  transition: 0.2s ease-in;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
  @media screen and (max-width: 996px) {
    width: 49%;
  }
  @media screen and (max-width: 669px) {
    width: 100%;
  }
`;

export default BookmarkRank;
