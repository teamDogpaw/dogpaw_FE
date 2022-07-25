import React, { useEffect, useState } from "react";
import Login from "./Login";
import { ReactComponent as X } from "../styles/icon/modal/close.svg";
import { Modal, ModalBackground, ModalCloseButton } from "../styles/style";
import SocialModal from "./SocialModal";

const ModalOpen = ({ 
  viewModal,
  isKakao,
  searchParams
 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /*  const viewModal = () => {
    setIsModalOpen((prev) => !prev);
  }; */

  const [modalContent, setModalContent] = useState();

  useEffect(() => {
    if(!isKakao){
      setModalContent(<Login setModalContent={setModalContent} />);
    } else if (isKakao){
      setModalContent(<SocialModal /> )
      
    }
  document.body.style.cssText = `position: fixed; top: 0px`;
    return () => {
      const scrollY = document.body.style.top;
      // document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);

  return (
    <ModalBackground>
      <Modal>
        <ModalCloseButton onClick={viewModal}>
          <X style={{ right: "0" }} />
        </ModalCloseButton>
        {modalContent}
      </Modal>
    </ModalBackground>
  );
};

export default ModalOpen;
