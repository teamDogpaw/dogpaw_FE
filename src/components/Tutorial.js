import styled from "styled-components";
import arrowPost from "../styles/icon/tutorial/arrowPost.svg";
import arrowDeadline from "../styles/icon/tutorial/arrowDeadline.svg";
import arrowDetail from "../styles/icon/tutorial/arrowDetail.svg";
import arrowMode from "../styles/icon/tutorial/arrowMode.svg";

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
        <ArrowDeadline>
          <p>모집중인 게시글만 볼 수 있어요</p>
          <img src={arrowDeadline} alt="" />
        </ArrowDeadline>
        <ArrowDetail>
          <p>
            참여하고 싶으시다면 로그인하신 후 <br />
            자세한 내용을 확인하세요!
          </p>
          <img src={arrowDetail} alt="" />
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
  right: 30px;
  top: 5%;
`;

const ArrowDeadline = styled.div`
  position: absolute;
  top: 900px;
  left: 50px;
`;

const ArrowDetail = styled.div`
  position: absolute;
  top: 500px;
  left: 50%;
`;

const ArrowMode = styled.div`
  position: absolute;
  top: 760px;
  right: 40px;
`;

export default Tutoral;
