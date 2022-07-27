import { ErrorPageWrap, NotFoundImg } from "./NotFound"
import {ReactComponent as ConnectFailed} from "../styles/images/504.svg"
import styled from "styled-components";

const ConnectFailedPage = () => {
    return (
        <ErrorPageWrap>
        504 : Connect Failed <br/>
        서버와의 연결이 끊어졌어요! <br/>
        잠시만 기다려주세요
        <ConnectedFailedImg />
    </ErrorPageWrap>
    )
}


export const ConnectedFailedImg = styled(ConnectFailed)`
width: 50%;
height: 50%;
margin: auto;
text-align: center;
justify-content: center;
align-items: center;
display: flex;
`;



export default ConnectFailedPage;