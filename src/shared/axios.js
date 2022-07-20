import axios from "axios";
const token = localStorage.getItem("token");

export const instance = axios.create({
  baseURL: "https://my1stdomain.shop",
  headers: token ? {Authorization: `Bearer ${token}`} : {}
});

export default instance;
