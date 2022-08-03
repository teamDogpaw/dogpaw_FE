import React, { useEffect } from 'react';
import Login from '../sign/Login';
import { ReactComponent as X } from '../../styles/icon/modal/close.svg';
import { Modal, ModalBackground, ModalCloseButton } from '../../styles/style';
import SocialModal from './SocialModal';
import { useRecoilState } from 'recoil';
import { modalContentAtom } from '../../atom/atom';

const ModalOpen = ({ viewModal, kakaoNick }) => {
  const [modalContent, setModalContent] = useRecoilState(modalContentAtom);

  let intFrameHeight = window.innerHeight;

  useEffect(() => {
    setModalContent(<Login />);
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;

    if (kakaoNick) {
      setModalContent(<SocialModal />);
    }

    const scrollY = document.body.style.top;
    window.scrollTo(0, parseInt(scrollY || '0') * -1);

    return () => {
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);

  return (
    <ModalBackground>
      <Modal className={intFrameHeight < 812 ? 'smallHeight' : null}>
        {kakaoNick ? null : (
          <ModalCloseButton onClick={viewModal}>
            <X />
          </ModalCloseButton>
        )}

        {modalContent}
      </Modal>
    </ModalBackground>
  );
};

export default ModalOpen;
