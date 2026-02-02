import { apiClient } from "./client";

export const getNotes = async (cursor, limit = 10) => {
  const params = new URLSearchParams();
  if (cursor) params.append("cursor", cursor);
  params.append("limit", limit);

  const res = await apiClient.get(`/notes?${params.toString()}`);
  return res.data;
};

export const createNote = async (title, content) => {
  const res = await apiClient.post("/notes", {
    title,
    content,
  });
  return res.data;
};

export const updateNote = async (id, title, content) => {
  const res = await apiClient.patch(`/notes/${id}`, {
    title,
    content,
  });
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await apiClient.delete(`/notes/${id}`);
  return res.data;
};
