import { apiClient } from "./client";

export const getBookmarks = async () => {
  const res = await apiClient.get("/bookmarks");
  return res.data;
};

export const createBookmark = async (title, url) => {
  const res = await apiClient.post("/bookmarks", {
    title,
    url,
  });
  return res.data;
};

export const deleteBookmark = async (id) => {
  const res = await apiClient.delete(`/bookmarks/${id}`);
  return res.data;
};
