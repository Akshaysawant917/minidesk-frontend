import { apiClient } from "./client";

export const testHealth = async () => {
  const res = await apiClient.get("/health");
  return res.data;
};
