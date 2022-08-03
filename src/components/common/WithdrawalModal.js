import styled, { css, keyframes } from 'styled-components';
import { Btn, GrayLineBtn } from '../../styles/style';
import { Content } from '../ApplyBtn';

const WithdrawModal = (props) => {
  const { open, explusionMate, closeModal, team, myPostId } = props;

  return (
    <Wrap open={open}>
      {open && (
        <Section>
          <Content>
            <h4>{team.nickname}님을 팀에서 탈퇴시키겠습니까?</h4>
            <span>되돌릴수 없으니 신중히 선택해주세요.</span>
            <div>
              <GrayLineBtn onClick={closeModal}> 취소 </GrayLineBtn>
              <Btn
                onClick={() => {
                  explusionMate({
                    userId: team.userId,
                    postId: myPostId,
                  });
                }}
              >
                확인
              </Btn>
            </div>
          </Content>
        </Section>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  ${(props) =>
    props.open &&
    css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 99;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;

      animation: ${ModalBgShow} 0.3s;
    `}
`;

const ModalShow = keyframes`
 from {
    opacity: 0;
    margin-bottom: -50px;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
`;

const ModalBgShow = keyframes`
 from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }

`;

const Section = styled.section`
  height: 200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: ${(props) => props.theme.backgroundColor};
  animation: ${ModalShow} 0.3s;
  overflow: hidden;
`;

export default WithdrawModal;
