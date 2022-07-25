import MyProject from "../components/MyProject";
import JoinProject from "../components/JoinProject";
import { MyStack, PostBody, TabBody } from "../styles/style";
import { Profile, Profilepic, ProfileWrap, Stacks, Tab, WholeBody } from "./Mypage";
import { useRecoilValue } from "recoil";
import { UserInfoAtom } from "../atom/atom";
import profilepic from "../styles/icon/global/profile.svg";
import { useState } from "react";
import styled from "styled-components";
import { useGetOtherData } from "../hook/usdOtherData";
import { useParams } from "react-router-dom";
import OtherProjects from "../components/OtherProjects";
import { EmptyBody, EmptyImg } from "../components/ApplyList";


const UserPage = () => {
    const params = useParams();
    const othernickname = params.userNickname
    const {data:othersPage, isLoading:isLoadingOtherPage} = useGetOtherData(othernickname)
    const [currentTab, setTab] = useState(1);
    
    const tabList = [
       {id: 1,
          name: "참여한 프로젝트",
          content: <JoinProject currentTab={1} />,
        },
        {
          id: 2,
          name: "작성한 프로젝트",
          content: <OtherProjects currentTab={2} />,
        },
      ];
      const userInfo = useRecoilValue(UserInfoAtom);

      if(isLoadingOtherPage){
        return(
            <EmptyBody>
            <EmptyImg />
          </EmptyBody>
        )
      }
    return (<>
     <WholeBody>
     <PostBody>

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
                className={currentTab === tab.id ? "focused" : null}
              >
                {tab.name}
              </Tab>
            </>
          );
        })}
      </UserTabBody>
      <div>{tabList[currentTab - 1].content}</div>
     </WholeBody>

    </>)
}

const UserTabBody = styled(TabBody)`
grid-template-columns: repeat(2, 1fr);
`;

export default UserPage;