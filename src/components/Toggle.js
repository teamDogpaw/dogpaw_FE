import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { DarkThemeAtom } from "../atom/theme";

import darkMode from "../styles/icon/darkMode.svg";
import lightMode from "../styles/icon/lightMode.svg";



const Toggle = () =>{
    const [isDark, setIsDark] = useRecoilState(DarkThemeAtom);

    return (
        
        <Wrap>
             <ModeBtn onClick={() => setIsDark((prev) => !prev)} isDark={isDark}>
                {isDark? <span isDark={isDark}>라이트 모드</span> : <span>다크 모드</span>}
            <ModeCircle isDark={isDark} />
          </ModeBtn>
          <TopBtn onClick={()=>{window.scrollTo({top:0, left:0, behavior:"smooth"})}} >

          </TopBtn>
        </Wrap>
    )
}

const Wrap = styled.div`
display:flex;
position:fixed;
right: 20px;
bottom: 19px;

span {
    font-size:15px;
    font-weight:500;
    color: ${(props)=> props.theme.toggleFontColor};
}
`;
const ModeBtn = styled.button`
  background-color: ${(props) => props.theme.toggleBtnColor};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  width: 144px;
  height: 50px;
  border-radius: 100px;
  border: none;
  padding:15px 25px 15px 18px;
  margin-right:15px;

  position: relative;
  display: flex;
  justify-content: ${(props)=> (props.isDark ? "flex-start" : "flex-end")};
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const ModeCircle = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  background-image: url(${(props) => (props.isDark ? `${lightMode}` : `${darkMode}`)});

  background-repeat: no-repeat;
  background-size: cover;

  width: 56px;
  height: 40px;
  border-radius: 50px;
  position: absolute;
  left: 0%;
  top:4%;
  transition: all 0.4s ease-in-out;
  ${(props) =>
    props.isDark &&
    css`
      transform: translate(85px, 0);
      transition: all 0.4s ease-in-out;
    `}
`;

const TopBtn = styled.button`
width: 50px;
height:50px;
border-radius:50%;
border:none;
background-color:${(props)=> props.theme.toggleBtnColor};
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);



`;

export default Toggle;