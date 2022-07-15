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

import React, { useState } from "react";
import Modal from "react-modal";
import Login from "./Login";
import Register from "./Register";
import { useRecoilValue, useRecoilState } from "recoil";

import { modalChange } from "../atom/atom";
//import cancle from "../assets/취소 버튼.png";
import cancel from "../styles/icon/modal/close.svg";

Modal.setAppElement("#root");
const ModalOpen = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const onModal = useRecoilValue(modalChange);

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>로그인</button>
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            top: "0%",
            left: "0%",
            right: "0%",
            bottom: "0%",
            backgroundColor: "rgb(0,0,0,0.3)",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "588px",
            minHeight: "545px",
            maxHeight: "785px",
            height: "100%",
            borderRadius: "16px",
            padding: "0",
          },
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {onModal}
        </div>
        <div style={{ marginLeft: "540px" }}>
          {/* <img
            src={cancle}
            alt=""
            style={{ width: "24px", height: "2px" }}
            onClick={() => setModalIsOpen(false)}
          /> */}
        </div>
      </Modal>
    </div>
  );
};

export default ModalOpen;
