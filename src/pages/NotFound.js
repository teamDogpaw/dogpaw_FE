import { ReactComponent as NotFound } from "../styles/images/404.svg"
import styled from "styled-components";

const NotFoundPage = () => {
    return (
        <ErrorPageWrap>
            404 : Not Found<br />
            존재하지 않는 페이지를 찾으셨어요!
            <NotFoundImg />
        </ErrorPageWrap>
        );
}

export const ErrorPageWrap = styled.div`
font-family: 'GongGothicBold';
line-height: 30px;
text-align: center;
margin-top: 100px;
color:${(props) => props.theme.keyColor};
display: flex;
flex-direction: column;
gap: 50px;
font-size: 1.25rem;
`;

export const NotFoundImg = styled(NotFound)`
width: 50%;
height: 50%;
margin: auto;
text-align: center;
justify-content: center;
align-items: center;
display: flex;
`;

export default NotFoundPage;