import React, { useEffect, useState } from "react";
import Login from "./Login";
import { ReactComponent as X } from "../styles/icon/modal/close.svg";
import { Modal, ModalBackground, ModalCloseButton } from "../styles/style";
import SocialModal from "./SocialModal";
import styled from "styled-components";

const ModalOpen = ({ viewModal, kakaoNick }) => {
  const [modalContent, setModalContent] = useState();

  useEffect(() => {
    if (!kakaoNick) {
      setModalContent(<Login setModalContent={setModalContent} />);
    } else if (kakaoNick) {
      setModalContent(<SocialModal />);
    }
    const scrollY = document.body.style.top;
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
    return () => {
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);

  return (
    <ModalBackground>
      <Modal>
        <ModalCloseButton onClick={viewModal}>
          <X />
        </ModalCloseButton>

        {modalContent}
      </Modal>
    </ModalBackground>
  );
};

export default ModalOpen;
