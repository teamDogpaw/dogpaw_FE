import React, { useEffect, useRef, useState } from "react";
import Bookmark from "../components/Bookmark";
import MyProject from "../components/MyProject";
import JoinProject from "../components/JoinProject";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Btn,
  GrayLineBtn,
  LineBtn,
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
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
import profilepic from "../styles/icon/global/profile.svg";
import ApplyProject from "../components/ApplyProject";
import pen from "../styles/icon/myPage/pen.svg";
import StackSelector from "../components/StackSeletor";
import { withDraw } from "../shared/userOauth";
import { SelectArrow } from "../components/WriteSelect";
import AlertModal from "../components/AlertModal";

const MyPage = () => {
  const userInfo = useRecoilValue(UserInfoAtom);
  const [isEdit, setIsEdit] = useState(false);
  const [currentTab, setTab] = useState(1);
  const [imagePreview, setImagePreview] = useState();
  const [isMobile, setIsMobile] = useState();
  const [myData, setMyData] = useState({
    profileImg: userInfo?.profileImg,
    nickname: userInfo?.nickname,
    stacks: userInfo?.stacks,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const detailsRef = useRef(null);
  const details = detailsRef.current;
  const navigate = useNavigate();

  const imageRef = useRef();

  const formData = new FormData();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const tabList = [
    { id: 1, name: "관심 프로젝트", content: <Bookmark currentTab={1} /> },
    { id: 2, name: "참여한 프로젝트", content: <JoinProject currentTab={2} /> },
    { id: 3, name: "신청한 프로젝트", content: <ApplyProject currentTab={3} /> },
    { id: 4, name: "내가 쓴 프로젝트", content: <MyProject currentTab={4} /> }
  ];

  useEffect(() => {
   
    setMyData(userInfo);
    setImagePreview(userInfo.profileImg);
    console.log(userInfo)
    console.log(myData)

    if(userInfo === undefined && !token ){
      setModalOpen(true);
    }

    //widthHandler
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
  }, [windowSize.width, userInfo]);

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

  if(userInfo === undefined && !token ){
    return (
      <AlertModal open={modalOpen}>
      <ModalContent>
        <h4>⚠️ 로그인이 필요한 서비스입니다</h4>
          <Btn onClick={()=>navigate("/", {state:"needLogin"})}> 메인으로 가기 </Btn>
      </ModalContent>
    </AlertModal>
    )
  }

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
          <>
         
          <div style={{display:"grid" , gridTemplateColumns:"0.1fr 0.9fr", gap:"24px"}}>
          
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
              <div>
                <input
                  defaultValue={userInfo?.nickname}
                  onChange={(event) => editNickname(event)}
                />
                <p>{userInfo.username}</p>
                <StackSelector data={myData} setMyData={setMyData} />
              </div>
            </form>
            <div>
              <DeleteBtn
                onClick={() => {
                  withDraw(userId, token);
                }}
              >
                회원 정보 삭제
              </DeleteBtn>
              <LineBtn onClick={imageReSet}>기본 이미지로 변경</LineBtn>
            </div>
           
          
          </div>
          <ButtnDiv>
            <Btn onClick={EditMyData}>편집 완료</Btn>
            </ButtnDiv>
          </>
        ) : (<>
          <div style={{display:"grid" , gridTemplateColumns:"0.1fr 0.9fr", gap:"24px"}}>
   
            {userInfo?.profileImg === null ? (
              <Profilepic src={profilepic} />
            ) : (
              <Profilepic src={myData?.profileImg} />
            )}
          <div style={{display:"flex", flexDirection:"column", justifyContent:"center", gap:"16px"}}>
          <h4>{myData?.nickname}</h4>
              <p>{myData?.username}</p>
    
          

     
<Stacks>
  {myData?.stacks?.map((mystack, index) => {
    return (
      <MyStack key={index} style={{ marginTop: "10px" }}>
        #{mystack}
      </MyStack>
    );
  })}
</Stacks>
</div>
              </div>
             
             <ButtnDiv>
             <Btn onClick={() => setIsEdit(true)}>프로필 편집</Btn>
             </ButtnDiv>
       </>
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
                      setTab(tab.id)
                      if (details) {
                        details.open = false;
                      }
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

const ButtnDiv = styled.div`
margin-top: 20px;
text-align: right;
`;

const Leftarrow = styled(Arrow)`
  position: absolute;
  top: 0px;
  left: 27px;
  stroke: ${(props) => props.theme.toggleFontColor};
`;

const MyOption = styled(Option)`
  padding-top: 10px;
  padding-bottom: 10px;

  &.focused{
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

const BtnWrap = styled.div`
  top: 0;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  text-align: right;
  gap: 10px;
  justify-content: flex-start;
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



export const Profilepic = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  position: relative;

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

`;

export const DeleteBtn = styled.div`
color:${(props)=>props.theme.errorColor};
margin-top: 0;
font-size: 0.875rem;
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
    font-size: 0.875rem;
    padding-bottom: 60px;
    flex-direction: column;
    margin-left: 0;
  }
`;

export const ModalContent =styled.div`
word-break: keep-all;
  width: 350px;
  text-align: center;
  gap: 20px;
  display: flex;
  flex-direction: column;
  padding:30px;
  position: relative;
`;

const ModalBtn = styled(Btn)`
position: absolute;
bottom: 10px;
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
