import axios from "axios";
const token = localStorage.getItem("token");

const baseURL = process.env.REACT_APP_BASE_URL

const instance = axios.create({
  baseURL: baseURL,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

instance.interceptors.response.use((response) => {
  return response;
});

export default instance;