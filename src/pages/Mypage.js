import React, { useEffect, useRef, useState } from 'react';
import Bookmark from '../components/mypage/Bookmark';
import MyProject from '../components/mypage/MyProject';
import JoinProject from '../components/mypage/JoinProject';
import { useNavigate } from 'react-router-dom';
import {
  Btn,
  LineBtn,
  MyStack,
  Option,
  PostBody,
  SelectBoxOpen,
  TabBody,
} from '../styles/style';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '../styles/icon/detail/backArrow.svg';
import {
  useMyProfileReset,
  useMyProfileEdit,
} from '../hook/useProfileMutation';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '../atom/atom';
import profilepic from '../styles/icon/global/profile.svg';
import ApplyProject from '../components/mypage/ApplyProject';
import StackSelector from '../components/stack/StackSeletor';
import { withDraw } from '../shared/userOauth';
import { SelectArrow } from '../components/WriteSelect';
import AlertModal from '../components/common/AlertModal';
import { useQueryClient } from 'react-query';
import { InputContent } from '../components/logModal/Login';

const MyPage = () => {
  const userInfo = useRecoilValue(UserInfoAtom);
  const [isEdit, setIsEdit] = useState(false);
  const [currentTab, setTab] = useState(1);
  const [imagePreview, setImagePreview] = useState();

  const [isMobile, setIsMobile] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const [myData, setMyData] = useState({
    profileImg: userInfo?.profileImg,
    nickname: userInfo?.nickname,
    stacks: userInfo?.stacks,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const detailsRef = useRef(null);
  const details = detailsRef.current;

  const [nickCheck, setNickCheck] = useState(true);
  const [nickMessage, setNickMessage] = useState('');

  const imageRef = useRef();

  const [exitModalOpen, setExitModalOpen] = useState(false);
  const formData = new FormData();
  const token = localStorage.getItem('token');

  const tabList = [
    { id: 1, name: '관심 프로젝트', content: <Bookmark currentTab={1} /> },
    { id: 2, name: '참여한 프로젝트', content: <JoinProject currentTab={2} /> },
    {
      id: 3,
      name: '신청한 프로젝트',
      content: <ApplyProject currentTab={3} />,
    },
    { id: 4, name: '내가 쓴 프로젝트', content: <MyProject currentTab={4} /> },
  ];

  useEffect(() => {
    console.log(userInfo);
    console.log(myData);

    if (userInfo === undefined && !token) {
      setModalOpen(true);
    } else {
      setMyData(userInfo);
      setImagePreview(userInfo.profileImg);
    }

    //widthHandler
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    if (windowSize.width < 600) {
      setIsMobile(true);
    } else if (windowSize.width >= 600) {
      setIsMobile(false);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width, userInfo]);

  const EditMyData = async () => {
    const image = myData.profileImg;
    if (image === null) {
    } else if (typeof image === 'string') {
    } else if (image !== null) {
      formData.append('image', image);
    }
    const data = {
      stacks: myData.stacks,
      nickname: myData.nickname,
    };
    const formdata = JSON.stringify(data);
    const blob = new Blob([formdata], { type: 'application/json' });

    formData.append('body', blob);

    try {
      const response = await profileEdit(formData);
      setIsEdit(false);
      queryClient.invalidateQueries('userinfo');
      setNickCheck(true);
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error.response.status);
        setNickCheck(false);
        setNickMessage('중복된 닉네임입니다');
        console.log(nickCheck);
      }
    }
  };

  const { mutateAsync: profileEdit } = useMyProfileEdit();
  const { mutateAsync: imageReSet } = useMyProfileReset();

  const imageResetBtn = () => {
    imageReSet();
    setImagePreview(null);
    setMyData((prev) => ({ ...prev, profileImg: null }));
    queryClient.invalidateQueries('userInfo');
  };

  const encodeFileToBase64 = (img) => {
    //console.log(img);
    const preview = new FileReader();
    preview.readAsDataURL(img);
    return new Promise((resolve) => {
      preview.onload = () => {
        setImagePreview(preview.result);
        //console.log(imagePreview);
        resolve();
      };
    });
  };
  const editImg = (e) => {
    const img = e.target.files[0];
    encodeFileToBase64(img);
    //console.log(img);
    setMyData((prev) => ({ ...prev, profileImg: img }));
  };

  const editNickname = (e) => {
    const newNickname = e.target.value;
    console.log(newNickname);
    setMyData((prev) => ({ ...prev, nickname: newNickname }));
    if (newNickname.length < 3 || newNickname.length > 8) {
      setNickCheck(false);
      setNickMessage('3글자 이상, 8글자 아래로 정해주세요.');
    } else {
      setNickCheck(true);
      setNickMessage('알맞게 작성 되었습니다.');
    }
  };

  const exitBtnOpen = () => {
    setExitModalOpen(true);
  };

  const exitBtnClose = () => {
    setExitModalOpen(false);
  };

  const needLoginUser = () => {
    navigate('/', { state: 'needLogin' });
  };

  if (userInfo === undefined && !token) {
    return (
      <AlertModal
        open={modalOpen}
        setAlertModalOpen={needLoginUser}
        message={'⚠️ 로그인이 필요한 서비스입니다'}
      />
    );
  }

  return (
    <WholeBody>
      <AlertModal
        open={exitModalOpen}
        setAlertModalOpen={exitBtnClose}
        message={'개발바닥에서 탈퇴하시겠습니까?'}
        action={withDraw}
        actionMessage={'회원탈퇴하기'}
      />

      {isMobile ? (
        <Leftarrow
          onClick={() => {
            navigate(-1);
          }}
        />
      ) : null}

      <PostBody>
        {isEdit ? (
          <>
            <ProfileWrap>
              <ProfilePicWrap>
                {imagePreview === null ? (
                  <Profilepic>
                    {' '}
                    <img src={profilepic} alt="profileImage" />{' '}
                  </Profilepic>
                ) : (
                  <Profilepic>
                    {' '}
                    <img src={imagePreview} alt="profileImage" />{' '}
                  </Profilepic>
                )}
                <BtnWrap>
                  <LineBtn className="mypage" onClick={imageResetBtn}>
                    기본 이미지로
                  </LineBtn>
                  <File>
                    <label htmlFor="profile">이미지 선택하기</label>
                    <input
                      id="profile"
                      type="file"
                      ref={imageRef}
                      accept="image/*"
                      onChange={(event) => editImg(event)}
                    />
                  </File>
                </BtnWrap>
              </ProfilePicWrap>

              <Profile>
                <input
                  defaultValue={userInfo?.nickname}
                  onChange={(event) => editNickname(event)}
                />
                {myData?.nickname.length > 0 ? (
                  <AlertMessage className={nickCheck ? 'success' : 'error'}>
                    {nickMessage}
                  </AlertMessage>
                ) : null}
                <p>{userInfo.username}</p>
                <InputContent>
                  <StackSelector data={myData} setSelectedData={setMyData} />
                </InputContent>
              </Profile>

              <BtnWrap>
                {/* <Button onClick={imageResetBtn}>기본 이미지로 변경</Button> */}

                <ExitBtn onClick={exitBtnOpen}>회원 탈퇴</ExitBtn>
                <EditBtn
                  type="submit"
                  onClick={EditMyData}
                  disabled={!nickCheck}
                >
                  수정사항 저장
                </EditBtn>
              </BtnWrap>
            </ProfileWrap>
          </>
        ) : (
          <ProfileWrap>
            {userInfo?.profileImg === null ? (
              <Profilepic>
                {' '}
                <img src={profilepic} alt="profileImage" />{' '}
              </Profilepic>
            ) : (
              <Profilepic>
                {' '}
                <img src={myData?.profileImg} alt="profileImage" />{' '}
              </Profilepic>
            )}
            <Profile>
              <h4>{userInfo?.nickname}</h4>
              <p>{userInfo?.username}</p>
              <Stacks>
                {userInfo?.stacks?.map((mystack, index) => {
                  return (
                    <MyStack key={index} style={{ marginTop: '10px' }}>
                      #{mystack}
                    </MyStack>
                  );
                })}
              </Stacks>
            </Profile>
            <BtnWrap>
              <EditBtn onClick={() => setIsEdit(true)}>프로필 편집</EditBtn>
            </BtnWrap>
          </ProfileWrap>
        )}
      </PostBody>

      {isMobile ? (
        <>
          <details ref={detailsRef}>
            <TabBox>
              {tabList[currentTab - 1].name} <MySelectArrow />
            </TabBox>

            <MySelectBoxOpen>
              {tabList.map((tab) => {
                return (
                  <MyOption
                    onClick={() => {
                      setTab(tab.id);
                      if (details) {
                        details.open = false;
                      }
                    }}
                    key={tab.id}
                    className={currentTab === tab.id ? 'focused' : null}
                  >
                    {tab.name}
                  </MyOption>
                );
              })}
            </MySelectBoxOpen>
          </details>{' '}
          <MyPageHr />
        </>
      ) : (
        <TabBody>
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
        </TabBody>
      )}

      <div>{tabList[currentTab - 1].content}</div>
    </WholeBody>
  );
};

export const WholeBody = styled.div`
  max-width: 996px;
  margin: 0px auto 200px auto;
  @media screen and (max-width: 996px) {
    margin: 24px 40px 100px;
  }
  @media screen and (max-width: 700px) {
    margin: 0px;
    width: 100%;
    margin: auto;
  }
  position: relative;
`;

const MyOption = styled(Option)`
  padding-top: 10px;
  padding-bottom: 10px;
  position: absolute;
  &.focused {
    display: none;
  }
`;
const TabBox = styled.summary`
  width: 90%;
  padding: 6px 24px;
  margin: 24px 0px;
  font-weight: bold;
  font-size: 1rem;
  position: relative;

  ::marker {
    font-size: 0;
  }

  ::-webkit-details-marker {
    display: none;
  }
`;

const AlertMessage = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.keyColor};

  &.error {
    color: ${(props) => props.theme.errorColor};
  }
`;

const BtnWrap = styled.div`
  display: flex;
  gap: 12px;
  span {
    color: ${(props) => props.theme.errorColor};
    font-size: 0.875rem;
  }
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const MySelectBoxOpen = styled(SelectBoxOpen)`
  position: absolute;
  min-width: 375px;
  margin-left: 15px;
  border: transparent;
`;

const MyPageHr = styled.hr`
  border: 1px solid #ffb673;
`;

const Leftarrow = styled(Arrow)`
  position: absolute;
  top: 0px;
  left: 27px;

  stroke: ${(props) => props.theme.toggleFontColor};
`;

export const Profilepic = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  overflow: hidden;
  text-align: center;

  img {
    align-self: center;
    display: block;
    margin: auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 750px) {
    width: 88px;
    height: 88px;
    border-radius: 44px;
  }
`;
const File = styled(Btn)`
  padding: 8px 10px;
  label {
    font-size: 0.75rem;
    cursor: pointer;
    color: ${(props) => props.theme.textColor_btn};
  }
  input[type='file'] {
    display: none;
  }
`;

export const Tab = styled.div`
  line-height: 48px;
  color: ${(props) => props.theme.keyColor};
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;

  &.focused {
    box-shadow: rgb(255 182 115 / 50%) 0px 2px 12px 0px;
    background-color: ${(props) => props.theme.keyColor};
    color: ${(props) => props.theme.textColor_btn};
  }
`;

export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

export const ModalContent = styled.div`
  word-break: keep-all;
  width: 350px;
  text-align: center;
  gap: 20px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  position: relative;
`;

const ProfilePicWrap = styled.div`
  gap: 18px;
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;

  @media screen and (max-width: 700px) {
    gap: 12px;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;

  h4 {
    margin-bottom: 15px;
  }

  input {
    margin-bottom: 15px;
    width: 200px;
    height: 37px;
    padding: 5px;
    border: ${(props) => props.theme.border};
    border-radius: 8px;
    background-color: ${(props) => props.theme.inputBoxBackground};
    :focus {
      outline: none;
    }
    font-size: 1rem;
  }

  p {
    margin-bottom: 10px;
    color: #777777;
  }

  details {
    margin: 5px 0;
  }

  @media screen and (max-width: 700px) {
    margin-left: 0px;
    input {
      text-align: center;
      margin: 15px auto;
    }
  }
`;

const MySelectArrow = styled(SelectArrow)`
  right: 0;
  margin-top: 0px;
  width: 12px;
  height: 12px;
  text-align: right;
  cursor: pointer;
`;

export const Stacks = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;

  @media screen and (max-width: 700px) {
    width: 300px;

    justify-content: center;
    text-align: center;
  }
`;

const EditBtn = styled(Btn)`
  background-color: ${(props) => props.theme.keyColor};
  padding: 8px 12px;
  margin-left: auto;
  position: absolute;
  right: 0;
  bottom: 0;

  @media screen and (max-width: 700px) {
    position: relative;
    width: 100%;
  }
`;

const ExitBtn = styled.div`
  color: ${(props) => props.theme.errorColor};
  font-size: 0.875rem;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
`;

export default MyPage;
