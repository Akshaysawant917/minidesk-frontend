import axios from "axios";

export const TOKEN_COOKIE_NAME = "token";

export const setTokenCookie = (token) => {
  if (typeof document === "undefined") return;

  const isSecure = window.location.protocol === "https:";
  const maxAge = 60 * 60 * 24 * 30;

  document.cookie = `${TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; sameSite=Lax${isSecure ? "; Secure" : ""}`;
};

export const getTokenFromCookie = () => {
  if (typeof document === "undefined") return null;

  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${TOKEN_COOKIE_NAME}=`));

  if (!cookieValue) return null;

  return decodeURIComponent(cookieValue.split("=")[1]);
};

export const removeTokenCookie = () => {
  if (typeof document === "undefined") return;

  document.cookie = `${TOKEN_COOKIE_NAME}=; path=/; max-age=0; sameSite=Lax`;
};

export const apiClient = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // baseURL: "http://localhost:4000/api",
  baseURL: "https://getminidesk.com/api",
  // baseURL: "/api",
  // baseURL: "https://minidesk-backend-production.up.railway.app/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getTokenFromCookie();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
