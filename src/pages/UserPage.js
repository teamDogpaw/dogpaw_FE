import { MyStack, PostBody, TabBody } from '../styles/style';
import {
  Profile,
  Profilepic,
  ProfileWrap,
  Stacks,
  Tab,
  WholeBody,
} from './Mypage';
import profilepic from '../styles/icon/global/profile.svg';
import { useState } from 'react';
import styled from 'styled-components';
import { useGetOtherData } from '../hook/usdOtherData';
import { useParams } from 'react-router-dom';
import OtherProjects from '../components/mypage/OtherProjects';
import { EmptyBody, EmptyImg } from '../components/common/ApplyList';
import OtherJoinProjects from './OtherJoinProject';

const UserPage = () => {
  const params = useParams();
  const othernickname = params.userNickname;
  // const otherUserNickname = encodeURI(encodeURIComponent(othernickname));
  const { data: otherUser, isLoading: isLoadingOtherPage } =
    useGetOtherData(othernickname);
  const [currentTab, setTab] = useState(1);
  // console.log(otherUser);
  const otherUserNm =
    '*'.repeat(5) + otherUser?.data.userInfo?.username.slice(5);

  const tabList = [
    {
      id: 1,
      name: '참여한 프로젝트',
      content: (
        <OtherJoinProjects currentTab={1} data={otherUser?.data.acceptedPost} />
      ),
    },
    {
      id: 2,
      name: '작성한 프로젝트',
      content: <OtherProjects currentTab={2} data={otherUser?.data.myPost} />,
    },
  ];

  if (isLoadingOtherPage) {
    return (
      <EmptyBody>
        <EmptyImg />
      </EmptyBody>
    );
  }
  return (
    <>
      <WholeBody>
        <PostBody>
          <ProfileWrap>
            {otherUser?.data.userInfo.profileImg === null ? (
              <Profilepic>
                {' '}
                <img src={profilepic} alt="profileImage" />{' '}
              </Profilepic>
            ) : (
              <Profilepic>
                {' '}
                <img
                  src={otherUser?.data.userInfo.profileImg}
                  alt="profileImage"
                />{' '}
              </Profilepic>
            )}
            <Profile>
              <h4>{otherUser?.data.userInfo?.nickname}</h4>
              <p>{otherUserNm}</p>
              {/* <p>{otherUser?.data.userInfo?.username}</p> */}
              <Stacks>
                {otherUser?.data.userInfo?.stacks?.map((stack, index) => {
                  return (
                    <MyStack key={index} style={{ marginTop: '10px' }}>
                      #{stack}
                    </MyStack>
                  );
                })}
              </Stacks>
            </Profile>
          </ProfileWrap>
        </PostBody>
        <UserTabBody>
          {tabList.map((tab) => {
            return (
              <>
                <Tab
                  onClick={() => {
                    setTab(tab.id);
                  }}
                  key={tab.id}
                  className={currentTab === tab.id ? 'focused' : null}
                >
                  {tab.name}
                </Tab>
              </>
            );
          })}
        </UserTabBody>
        <div>{tabList[currentTab - 1]?.content}</div>
      </WholeBody>
    </>
  );
};

const UserTabBody = styled(TabBody)`
  grid-template-columns: repeat(2, 1fr);
`;

export default UserPage;
