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

export const getDashboardCharts = async (range = "7d") => {
  const res = await apiClient.get("/dashboard/charts", {
    params: { range },
  });

  return res.data;
};
