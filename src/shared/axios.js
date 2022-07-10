import axios from "axios";

const ADDR = "http://3.35.22.190";

export const instance = axios.create({
  baseURL: ADDR,
  headers: localStorage.getItem("token")
    ? {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    : {},
});

/* export const instance = axios.create({
  baseURL: "http://13.125.213.81"
});

const token = localStorage.getItem("token");

instance.defaults.headers.common["Authorization"] = token? `Bearer ${token}` : null;
*/

export default instance;
