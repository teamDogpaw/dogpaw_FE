import axios from "axios";
const token = localStorage.getItem("token");
let debounce = null;

export const instance = axios.create({
  baseURL: "http://3.35.22.190",
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

instance.interceptors.response.use((response) => {
  return response;
});

// 로그인 정보를 보내면 토큰을 받음.
export const login = (props) => {
  if (debounce) {
    clearTimeout(debounce);
  }

  debounce = setTimeout(() => {
    axios
      .post("http://3.35.22.190/user/login", props)
      .then((res) => {
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
        window.alert("로그인 실패 :(");
      });
  }, 500);
};

// 회원가입 정보
export const register = (props) => {
  if (debounce) {
    clearTimeout(debounce);
  }

  debounce = setTimeout(async () => {
    await axios
      .post("http://3.35.22.190/user/signup", props)
      .then((res) => {
        window.alert("회원 가입 성공 :)");
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
    await axios
      .post("http://3.35.22.190/user/nickname", props)
      .then((res) => window.alert("중복되지 않은 닉네임입니다. :)"))
      .catch((err) => {
        window.alert("중복된 닉네임입니다. :(");
      });
  }, 500);
};

export default instance;
