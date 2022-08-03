import styled, { css, keyframes } from 'styled-components';
import { Btn, GrayLineBtn, ModalBtn } from '../../styles/style';
import { Content } from '../ApplyBtn';

const AlertModal = ({
  open,
  message,
  setAlertModalOpen,
  actionMessage,
  action,
}) => {
  ////console.log(props)
  // const { open } = props;
  // console.log(props)
  return (
    <Wrap open={open}>
      {open && (
        <Section>
          <Content>
            {message}
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
              {!actionMessage ? (
                <ModalBtn onClick={setAlertModalOpen}>확인</ModalBtn>
              ) : (
                <>
                  <GrayLineBtn onClick={setAlertModalOpen}>취소</GrayLineBtn>
                  <ModalBtn onClick={action}>{actionMessage}</ModalBtn>
                </>
              )}
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
      ''animation: ${ModalBgShow} 0.3s;
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

export const Section = styled.section`
  height: 200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.backgroundColor};
  animation: ${ModalShow} 0.3s;
  overflow: hidden;
`;
export default AlertModal;
