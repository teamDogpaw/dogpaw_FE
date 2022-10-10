import axios from "axios";

const token = localStorage.getItem("token");

const baseURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({ baseURL });

const setToken = (config) => {
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};

if (token) {
  instance.interceptors.request.use(setToken);
}

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    
    const { response, config } = error;
    const originalRequest = config;
    if (response.status === 403 || response.status === 401) {
      let refreshToken = localStorage.getItem("retoken");
      let accessToken = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      const tokens = {
        refreshToken,
        accessToken,
        userId,
      };
      if (refreshToken) {
        const { data } = await checkToken(tokens);
        const access = data.data.accessToken;
        const refresh = data.data.refreshToken;
        localStorage.setItem("token", access);
        localStorage.setItem("retoken", refresh);
        window.location.reload();
      }
      return axios(originalRequest);
    }
    if (response.status === 404){
      return (window.location.replace("/notfound"))
    }
    if (response.status === 504 ){
      return (window.location.replace("/connectfail"))
    }
    if (response.status === 400){
      return response
    }
    return Promise.reject(error);
  }
);

const checkToken = async ({ accessToken, refreshToken, userId }) => {
  const response = await axios.post(`${baseURL}/user/reissue`, {
    accessToken,
    refreshToken,
    userId,
  });
  return response;
};

export default instance;
