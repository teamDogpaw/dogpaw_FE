import styled, { css, keyframes } from "styled-components";

const AlertModal = (props) => {
  const { open } = props;
  return (
    <Wrap open={open}>
      {open && (
        <Section>
          <main>{props.children}</main>
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
      background-color: rgba(0, 0, 0, 0.6);
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
  width: 100%;
  max-width: 550px;
  height:400px;
  margin: 0 auto;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius: 0.3rem;
  background-color: #fff;
  animation: ${ModalShow} 0.3s;
  overflow: hidden;
`;

const Footer = styled.footer`
  padding: 12px 0px;

  button {
    padding: 6px 12px;
  color: #fff;
  background-color: #6c757d;
  border-radius: 5px;
  font-size: 13px;
  }
`;

export default AlertModal;
