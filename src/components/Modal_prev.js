/* import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";

const ModalOpen = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        로그인
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalOpen; */

import React, { useEffect, useState } from "react";

import Login from "./Login";
import Register from "./Register";
import { useRecoilValue, useRecoilState } from "recoil";
import { ReactComponent as X } from "../styles/icon/modal/close.svg";

import { modalChange } from "../atom/atom";
//import cancle from "../assets/취소 버튼.png";
import cancel from "../styles/icon/modal/close.svg";
import {  CloseButton} from "../components/ViewApply"
import { Modal, ModalBackground, ModalCloseButton } from "../styles/style";

const ModalOpen = () => {
  // const onModal = useRecoilValue(modalChange);
  const onModal = useState(<Login/>)
  const [isModalOpen , setIsModalOpen]= useState(false)
  const viewModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`
  return () => {
    const scrollY = document.body.style.top
    document.body.style.cssText = `position: ""; top: "";`
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }
}, [])

  return (

     
      <ModalBackground>
            <Modal>
                <ModalCloseButton >
                    <X onClick={viewModal} style={{ right: "0" }} />
                </ModalCloseButton>
              
            </Modal>
        </ModalBackground>

  );
};


export default ModalOpen;
