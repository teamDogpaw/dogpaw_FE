import instance from "./axios";
import Login from "../components/Login";
import { useRecoilValue } from "recoil";

let debounce = null;

// 로그인
export const login = (props) => {
  if (debounce) {
    clearTimeout(debounce);
  }

  debounce = setTimeout(() => {
    instance
      .post("/user/login", props)
      .then((res) => {
        //console.log(res);
        const accessToken = res.data.data.token.accessToken;
        const refreshToken = res.data.data.token.refreshToken;
        const id = res.data.data.userId;
        if (accessToken !== null) {
          localStorage.setItem("token", accessToken);
          localStorage.setItem("retoken", refreshToken);
          localStorage.setItem("id", id);
          window.alert("로그인 성공 :)");
          window.location.replace("/");
        }
      })
      .catch((err) => {
        //console.log(err);
        window.alert("로그인 실패 :(");
      });
  }, 500);
};

// 회원가입
export const register = (data) => {
  if (debounce) {
    clearTimeout(debounce);
  }

  debounce = setTimeout(async () => {
    await instance
      .post("/user/signup", data)
      .then((res) => {
        window.alert("회원 가입 성공 :)");
        window.location.replace("/");
      })
      .catch((err) => {
        window.alert("회원 가입 실패 :(");
      });
  }, 500);
};

// 닉네임 중복 확인
export const nickCheck = (props) => {
  if (debounce) {
    clearTimeout(debounce);
  }
  debounce = setTimeout(async () => {
    await instance
      .post("/user/nickname", props)
      .then((res) => {
        window.alert("중복되지 않은 닉네임입니다. :)");
      })
      .catch((err) => {
        window.alert("중복된 닉네임입니다. :(");
      });
  }, 500);
};

//회원 탈퇴 기능.
export const withDraw = () => {
  if (debounce) {
    clearTimeout(debounce);
  }
  debounce = setTimeout(async () => {
    await instance
      .put(`/user/delete`)
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("retoken");
        localStorage.removeItem("id");
        localStorage.removeItem("socialNick");
        window.alert("성공적으로 회원 정보를 삭제하였습니다. :)");
        window.location.replace("/");
      })
      .catch((err) => window.alert("다시한번 회원탈퇴를 눌러주세요. :("));
  });
};
