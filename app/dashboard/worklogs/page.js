"use client";

import { useEffect, useState } from "react";
import {
  getWorkLogs,
  createWorkLog,
  updateWorkLog,
} from "@/api/worklogs.api";

import {
  Calendar,
  Clock,
  Save,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Edit3,
} from "lucide-react";

export default function WorkLogsPage() {
  const [logs, setLogs] = useState([]);
  const [content, setContent] = useState("");
  const [todayLogId, setTodayLogId] = useState(null);

  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /* ---------- Utils ---------- */

  const isToday = (date) => {
    const d = new Date(date);
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (isToday(dateStr)) {
      return "Today";
    } else if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  const getDayOfWeek = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDateNumber = (dateStr) => {
    return new Date(dateStr).getDate();
  };

  /* ---------- Initial Load ---------- */

  const loadLogs = async () => {
    try {
      const data = await getWorkLogs();
      const items = data.items || [];

      setLogs(items);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);

      // detect today's log from first page
      const todayLog = items.find((log) => isToday(log.date));
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

  /* ---------- Load More ---------- */

  const loadMoreLogs = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);

    try {
      const data = await getWorkLogs(cursor);
      setLogs((prev) => [...prev, ...(data.items || [])]);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch {
      setError("Failed to load more work logs");
    } finally {
      setLoadingMore(false);
    }
  };

  /* ---------- Save Today Log ---------- */

  const handleSave = async () => {
    if (!content.trim()) return;

    setSaving(true);
    setError("");

    try {
      let updated;

      if (todayLogId) {
        updated = await updateWorkLog(todayLogId, content);
      } else {
        updated = await createWorkLog(content);
      }

      // Optimistic update for today log
      setLogs((prev) => {
        const others = prev.filter((l) => !isToday(l.date));
        return [updated, ...others];
      });

      setTodayLogId(updated.id);
    } catch (err) {
      if (err?.response?.status === 409) {
        setError("Today's work log already exists.");
      } else {
        setError("Failed to save work log");
      }
    } finally {
      setSaving(false);
    }
  };

  /* ---------- Render ---------- */

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-app/60">Loading your work logs...</p>
        </div>
      </div>
    );
  }

  const pastLogs = logs.filter((log) => !isToday(log.date));
  const totalDays = logs.length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">Work Logs</h2>
          <p className="text-app/60">One reflection per day. Keep it simple.</p>
        </div>

        {/* Stats */}
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{totalDays}</div>
          <div className="text-xs text-app/50">Days Logged</div>
        </div>
      </div>

      {/* Today's Log Editor */}
      <div className="bg-gradient-to-br from-primary/5 to-transparent p-6 rounded-xl border-2 border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex flex-col items-center justify-center text-secondary">
            <span className="text-xs font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
            <span className="text-lg font-bold">
              {new Date().getDate()}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              Today's Work Log
              {todayLogId && (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              )}
            </h3>
            <p className="text-sm text-app/60">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric',
                year: 'numeric' 
              })}
            </p>
          </div>
          {content.trim() && (
            <Sparkles className="w-5 h-5 text-primary/50" />
          )}
        </div>

        <textarea
          placeholder="What did you work on today? What went well? What could be better?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full bg-app border border-app rounded-lg p-4 text-app placeholder:text-app/40 focus:outline-none focus:border-primary transition-colors resize-none"
          autoFocus
        />

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handleSave}
            disabled={saving || !content.trim()}
            className="flex items-center gap-2 bg-primary text-secondary px-6 py-2.5 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : todayLogId ? "Update Today's Log" : "Save Today's Log"}
          </button>

          <div className="text-xs text-app/40">
            {content.length} characters
          </div>

          {todayLogId && (
            <div className="ml-auto flex items-center gap-2 text-sm text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved</span>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
      </div>

      {/* Past Logs */}
      {pastLogs.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-app/30" />
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">No past logs yet</h3>
          <p className="text-app/50 mb-6">Start building your work history by logging today</p>
          <div className="inline-flex items-center gap-2 text-sm text-primary">
            <Clock className="w-4 h-4" />
            <span>Your journey begins now</span>
          </div>
        </div>
      ) : (
        <>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-app/60" />
              <h3 className="text-xl font-semibold text-primary">Past Logs</h3>
              <span className="text-sm text-app/50">({pastLogs.length} days)</span>
            </div>

            <div className="space-y-3">
              {pastLogs.map((log) => (
                <div
                  key={log.id}
                  className="group bg-app border border-app rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Date Badge */}
                    <div className="flex-shrink-0 w-14 h-14 bg-secondary rounded-lg flex flex-col items-center justify-center border border-app group-hover:border-primary/30 transition-colors">
                      <span className="text-xs font-medium text-app/60">
                        {getDayOfWeek(log.date)}
                      </span>
                      <span className="text-xl font-bold text-primary">
                        {getDateNumber(log.date)}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-primary">
                          {formatDate(log.date)}
                        </h4>
                        <span className="text-xs text-app/40">
                          {new Date(log.date).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-app/80 leading-relaxed whitespace-pre-wrap break-words">
                        {log.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <button
                onClick={loadMoreLogs}
                disabled={loadingMore}
                className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-app border border-app rounded-lg text-app/80 hover:text-primary font-medium transition-all disabled:opacity-50"
              >
                {loadingMore ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>Load More Logs</span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}