import { apiClient } from "./client";

export const getTodos = async () => {
  const res = await apiClient.get("/todos");
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
