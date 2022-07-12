import React, { useEffect } from "react";

const KakaoLoginRedirect = () => {
  useEffect(() => {
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
  }, []);
  return <></>;
};

export default KakaoLoginRedirect;
