import React, { useEffect, useState } from "react";
import Login from "./Login";
import { ReactComponent as X } from "../styles/icon/modal/close.svg";
import { Modal, ModalBackground, ModalCloseButton } from "../styles/style";
import SocialModal from "./SocialModal";
import styled from "styled-components";

const ModalOpen = ({ viewModal, isKakao }) => {
  const [modalContent, setModalContent] = useState();

  useEffect(() => {
    if (!isKakao) {
      setModalContent(<Login setModalContent={setModalContent} />);
    } else if (isKakao) {
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
