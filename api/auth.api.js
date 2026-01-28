import { apiClient } from "./client";

export const signup = async (username, password) => {
  const res = await apiClient.post("/auth/signup", {
    username,
    password,
  });

  return res.data;
};

export const login = async (username, password) => {
  const res = await apiClient.post("/auth/login", {
    username,
    password,
  });

  return res.data; // { token }
};
