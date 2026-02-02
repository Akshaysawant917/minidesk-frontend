import { apiClient } from "./client";

/**
 * Dashboard summary
 * - today todos (count + preview)
 * - notes (count + latest)
 * - worklogs (count + latest)
 */
export const getDashboardSummary = async () => {
  const res = await apiClient.get("/dashboard/summary");
  return res.data;
};
