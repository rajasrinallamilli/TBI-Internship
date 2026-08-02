import axios from "axios";

// Centralized Axios instance for communicating with the backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "const API = import.meta.env.VITE_API_URL;/api",
});

// Request interceptor to automatically attach the JWT bearer token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
