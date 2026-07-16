import { apiClient } from "./client";

export const saveCommand = async (command) => {
  const res = await apiClient.post("/commands", { command });
  return res.data;
};

export const getCommands = async (params = {}) => {
  const qs = new URLSearchParams();
  if (params.limit) qs.append("limit", params.limit);
  if (params.cursor) qs.append("cursor", params.cursor);

  const res = await apiClient.get(`/commands?${qs.toString()}`);
  return res.data;
};

export const deleteCommand = async (id) => {
  const res = await apiClient.delete(`/commands/${id}`);
  return res.data;
};
