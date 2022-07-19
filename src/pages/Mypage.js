import React, { useEffect, useRef, useState } from "react";
import Bookmark from "../components/Bookmark";
import MyProject from "../components/MyProject";
import JoinProject from "../components/JoinProject";
import { useNavigate } from "react-router-dom";
import { Btn, MyStack, Option, SelectBoxOpen, PostBody } from "../styles/style";
import styled from "styled-components";
import {
  useMyProfileReset,
  useMyProfileEdit,
} from "../hook/useProfileMutation";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
import profilepic from "../styles/icon/global/profile.svg";
import { SelectBox } from "../components/WriteSelect";
import { ReactComponent as StackDelete } from "../styles/icon/stackSelect/stackDelete.svg";
import ApplyProject from "../components/ApplyProject";
import pen from "../styles/icon/myPage/pen.svg";

const MyPage = () => {
  const userInfo = useRecoilValue(UserInfoAtom);
  console.log(userInfo);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const stackdetailsRef = useRef(null);
  const imageRef = useRef();
  const [currentTab, setTab] = useState(1);
  const formData = new FormData();

  const tabList = [
    {
      id: 1,
      name: "관심 프로젝트",
      content: <Bookmark currentTab={1} />,
    },
    {
      id: 2,
      name: "참여한 프로젝트",
      content: <JoinProject currentTab={2} />,
    },
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

  const [myData, setMyData] = useState({
    profileImg: userInfo.profileImg,
    nickname: userInfo.nickname,
    stacks: userInfo.stacks,
  });

  useEffect(() => {
    setMyData(userInfo);
  }, [userInfo]);

  //⚠️ 프로필 이미지 넣지 않으면 편집 완료 못함
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

  //✅
  // const basic = async () => {
  //    try {
  //       await instance.put(`/api/user/profile/basic`)
  //    } catch (error) {
  //       alert(error)
  //    }
  // }

  const { mutate: profileEdit } = useMyProfileEdit();
  const { mutate: imageReSet } = useMyProfileReset();

  const addStack = (newStack) => {
    if (myData.stacks === undefined) {
      setMyData({ stacks: [newStack] });
      console.log(myData.stacks);
    } else if (!myData.stacks.includes(newStack)) {
      setMyData((prev) => ({ ...prev, stacks: [...myData.stacks, newStack] }));
    } else {
      return null;
    }
    const details = stackdetailsRef.current;
    if (details) {
      details.open = false;
    }
  };

  const preview = new FileReader();

  const editImg = (e) => {
    const img = e.target.files[0];
    console.log(img);
    setMyData((prev) => ({ ...prev, profileImg: img }));
  };

  const editNickname = (e) => {
    const newNickname = e.target.value;
    setMyData((prev) => ({ ...prev, nickname: newNickname }));
  };

  const removeStack = (selectedStack) => {
    const newStacks = myData.stacks.filter((stack) => stack !== selectedStack);
    setMyData((prev) => ({ ...prev, stacks: newStacks }));
  };

  return (
    <WholeBody>
      <PostBody>
        {isEdit ? (
          <ProfileWrap>
            {myData?.profileImg === null ? (
              <Profilepic src={profilepic} />
            ) : (
              <Profilepic src={myData?.profileImg} />
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
                <details style={{ height: "40px" }} ref={stackdetailsRef}>
                  <SelectBox>스택을 선택해주세요.</SelectBox>
                  <SelectBoxOpen>
                    <Option onClick={() => addStack("Java")}>Java</Option>
                    <Option onClick={() => addStack("Javascript")}>
                      Javascript
                    </Option>
                    <Option onClick={() => addStack("TypeScript")}>
                      TypeScript
                    </Option>
                    <Option onClick={() => addStack("React")}>React</Option>
                    <Option onClick={() => addStack("Vue")}>Vue</Option>
                  </SelectBoxOpen>
                </details>

                <Stacks>
                  {myData.stacks?.map((stack, index) => {
                    return (
                      <MyStack
                        style={{
                          margin: "0px 10px 10px 0px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        key={index}
                      >
                        #{stack}
                        <StackDelete
                          onClick={() => {
                            removeStack(stack);
                          }}
                        />
                      </MyStack>
                    );
                  })}
                </Stacks>
              </Profile>
            </form>
            <Button2 onClick={imageReSet}>기본 이미지로 변경</Button2>
            <Button onClick={EditMyData}>편집 완료</Button>
          </ProfileWrap>
        ) : (
          <ProfileWrap>
            {userInfo?.profileImg === null ? (
              <Profilepic src={profilepic} />
            ) : (
              <Profilepic src={userInfo?.profileImg} />
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
      <div>{tabList[currentTab - 1].content}</div>
    </WholeBody>
  );
};

const Profilepic = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 80px;
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
  }

  label {
    cursor: pointer;
  }
  input[type="file"] {
    display: none;
  }
`;
const WholeBody = styled.div`
  max-width: 996px;
  margin: 0px auto 200px auto;
  @media screen and (max-width: 996px) {
    margin: 24px 40px 100px;
  }
`;

export const Tab = styled.div`
  line-height: 48px;
  color: ${(props) => props.theme.keyColor};
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;

  &.focused {
   box-shadow: rgb(255 182 115 / 50%) 0px 2px 12px 0px ;
   background-color: ${(props) => props.theme.keyColor};
   color: ${(props)=>props.theme.textColor_btn}
  }
`;

export const TabBody = styled.div`
background-color: ${(props) => props.theme.backgroundColor};
display: grid;
grid-template-columns: repeat(4,1fr);
text-align: center;
margin: 24px auto;
gap: 16px;
`;

const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Profile = styled.div`
  margin-left: 50px;

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
  }

  details {
    margin: 5px 0;
  }
`;

const Stacks = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 370px;
`;

const Button = styled(Btn)`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const Button2 = styled(Button)`
  right: 100px;
`;

export default MyPage;
