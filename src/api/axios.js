import axios from "axios";

const API = axios.create({
  baseURL: "https://eventuna.onrender.com/api",
});

// Attach token from localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
