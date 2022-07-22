import axios from "axios";
const token = localStorage.getItem("token");

const baseURL = process.env.REACT_APP_BASE_URL

const instance = axios.create({baseURL});

if(token){
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

instance.interceptors.response.use((response) => {
  return response;
});

export default instance;