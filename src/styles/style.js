import styled, { createGlobalStyle } from "styled-components";
import { ReactComponent as X } from "../styles/icon/modal/close.svg";

//전역 스타일링
export const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  height: 100%;
  line-height: 1;
  background-color: ${(props) => props.theme.backgroundColor} ;
  font-size: 16px;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
  color:${(props) => props.theme.textColor};
  

}

h1{
  color:${(props) => props.theme.textColor};

  font-size: 40px;
  font-weight: bold;
}

h3{
  color:${(props) => props.theme.textColor};

  font-size: 24px;
  font-weight: bold;
}

h4{
  color:${(props) => props.theme.textColor};

 font-size : 20px;
 font-weight: bold;
}
`;

export const MainBody = styled.div`
background-color: ${(props) => props.theme.divBackGroundColor};
max-width: 996px;
margin: auto;
border-radius: 16px;
padding: 32px;

@media screen and (max-width: 996px){
  margin: 0px 40px;
}
`;

export const Btn = styled.button`
background-color: ${(props) => props.theme.keyColor};
border-radius: 8px;
padding: 12px 16px;
border: 0px transparent;
color: ${(props) => props.theme.textColor_btn};
word-break: keep-all;
font-weight: bold;
:hover {
   background-color: #FF891C;
}
:active{
   background-color: #D26500;
}
`;

export const LineBtn = styled.button`
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.keyColor};
  color: ${(props) => props.theme.keyColor};
  padding: 12px 16px;
  border-radius: 8px;
  :hover {
    background-color: ${(props) => props.theme.keyColor};
    color: white;
  }
  :active {
    background-color: #d26500;
  }
`;

export const GrayLineBtn = styled(LineBtn)`
  border: 1px solid #777777;
  color: #777777;
`;

export const ListProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const ListTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

export const ListStack = styled.span`
  color: ${(props) => props.theme.keyColor};
  margin-right: 10px;
`;

export const MyStack = styled.div`
background-color: ${(props) => props.theme.stackBackground};
padding: 8px 12px;
border-radius: 30px;
margin-right: 16px;
color: ${(props) => props.theme.stackColor};
`;

export const SelectTitle = styled.div`
display: flex;
align-items: center;
`;

export const Option = styled.li`
  cursor: pointer;
  padding: 8px 12px;

  :hover {
    background-color: ${(props) => props.theme.keyColor};
    color: ${(props) => props.theme.stackColor};
  }


`;


export const SelectBox = styled.summary`
line-height: 25px;
width: 200px;
height: 37px;
padding: 5px 10px;
border: ${(props) => props.theme.border};
border-radius: 8px;
font-size: 16px;
background-color: ${(props) => props.theme.inputBoxBackground};
list-style: none;

&.Login{
  line-height: normal;
  font-size: 0.875rem;
  line-height: auto;
  color:#9f9f9f;
  width: 100%;
  height: 44px;
  background-color: #fff;
  border: 2px solid #eee;
  border-radius: 12px;
  padding: 12px;

  :focus{
    outline: none;
  }
  @media screen and (max-width:600px){
  width: 100%;
    }

  @media screen and (max-width:375px){
  width: 100%;
    }
}
`;

export const SelectBoxOpen = styled.ul`
max-height: 200px;
z-index: 10;
border-radius: 8px;
position: absolute;
width: 200px;
border: ${(props) => props.theme.border};
background-color: ${(props) => props.theme.inputBoxBackground};
box-shadow: 0px 4px 4px 0px rgb(0,0,0,0.1);
overflow: scroll;
margin-top: 4px;

&.Login{
  width: 384px;
  border: 2px solid #eee;
  border-radius: 12px;

  :focus{
    outline: none;
  }
  @media screen and (max-width:600px){
    width: 100%;
    }

  @media screen and (max-width:375px){
  width: 100%;
    }
}
`;


export const ModalRegisterBtn = styled.span`
  color: #9f9f9f;
  &:hover {
    font-weight: bold;
    color: #5b5b5b;
    cursor: pointer;
  }
`;

export const PostBody = styled.div`
background-color: ${(props) => props.theme.divBackGroundColor};
border: transparent;
padding: 24px;
border-radius:16px;
box-shadow: ${(props)=> props.theme.boxShadow};
`;

export const MypagePostBox = styled.div`
display: flex;
flex-direction: column;
gap: 24px;
`;

export const Modal = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 50%;
    margin-top: 133px;
    transform: translate(-50%, 0%);

    border-radius: 8px;
    background: ${(props)=>props.theme.divBackGroundColor};
    box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
    padding: 30px;

    @media screen and (max-width:600px){
        width: 100%;
        height: 100%;
        padding: 24px;
        margin-top: 0px;
        border-radius: 0px;
    }

    @media screen and (max-width:375px){
    padding: 24px;
    }

`;

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.3);
    z-index: 90;
`;

export const ModalCloseButton = styled(X)`
margin-left: auto;
width: 20px;
height: 20px;
cursor: pointer;
fill: ${(props)=>props.theme.keyColor};
`;

export const TabBody = styled.div`
background-color: ${(props) => props.theme.backgroundColor};
display: grid;
grid-template-columns: repeat(4,1fr);
text-align: center;
margin: 24px auto;
gap: 16px;
`;