"use client";

import { useEffect, useState, useRef } from "react";
import {
  getWorkLogs,
  createWorkLog,
  updateWorkLog,
} from "@/api/worklogs.api";
import WorkLogsHeader from "@/components/worklogs/WorkLogsHeader";
import WorkLogEditor from "@/components/worklogs/WorkLogEditor";
import WorkLogEmptyState from "@/components/worklogs/WorkLogEmptyState";
import WorkLogPastList from "@/components/worklogs/WorkLogPastList";

export default function WorkLogsPage() {
  const [logs, setLogs] = useState([]);
  const [content, setContent] = useState("");
  const [todayLogId, setTodayLogId] = useState(null);

  const textareaRef = useRef(null);

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

  /* ---------- Editor Helpers (bullet list behavior) ---------- */

  const renderLogContent = (text) => {
    if (!text) return null;
    const lines = text.split(/\r?\n/).map((l) => l.trim());
    const hasBullets = lines.some((l) => l.startsWith("-"));

    if (hasBullets) {
      return (
        <ul className="list-disc pl-5 space-y-1">
          {lines
            .filter((l) => l.length > 0)
            .map((l, i) => (
              <li key={i} className="text-app/80">
                {l.replace(/^-+\s*/, "")}
              </li>
            ))}
        </ul>
      );
    }

    return (
      <p className="text-app/80 leading-relaxed whitespace-pre-wrap break-words">
        {text}
      </p>
    );
  };

  const handleEditorFocus = (e) => {
    // ensure initial bullet exists when editor is empty
    if (!content || !content.replace(/[\-\s\r\n]+/g, "").trim()) {
      setContent("- ");

      // place caret at end after React updates
      setTimeout(() => {
        const el = textareaRef.current || (e && e.target);
        if (el) {
          el.focus();
          const pos = el.value.length;
          el.selectionStart = el.selectionEnd = pos;
        }
      }, 0);
    }
  };

  const handleEditorKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const el = textareaRef.current || e.target;
      const start = el.selectionStart;
      const end = el.selectionEnd;

      const insert = "\n- ";
      const newValue = content.slice(0, start) + insert + content.slice(end);
      setContent(newValue);

      // move caret after the inserted bullet
      setTimeout(() => {
        try {
          const target = textareaRef.current || el;
          target.selectionStart = target.selectionEnd = start + insert.length;
          target.focus();
        } catch (err) {}
      }, 0);
    }
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
        setContent("- ");
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
    // don't save if there's no meaningful text (only bullets/spaces)
    if (!content.replace(/[-\s\r\n]+/g, "").trim()) return;

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
      <WorkLogsHeader totalDays={totalDays} />

      <WorkLogEditor
        content={content}
        setContent={setContent}
        handleEditorKeyDown={handleEditorKeyDown}
        handleEditorFocus={handleEditorFocus}
        textareaRef={textareaRef}
        handleSave={handleSave}
        saving={saving}
        todayLogId={todayLogId}
        error={error}
      />

      {pastLogs.length === 0 ? (
        <WorkLogEmptyState />
      ) : (
        <WorkLogPastList
          pastLogs={pastLogs}
          renderLogContent={renderLogContent}
          formatDate={formatDate}
          getDayOfWeek={getDayOfWeek}
          getDateNumber={getDateNumber}
          hasMore={hasMore}
          loadingMore={loadingMore}
          loadMoreLogs={loadMoreLogs}
        />
      )}
    </div>
  );
}