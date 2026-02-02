import { apiClient } from "./client";

export const getActiveTodos = async () => {
  const res = await apiClient.get("/todos");
  return res.data;
};

export const getCompletedTodos = async (cursor, limit = 10) => {
  const params = new URLSearchParams();
  if (cursor) params.append("cursor", cursor);
  params.append("limit", limit);

  const res = await apiClient.get(`/todos/completed?${params.toString()}`);
  return res.data;
};

export const createTodo = async (content, status) => {
  const res = await apiClient.post("/todos", {
    content,
    status,
  });
  return res.data;
};

export const moveTodo = async (id, status) => {
  const res = await apiClient.patch(`/todos/${id}`, {
    status,
  });
  return res.data;
};

export const toggleTodoDone = async (id, completed) => {
  const res = await apiClient.patch(`/todos/${id}`, {
    completed,
  });
  return res.data;
};
