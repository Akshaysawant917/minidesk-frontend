import axios from "axios";

export const apiClient = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  //  baseURL: "http://localhost:4000/api",
  baseURL:"https://minidesk-backend-production.up.railway.app/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

/* Attach token to every request */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
