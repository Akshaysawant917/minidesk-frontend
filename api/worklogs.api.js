import { apiClient } from "./client";

export const getWorkLogs = async (cursor = null, limit = 10) => {
  const res = await apiClient.get("/worklogs", {
    params: {
      cursor,
      limit,
    },
  });

  return res.data; 
};

export const createWorkLog = async (content) => {
  const res = await apiClient.post("/worklogs", {
    content,
  });
  return res.data;
};

export const updateWorkLog = async (id, content) => {
  const res = await apiClient.patch(`/worklogs/${id}`, {
    content,
  });
  return res.data;
};
