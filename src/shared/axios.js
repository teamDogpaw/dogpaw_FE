import axios from "axios";

export const instance = axios.create({
  baseURL: "http://3.35.22.190"
});


const token = localStorage.getItem("token");

instance.defaults.headers.common["Authorization"] = token? `Bearer ${token}` : null;


export default instance;