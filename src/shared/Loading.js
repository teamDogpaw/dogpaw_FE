import styled from "styled-components";
import paw from "../styles/icon/detail/paw.svg"

const Loading = () => {
  return (
    <Wrap>
      <img src={paw} alt="" />
    </Wrap>
  );
};

const Wrap = styled.div`
height:100vh;
width:100%;
background-color:${(props)=>props.theme.backgroundColor};
display:flex;
justify-content:center;
align-items:center;

img{
  width:50%;
}

`;

export default Loading;
