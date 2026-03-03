import axios from "axios";

// ================= BASE URL AUTO SWITCH =================
const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : import.meta.env.VITE_API_URL;

// ================= AXIOS INSTANCE =================
const API = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000
});

// ================= REQUEST INTERCEPTOR =================
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default API;