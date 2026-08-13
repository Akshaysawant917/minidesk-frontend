import { apiClient } from "./client";

export const getFolders = async () => {
  const res = await apiClient.get("/folders");
  return res.data;
};

export const createFolder = async (name) => {
  const res = await apiClient.post("/folders", { name });
  return res.data;
};

export const getFolderNotes = async (folderId, cursor = null, limit = 10) => {
  const params = new URLSearchParams();
  if (cursor) params.append("cursor", cursor);
  params.append("limit", String(limit));

  const res = await apiClient.get(`/folders/${folderId}/notes?${params.toString()}`);
  return res.data;
};
