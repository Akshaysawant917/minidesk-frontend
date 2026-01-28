"use client";

import { useEffect, useState } from "react";
import {
  getWorkLogs,
  createWorkLog,
  updateWorkLog,
} from "@/api/worklogs.api";

export default function WorkLogsPage() {
  const [logs, setLogs] = useState([]);
  const [content, setContent] = useState("");
  const [todayLogId, setTodayLogId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isToday = (date) => {
    const d = new Date(date);
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const loadLogs = async () => {
    try {
      const data = await getWorkLogs();
      setLogs(data);

      const todayLog = data.find((log) => isToday(log.date));
      if (todayLog) {
        setTodayLogId(todayLog.id);
        setContent(todayLog.content);
      } else {
        setTodayLogId(null);
        setContent("");
      }
    } catch {
      setError("Failed to load work logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleSave = async () => {
    if (!content.trim()) return;

    setSaving(true);
    setError("");

    try {
      if (todayLogId) {
        await updateWorkLog(todayLogId, content);
      } else {
        await createWorkLog(content);
      }
      await loadLogs();
    } catch (err) {
      if (err?.response?.status === 409) {
        setError("Today’s work log already exists.");
      } else {
        setError("Failed to save work log");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading work logs…</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Work Logs
      </h2>

      {/* Today editor */}
      <div className="mb-6">
        <textarea
          placeholder="What did you work on today?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full border border-[var(--border)] rounded p-2 text-sm"
        />

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-2 bg-[var(--primary)] text-white px-3 py-1 rounded text-sm disabled:opacity-60"
        >
          {saving
            ? "Saving…"
            : todayLogId
            ? "Update today’s log"
            : "Save today’s log"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500 mb-4">
          {error}
        </p>
      )}

      {/* Past logs */}
      <ul className="space-y-4">
        {logs
          .filter((log) => !isToday(log.date))
          .map((log) => (
            <li
              key={log.id}
              className="border border-[var(--border)] rounded p-3"
            >
              <p className="text-sm text-gray-500 mb-1">
                {new Date(log.date).toDateString()}
              </p>

              <p className="text-sm">
                {log.content}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}
