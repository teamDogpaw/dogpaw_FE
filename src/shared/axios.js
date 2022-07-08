import axios from "axios";

export const instance = axios.create({
  baseURL: "http://13.125.213.81"
});

const token = localStorage.getItem("token");

instance.defaults.headers.common["Authorization"] = token? `Bearer ${token}` : null;


export default instance;