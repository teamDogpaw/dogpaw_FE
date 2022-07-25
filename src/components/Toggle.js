import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { DarkThemeAtom } from "../atom/theme";
import arrowtopLight from "../styles/icon/toggle/arrowUpLight.svg";
import arrowtop from "../styles/icon/toggle/scrollToTop.svg";
import moon from "../styles/icon/toggle/moon.svg";
import sun from "../styles/icon/toggle/sun.svg";

const Toggle = () => {
  const [isDark, setIsDark] = useRecoilState(DarkThemeAtom);

  return (
    <Wrap>
      <ModeBtn onClick={() => setIsDark((prev) => !prev)} isDark={isDark}>
        <Web>
          {isDark ? (
            <span>라이트 모드로 보기</span>
          ) : (
            <span>다크 모드로 보기</span>
          )}
        </Web>
        <Mobile>
            <div>
              <img src={moon} alt="" />
              <img src={sun} alt="" />
            </div>
        </Mobile>
        <ModeCircle isDark={isDark} />
      </ModeBtn>
      <TopBtn
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        {isDark ? (
          <img src={arrowtop} alt="" />
        ) : (
          <img src={arrowtopLight} alt="" />
        )}
      </TopBtn>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  position: fixed;
  right: 25px;
  bottom: 19px;
  span {
    font-size: 15px;
    font-weight: 500;
    color: ${(props) => props.theme.toggleFontColor};
  }
`;

const Web = styled.div`
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 786px) {
    display: none;
  }
`;

const Mobile = styled.div`
  width: 100%;
  div {
    display: flex;
    justify-content: space-between;
  }

  @media screen and (min-width: 785px) {
    display: none;
  }
`;

const ModeBtn = styled.div`
  background-color: ${(props) => props.theme.toggleBtnColor};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  //width: 134px;
  height: 50px;
  border-radius: 100px;
  border: none;
  margin-right: 15px;
  padding: 15px 15px 15px 55px;
  position: relative;
  display: flex;
  align-items: center;

  @media screen and (max-width: 786px) {
    width: 90px;
    padding: 10px 12px;
  }
`;

const ModeCircle = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: center;
  align-items: center;
  background-color: ${(props) => (props.isDark ? "#FFB673" : "#777777")};
  background-image: url(${(props) => (props.isDark ? `${sun}` : `${moon}`)});
  background-repeat: no-repeat;
  background-position: center;

  width: 40px;
  height: 40px;
  border-radius: 50px;
  position: absolute;
  left: 5%;

  @media screen and (max-width: 787px) {
    transition: all 0.2s ease-in-out;
    ${(props) =>
      props.isDark &&
      css`
        transform: translate(100%, 0);
        transition: all 0.2s ease-in-out;
      `}
  }
`;

const TopBtn = styled.button`
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.toggleBtnColor};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
`;

export default Toggle;
