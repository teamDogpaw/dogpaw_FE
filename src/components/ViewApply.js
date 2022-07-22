import { useState } from "react";
import styled from "styled-components";
import { Tab, TabBody } from "../pages/Mypage";
import { GrayLineBtn, LineBtn, Modal, ModalBackground, ModalCloseButton } from "../styles/style";
import ApplyList from "./ApplyList";
import ParticipantList from "./ParticipantList";
import { ReactComponent as X } from "../styles/icon/modal/close.svg";

const ViewApply = ({
    viewApplyModal,
    myPostData,
    currentTab,
    setViewApply
}) => {
console.log(currentTab)
    console.log(myPostData)


const [isApplyList, setIsApplyList] = useState(false);
    
return (
        <ModalBackground>
            <Modal>
                <ModalCloseButton onClick={viewApplyModal}>
                    <X style={{ right: "0" }} />
                </ModalCloseButton>
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
                     팀원 목록 {myPostData.currentMember} 
                     </Tab>
                     <Tab className={isApplyList ? "focused" : null}
                     onClick={()=>setIsApplyList(true)}>
                     신청자 목록
                     </Tab>
                     </ModalTabBody>
                    
                     }
                   
              


                <ModalContent>
                {isApplyList ?  <ApplyList myPostId={myPostData.postId}/> : 
                <ParticipantList 
                myPostId={myPostData.postId} 
                currentTab={currentTab}
                setViewApply={setViewApply}
                />}

                </ModalContent>
                
            
                
            </Modal>
        </ModalBackground>

    )
}



const ModalTabBody = styled(TabBody)`
grid-template-columns: repeat(2,1fr);
margin: 16px 0px 20px;
background: ${(props)=>props.theme.divBackGroundColor};

&.participant{
    grid-template-columns: 1fr;
}
`;

const ModalContent = styled.div`
overflow-y: auto;
`;
export default ViewApply;