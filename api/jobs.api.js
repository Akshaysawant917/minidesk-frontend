import { apiClient } from "./client";

export const createJob = async (job) => {
  const res = await apiClient.post("/jobs", job);
  return res.data;
};

export const getJobs = async (params = {}) => {
  const qs = new URLSearchParams();
  if (params.limit) qs.append("limit", params.limit);
  if (params.cursor) qs.append("cursor", params.cursor);
  if (params.status) qs.append("status", params.status);
  if (params.location) qs.append("location", params.location);
  if (params.source) qs.append("source", params.source);
  if (params.search) qs.append("search", params.search);

  const res = await apiClient.get(`/jobs?${qs.toString()}`);
  return res.data;
};

export const updateJob = async (id, updates) => {
  const res = await apiClient.patch(`/jobs/${id}`, updates);
  return res.data;
};

export const deleteJob = async (id) => {
  const res = await apiClient.delete(`/jobs/${id}`);
  return res.data;
};
