import styled from 'styled-components';
import arrowPost from '../../styles/icon/tutorial/arrowPost.svg';
import arrowDeadline from '../../styles/icon/tutorial/arrowDeadline.svg';
import arrowDetail from '../../styles/icon/tutorial/arrowDetail.svg';
import arrowAlert from '../../styles/icon/tutorial/arrowAlert.svg';
import { ReactComponent as Pen } from '../../styles/icon/detail/edit.svg';
import { ReactComponent as Bell } from '../../styles/icon/header/bell.svg';

const Tutoral = () => {
  const isLogin = localStorage.getItem('token');

  return (
    <Wrap>
      <Content>
        {!isLogin && (
          <>
            <Info>
              <p>로그인 시 이용 가능해요!</p>
            </Info>

            <IsLogin>
              <Write>
                <Pen />
                <p>게시글 작성</p>
              </Write>
              <Alert>
                <Bell />
              </Alert>
            </IsLogin>
          </>
        )}

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
    </Wrap>
  );
};

const Wrap = styled.div`
  position: fixed;
  //width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.65);

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

const Info = styled.div`
  position: absolute;
  top: 30px;
  right: 300px;
`;

const IsLogin = styled.div`
  position: absolute;
  top: 15px;
  right: 90px;
  border: 3px dotted #fff6c6;
  border-radius: 8px;
  padding: 10px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Write = styled.div`
  display: flex;
  align-items: center;
  /* position: absolute;
  right: 190px;
  top: 90px; */
  stroke: ${(props) => props.theme.textColor};
  p {
    color: ${(props) => props.theme.textColor};
  }
`;
const Alert = styled.div`
  /* position: absolute;
  right: 100px;
  top: 90px; */
  stroke: ${(props) => props.theme.textColor};
`;

const ArrowPost = styled.div`
  position: absolute;
  right: 220px;
  top: 30px;

  p {
    position: absolute;
    width: 300px;
    top: 100px;
    right: 30%;
  }
`;
const ArrowAlert = styled.div`
  position: absolute;
  right: -10px;
  top: 55px;
`;

const ArrowDeadline = styled.div`
  position: absolute;
  top: 998px;
  left: 50px;

  p {
    position: absolute;
    width: 300px;
    top: 0px;
    left: 110%;
  }
`;

const ArrowDetail = styled.div`
  position: absolute;
  top: 550px;
  left: 5%;

  p {
    position: absolute;
    width: 300px;
    top: 55px;
    left: 100%;
  }
`;

export default Tutoral;
