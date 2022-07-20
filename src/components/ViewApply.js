import { useState } from "react";
import styled from "styled-components";
import { Tab, TabBody } from "../pages/Mypage";
import { ReactComponent as X } from "../styles/icon/modal/close.svg";
import { GrayLineBtn, LineBtn } from "../styles/style";
import ApplyList from "./ApplyList";
import ParticipantList from "./ParticipantList";

const ViewApply = ({
    viewApplyModal,
    myPostData,
    currentTab
}) => {
console.log(currentTab)
    console.log(myPostData)


const [isApplyList, setIsApplyList] = useState(false);
    
return (
        <Background>
            <Modal>
                <CloseButton onClick={viewApplyModal}>
                    <X style={{ right: "0" }} />
                </CloseButton>
                <h1>{myPostData.title} </h1>
             
                    {currentTab === 2 ?
                       <ModalTabBody className="participant">
                    <Tab className="focused"
                    onClick={()=>setIsApplyList(false)}>
                    팀원 목록
                    </Tab>
                    </ModalTabBody>
                     : 
                     <ModalTabBody>
                      <Tab className={isApplyList ? null : "focused"}
                     onClick={()=>setIsApplyList(false)}>
                     팀원 목록
                     </Tab>
                     <Tab className={isApplyList ? "focused" : null}
                     onClick={()=>setIsApplyList(true)}>
                     신청자 목록
                     </Tab>
                     </ModalTabBody>
                    
                     }
                   
              


                <ModalContent>
                {isApplyList ?  <ApplyList myPostId={myPostData.postId}/> : <ParticipantList myPostId={myPostData.postId} currentTab={currentTab}/>}

                </ModalContent>
               
                
            </Modal>
        </Background>

    )
}
export const CloseButton = styled(X)`
margin-left: auto;
width: 20px;
height: 20px;
cursor: pointer;
fill: ${(props)=>props.theme.keyColor};
`;

export const Modal = styled.div`
display: flex;
flex-direction: column;
  position: absolute;
  left: 50%;
    margin-top: 133px;
    margin-left: -243px;
    width: 486px;
    height: 742px;
    border-radius: 8px;
    background: ${(props)=>props.theme.divBackGroundColor};
    box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
    padding: 30px;

`;


export const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.3);
    z-index: 0;
`;

const ModalTabBody = styled(TabBody)`
grid-template-columns: repeat(2,1fr);
margin: 16px 0px 20px;
background: ${(props)=>props.theme.divBackGroundColor};

&.participant{
    grid-template-columns: 1fr;
}
`;

const ModalContent = styled.div`
overflow: scroll;
`;
export default ViewApply;