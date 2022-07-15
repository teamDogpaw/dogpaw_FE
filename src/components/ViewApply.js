import styled from "styled-components";
import { ReactComponent as X } from "../styles/icon/modal/close.svg";
import { GrayLineBtn, LineBtn } from "../styles/style";
import ApplyList from "./ApplyList";

const ViewApply = ({
    viewApplyModal,
    myPostId
}) => {
console.log(myPostId)
    return (
        <Background>
            <Modal>
                <CloseButton onClick={viewApplyModal}>
                    <X style={{ right: "0" }} />
                </CloseButton>
                <ApplyList myPostId={myPostId}/>
            </Modal>
        </Background>

    )
}
const CloseButton = styled.div`
margin-left: auto;
`;

const Modal = styled.div`
display: flex;
flex-direction: column;
  position: absolute;
  left: 50%;
    margin-top: 133px;
    margin-left: -243px;
    width: 486px;
    height: 742px;
    border-radius: 8px;
    background: white;
    box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
    padding: 30px;
`;

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.3);
    z-index: 0;
`;
export default ViewApply;