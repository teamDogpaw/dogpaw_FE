import axios from "axios";
const token = localStorage.getItem("token");

const baseURL = process.env.REACT_APP_BASE_URL

const instance = axios.create({baseURL});

const setToken = (config) => {
    config.headers['Authorization'] = `Bearer ${token}`
    return config;
}

if(token){
    instance.interceptors.request.use(setToken);
}

instance.interceptors.response.use((response) => {
  return response;
});

export default instance;