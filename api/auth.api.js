import { apiClient } from "./client";

export const signup = async (email, password) => {
  const res = await apiClient.post("/auth/signup", {
    email,
    password,
  });

  return res.data;
};

export const login = async (email, password) => {
  const res = await apiClient.post("/auth/login", {
    email,
    password,
  });

  return res.data; // { token }
};

export const verifyEmail = async (token) => {
  const res = await apiClient.get(`/auth/verify-email?token=${token}`);
  return res.data;
};
