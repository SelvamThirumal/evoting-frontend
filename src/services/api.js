import axios from "axios";

// ================= AXIOS INSTANCE =================
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,   // for cookies / auth
  timeout: 10000           // prevent hanging requests
});


// ================= REQUEST INTERCEPTOR =================
API.interceptors.request.use(
  (req) => {

    // Attach JWT token if available
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);


// ================= RESPONSE INTERCEPTOR =================
// Auto logout if token expired / invalid
API.interceptors.response.use(
  (res) => res,
  (err) => {

    if (err.response?.status === 401) {

      console.log("Session expired");

      localStorage.removeItem("token");

      // Redirect to login page
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);


// ================= EXPORT =================
export default API;