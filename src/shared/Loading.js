import styled from "styled-components";
import paw_loading from "../styles/icon/paw_loading.svg";

const Loading = () => {
  return (
    <Wrap>
      <img src={paw_loading} alt="" />
    </Wrap>
  );
};

const Wrap = styled.div`
height:100%;
width:100%;
background-color:#fff;
display:flex;
justify-content:center;
align-items:center;

`;

export default Loading;
