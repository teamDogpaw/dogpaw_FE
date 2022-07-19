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

import Login from "./Login";
import Register from "./Register";
import { useRecoilValue, useRecoilState } from "recoil";
import { ReactComponent as X } from "../styles/icon/modal/close.svg";

import { modalChange } from "../atom/atom";
//import cancle from "../assets/취소 버튼.png";
import cancel from "../styles/icon/modal/close.svg";
import { Background, Modal, CloseButton} from "../components/ViewApply"

const ModalOpen = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const onModal = useRecoilValue(modalChange);
  const onModal = useState(<Login/>)

  return (

     
      <Background>
            <Modal>
                <CloseButton >
                    <X style={{ right: "0" }} />
                </CloseButton>
              
            </Modal>
        </Background>

  );
};

export default ModalOpen;
