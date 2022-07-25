import styled, { keyframes } from "styled-components";
import paw_loading from "../styles/icon/global/pawLoading.svg";

const Loading = () => {
  return (
    <Wrap>
      <Paw>
        <img src={paw_loading} alt="" />
        <p>loading...</p>
      </Paw>
    </Wrap>
  );
};

const bounce = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }


`;
const Wrap = styled.div`
  height: 900px;
  width: 100%;
  background-color: ${(props) => props.theme.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width:786px){
    width:100%;
    height:100%;
  }
 
`;

const Paw = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
width:500px;
height:500px;


 img {
    width:100%;
    animation: ${bounce} 0.6s ease-in-out infinite;
  }

  p {
    font-family: "GongGothicBold";
    font-size: 35px;
    color: #ffb673;
    margin-top:50px;
  }

  @media screen and (max-width:786px){
    width:30%;
    p {
      font-size:25px;
      margin-top:20px;
  }
}
`;



export default Loading;
