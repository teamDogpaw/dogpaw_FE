import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import SocialModal from "../components/SocialModal";

const KakaoLoginRedirect = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const handleOpen = () => setModalIsOpen(true);

  /*   useEffect(() => {
    // 토큰 get
    const accessToken = new URL(window.location.href).searchParams.get(
      "Authorization"
    );
    console.log(accessToken);
    localStorage.setItem("token", accessToken);

    //id get
    const username = new URL(window.location.href).searchParams.get("username");
    console.log(username);
    localStorage.setItem("username", username);

    //닉네임 get
    const nickname = new URL(window.location.href).searchParams.get("nickname");
    const decodeName = decodeURI(decodeURIComponent(nickname));
    console.log(decodeName, "닉네임");
    localStorage.setItem("nickname", decodeName);

    //profile 이미지 get
    const profileImage = new URL(window.location.href).searchParams.get(
      "profile"
    );
    console.log(profileImage);
    const decodeProfileImage = decodeURI(decodeURIComponent(profileImage));
    console.log(decodeProfileImage, "profile");
    localStorage.setItem("profileImage", decodeProfileImage);

    //메인으로 보내기
    window.location.replace("/");
  }, []); */
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    console.log(code);

    //window.location.replace("/");
  }, []);

  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    handleOpen();
    console.log(modalIsOpen);
  }, []);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgb(0,0,0,0.3)",
          },
          content: {
            color: "orange",
          },
        }}
      >
        <SocialModal element={code} />
        <div>
          <button onClick={() => setModalIsOpen(false)}>닫기</button>
        </div>
      </Modal>
    </>
  );
};

export default KakaoLoginRedirect;
