import styled from "styled-components";
import arrowPost from "../styles/icon/tutorial/arrowPost.svg";
import arrowDeadline from "../styles/icon/tutorial/arrowDeadline.svg";
import arrowDetail from "../styles/icon/tutorial/arrowDetail.svg";
import arrowMode from "../styles/icon/tutorial/arrowMode.svg";
import arrowAlert from "../styles/icon/tutorial/arrowAlert.svg";
const Tutoral = () => {
  return (
    <Wrap>
      <Content>
        <ArrowPost>
          <img src={arrowPost} alt="" />
          <p>
            좋은 아이디어가 있으시다면
            <br />
            사람들을 모아보세요!
          </p>
        </ArrowPost>
        <ArrowAlert>
          <img src={arrowAlert} alt="" />
          <p>
            댓글이나 지원 등의 알림을
            <br />
            확인하실 수 있어요!
          </p>
        </ArrowAlert>
        <ArrowDeadline>
          <p>모집중인 게시글만 볼 수 있어요!</p>
          <img src={arrowDeadline} alt="" />
        </ArrowDeadline>
        <ArrowDetail>
        <img src={arrowDetail} alt="" />
          <p>
            많은 사람들의 관심을 받은 게시글들을 <br />
            모아볼 수 있어요!
          </p>
          
        </ArrowDetail>
      </Content>
      {/* <ArrowMode>
        <p>
          밝은 테마 / 어두운 테마로 <br />
          바꿔보세요!
        </p>
        <br/>
        <img src={arrowMode} alt="" />
      </ArrowMode> */}
    </Wrap>
  );
};

const Wrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;

  p {
    color: #fff6c6;
    font-weight: 500;
    line-height: 24px;
  }
`;

const Content = styled.div`
  position: relative;
  width: 1200px;
  height: 100%;
  margin: auto;
`;

const ArrowPost = styled.div`
  position: absolute;
  right: 200px;
  top: 3%;

  p {
    position:absolute;
    width:300px;
    top:100px;
    right:20%;
  }
`;const ArrowAlert = styled.div`
position: absolute;
right: -10px;
top: 5%;

/* p {
  position:absolute;
  width:300px;
  top:100px;
  right:20%;
} */
`;

const ArrowDeadline = styled.div`
  position: absolute;
  top: 940px;
  left: 40px;

  p {
    position:absolute;
    width:300px;
    top:0px;
    left:110%;
  }
`;

const ArrowDetail = styled.div`
  position: absolute;
  top: 480px;
  left: 5%;

  p {
    position:absolute;
    width:300px;
    top:55px;
    left:100%;
  }
`;

const ArrowMode = styled.div`
  position: absolute;
  top: 760px;
  right: 40px;
`;

export default Tutoral;
