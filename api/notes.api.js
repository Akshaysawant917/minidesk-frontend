import { apiClient } from "./client";

export const getNotes = async () => {
  const res = await apiClient.get("/notes");
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
