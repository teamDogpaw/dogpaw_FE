import React, { useEffect, useRef, useState } from "react";
import Bookmark from "../components/Bookmark";
import MyProject from "../components/MyProject";
import JoinProject from "../components/JoinProject";
import { useNavigate } from "react-router-dom";
import {
  Btn,
  MyStack,
  Option,
  PostBody,
  SelectBox,
  SelectBoxOpen,
  TabBody,
} from "../styles/style";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../styles/icon/detail/backArrow.svg";

import {
  useMyProfileReset,
  useMyProfileEdit,
} from "../hook/useProfileMutation";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
import profilepic from "../styles/icon/global/profile.svg";
import ApplyProject from "../components/ApplyProject";
import pen from "../styles/icon/myPage/pen.svg";
import StackSelector from "../components/StackSeletor";
import { withDraw } from "../shared/userOauth";
import { SelectArrow } from "../components/WriteSelect";
import { LoginBtn } from "../components/Login";

const MyPage = () => {
  const userInfo = useRecoilValue(UserInfoAtom);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const imageRef = useRef();
  const [currentTab, setTab] = useState(1);
  const formData = new FormData();
  const [imagePreview, setImagePreview] = useState();
  const [isMobile, setIsMobile] = useState();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  const tabList = [
    { id: 1, name: "관심 프로젝트", content: <Bookmark currentTab={1} /> },
    { id: 2, name: "참여한 프로젝트", content: <JoinProject currentTab={2} /> },
    {
      id: 3,
      name: "신청한 프로젝트",
      content: <ApplyProject currentTab={3} />,
    },
    {
      id: 4,
      name: "내가 쓴 프로젝트",
      content: <MyProject currentTab={4} />,
    },
  ];

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    if (windowSize.width < 600) {
      setIsMobile(true);
    } else if (windowSize.width >= 600) {
      setIsMobile(false);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize.width]);

  const [myData, setMyData] = useState({
    profileImg: userInfo?.profileImg,
    nickname: userInfo?.nickname,
    stacks: userInfo?.stacks,
  });

  useEffect(() => {
    setMyData(userInfo);
    setImagePreview(userInfo.profileImg);
  }, [userInfo]);

  const EditMyData = async () => {
    const image = myData.profileImg;
    if (image === null) {
    } else if (typeof image === "string") {
    } else if (image !== null) {
      formData.append("image", image);
    }
    const data = {
      stacks: myData.stacks,
      nickname: myData.nickname,
    };
    const formdata = JSON.stringify(data);
    const blob = new Blob([formdata], { type: "application/json" });

    formData.append("body", blob);

    await profileEdit(formData);

    setIsEdit(false);
    navigate("/mypage");
  };

  const { mutateAsync: profileEdit } = useMyProfileEdit();
  const { mutateAsync: imageReSet } = useMyProfileReset();

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
    setMyData((prev) => ({ ...prev, nickname: newNickname }));
  };

  return (
    <WholeBody>
      {isMobile ? (
        <Leftarrow
          onClick={() => {
            navigate(-1);
          }}
        />
      ) : null}

      <PostBody>
        {isEdit ? (
          <ProfileWrap>
            {imagePreview === null ? (
              <Profilepic src={profilepic} />
            ) : (
              <Profilepic src={imagePreview} />
            )}
            <form>
              <File>
                <label htmlFor="profile">
                  <div>
                    <img src={pen} alt="" />
                  </div>
                </label>
                <input
                  id="profile"
                  type="file"
                  ref={imageRef}
                  accept="image/*"
                  onChange={(event) => editImg(event)}
                />
              </File>

              <Profile>
                <input
                  defaultValue={userInfo?.nickname}
                  onChange={(event) => editNickname(event)}
                />
                <p>{userInfo.username}</p>

                <StackSelector data={myData} setMyData={setMyData} />
              </Profile>
            </form>
            <BtnWrap>
              <Button3
                onClick={() => {
                  withDraw(userId, token);
                }}
              >
                회원 정보 삭제
              </Button3>

              <Button2 onClick={imageReSet}>기본 이미지로 변경</Button2>
            </BtnWrap>

            <Button onClick={EditMyData}>편집 완료</Button>
          </ProfileWrap>
        ) : (
          <ProfileWrap>
            {userInfo?.profileImg === null ? (
              <Profilepic src={profilepic} />
            ) : (
              <Profilepic src={myData?.profileImg} />
            )}
            <Profile>
              <h4>{userInfo?.nickname}</h4>
              <p>{userInfo?.username}</p>
              <Stacks>
                {userInfo?.stacks?.map((mystack, index) => {
                  return (
                    <MyStack key={index} style={{ marginTop: "10px" }}>
                      #{mystack}
                    </MyStack>
                  );
                })}
              </Stacks>
            </Profile>

            <Button onClick={() => setIsEdit(true)}>프로필 편집</Button>
          </ProfileWrap>
        )}
      </PostBody>

      {isMobile ? (
        <>
          <details>
            <TabBox>
              {tabList[currentTab - 1].name} <MySelectArrow />
            </TabBox>

            <MySelectBoxOpen>
              {tabList.map((tab) => {
                return (
                  <MyOption
                    onClick={() => {
                      setTab(tab.id);
                    }}
                    key={tab.id}
                    className={currentTab === tab.id ? "focused" : null}
                  >
                    {tab.name}
                  </MyOption>
                );
              })}
            </MySelectBoxOpen>
          </details>{" "}
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
                  className={currentTab === tab.id ? "focused" : null}
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
const MyOption = styled(Option)`
  padding-top: 10px;
  padding-bottom: 10px;
`;
const TabBox = styled.summary`
  width: 90%;
  padding: 6px 24px;
  margin: 24px 0px;
  font-weight: bold;
  font-size: 16px;
  position: relative;

  ::marker {
    font-size: 0;
  }

  ::-webkit-details-marker {
    display: none;
  }
`;

const BtnWrap = styled.div`
  top: 0;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  text-align: right;
  gap: 10px;
  span {
    color: ${(props) => props.theme.errorColor};
    font-size: 14px;
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

export const Profilepic = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 80px;

  @media screen and (max-width: 600px) {
    width: 72px;
    height: 72px;
    border-radius: 36px;
  }
`;
const File = styled.div`
  div {
    position: absolute;
    bottom: 10px;
    left: 115px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.keyColor};

    @media screen and (max-width: 600px) {
      left: 45px;
      top: 95px;
    }
  }

  label {
    cursor: pointer;
  }
  input[type="file"] {
    display: none;
  }
`;
export const WholeBody = styled.div`
  max-width: 996px;
  margin: 0px auto 200px auto;
  @media screen and (max-width: 996px) {
    margin: 24px 40px 100px;
  }
  @media screen and (max-width: 600px) {
    margin: 0px;
    width: 100%;
    margin: auto;
  }
  position: relative;
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
  align-items: center;
  position: relative;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin-top: 20px;
    font-size: 14px;
    padding-bottom: 60px;
  }
`;

export const Profile = styled.div`
  margin-left: 50px;
  //width: 100px;

  p {
    color: #777777;
    margin-top: 8px;
  }

  input {
    width: 200px;
    height: 37px;
    padding: 5px 10px;
    border: ${(props) => props.theme.border};
    border-radius: 8px;
    font-size: 16px;
    background-color: ${(props) => props.theme.inputBoxBackground};
  }

  details {
    margin: 5px 0;
  }

  @media screen and (max-width: 600px) {
    margin-left: 16px;
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
  flex-wrap: nowrap;
`;

const Button = styled(Btn)`
  position: absolute;
  right: 0;
  bottom: 0;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Button2 = styled(Btn)`
  margin-bottom: 30px;
`;

const Button3 = styled(Btn)``;

export default MyPage;
