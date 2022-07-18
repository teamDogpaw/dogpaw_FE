import axios from "axios";
const token = localStorage.getItem("token");

export const instance = axios.create({
  baseURL: "http://3.35.22.190",
  headers: token ? {Authorization: `Bearer ${token}`} : {}
});

instance.interceptors.response.use(
  (response) => {
    return response;
  })

export default instance;
