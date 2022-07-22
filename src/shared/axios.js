import axios from "axios";
const token = localStorage.getItem("token");

export const instance = axios.create({
  baseURL: "https://dogflow.dasole.shop/",
  headers: token ? {Authorization: `Bearer ${token}`} : {}
});

export default instance;
