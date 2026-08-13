"use client";

import { useEffect, useState } from "react";
import {
  getActiveTodos,
  getCompletedTodos,
  createTodo,
  moveTodo,
  toggleTodoDone,
} from "@/api/todos.api";
import CompletedTodosSection from "@/components/todos/CompletedTodosSection";
import TodoColumn from "@/components/todos/TodoColumn";
import TodoForm from "@/components/todos/TodoForm";
import TodoStats from "@/components/todos/TodoStats";

export default function TodosPage() {
  // --------------------
  // STATE
  // --------------------
  const [activeTodos, setActiveTodos] = useState({
    high: [],
    medium: [],
    low: [],
  });

  const [completed, setCompleted] = useState({
    items: [],
    cursor: null,
    hasMore: true,
    loading: false,
  });

  const [text, setText] = useState("");
  const [status, setStatus] = useState("high");
  const [tag, setTag] = useState("personal");
  const [selectedTag, setSelectedTag] = useState("all");
  const [menuTodoId, setMenuTodoId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  // --------------------
  // LOADERS
  // --------------------
  const loadActiveTodos = async (tagFilter = selectedTag) => {
    const data = await getActiveTodos(tagFilter);
    setActiveTodos({
      high: data.high || [],
      medium: data.medium || [],
      low: data.low || [],
    });
  };

  const loadCompletedTodos = async () => {
    const data = await getCompletedTodos();
    setCompleted({
      items: data.items || [],
      cursor: data.nextCursor || null,
      hasMore: data.hasMore,
      loading: false,
    });
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await Promise.all([
          loadActiveTodos(selectedTag),
          loadCompletedTodos(),
        ]);
      } catch {
        setError("Failed to load todos");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [selectedTag]);

  // --------------------
  // ACTIONS
  // --------------------
  const handleCreate = async (e) => {
    e?.preventDefault();
    if (!text.trim()) return;

    setCreating(true);
    setError("");

    try {
      const todo = await createTodo(text, status, tag);

      setActiveTodos((prev) => {
        const statusKey = todo.status === "high" ? "high" : todo.status === "medium" ? "medium" : "low";
        return {
          ...prev,
          [statusKey]: [todo, ...prev[statusKey]],
        };
      });

      setText("");
      setStatus("high");
      setTag("personal");
    } catch {
      setError("Failed to create todo");
    } finally {
      setCreating(false);
    }
  };

  const handleMove = async (todo, targetStatus) => {
    if (!targetStatus || targetStatus === todo.status) return;

    try {
      const updatedTodo = await moveTodo(todo.id, targetStatus);
      const mergedTodo = { ...todo, ...updatedTodo, status: targetStatus };

      setActiveTodos((prev) => {
        const nextState = {
          high: prev.high.filter((t) => t.id !== todo.id),
          medium: prev.medium.filter((t) => t.id !== todo.id),
          low: prev.low.filter((t) => t.id !== todo.id),
        };

        nextState[targetStatus] = [mergedTodo, ...nextState[targetStatus]];
        return nextState;
      });

      setMenuTodoId(null);
    } catch {
      setError("Failed to move todo");
    }
  };

  const handleToggleDone = async (todo) => {
    try {
      await toggleTodoDone(todo.id, true);

      // remove from active
      setActiveTodos((prev) => ({
        high: prev.high.filter((t) => t.id !== todo.id),
        medium: prev.medium.filter((t) => t.id !== todo.id),
        low: prev.low.filter((t) => t.id !== todo.id),
      }));

      // add to completed (top)
      setCompleted((prev) => ({
        ...prev,
        items: [{ ...todo, completed: true }, ...prev.items],
      }));
    } catch {
      setError("Failed to update todo");
    }
  };

  const loadMoreCompleted = async () => {
    if (!completed.hasMore || completed.loading) return;

    setCompleted((prev) => ({ ...prev, loading: true }));

    const data = await getCompletedTodos(completed.cursor);

    setCompleted((prev) => ({
      items: [...prev.items, ...data.items],
      cursor: data.nextCursor,
      hasMore: data.hasMore,
      loading: false,
    }));
  };

  const totalHigh = activeTodos.high.length;
  const totalMedium = activeTodos.medium.length;
  const totalLow = activeTodos.low.length;
  const totalCompleted = completed.items.length;

  useEffect(() => {
    const handleOutsideClick = () => setMenuTodoId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // --------------------
  // RENDER
  // --------------------
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-app/60">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">Tasks</h2>
          <p className="text-app/60">Prioritize and focus on what matters</p>
        </div>



        <TodoStats
          totalHigh={totalHigh}
          totalMedium={totalMedium}
          totalLow={totalLow}
          totalCompleted={totalCompleted}
        />
      </div>

      <TodoForm
        text={text}
        setText={setText}
        tag={tag}
        setTag={setTag}
        status={status}
        setStatus={setStatus}
        handleCreate={handleCreate}
        creating={creating}
        error={error}
      />

      <div className="flex justify-end">
        <div className="flex items-center gap-3">
          <label className="text-sm text-app/60">Filter</label>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="bg-app border border-app rounded-lg px-3 py-2 text-app focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="all">All</option>
            <option value="personal">Personal</option>
            <option value="freelance">Freelance</option>
            <option value="work">Work</option>
            <option value="project1">Project1</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <TodoColumn
          title="High Priority"
          subtitle="What matters now"
          count={totalHigh}
          tone="high"
          emptyTitle="No high priority tasks"
          emptyHint="You're all clear! ✨"
          todos={activeTodos.high}
          onToggleDone={handleToggleDone}
          onMove={handleMove}
          menuTodoId={menuTodoId}
          setMenuTodoId={setMenuTodoId}
        />

        <TodoColumn
          title="Medium Priority"
          subtitle="For another time"
          count={totalMedium}
          tone="medium"
          emptyTitle="No medium priority tasks"
          emptyHint="Keep it clear 🎯"
          todos={activeTodos.medium}
          onToggleDone={handleToggleDone}
          onMove={handleMove}
          menuTodoId={menuTodoId}
          setMenuTodoId={setMenuTodoId}
        />

        <TodoColumn
          title="Low Priority"
          subtitle="When you have time"
          count={totalLow}
          tone="low"
          emptyTitle="No low priority tasks"
          emptyHint="Nice and clear! 🌟"
          todos={activeTodos.low}
          onToggleDone={handleToggleDone}
          onMove={handleMove}
          menuTodoId={menuTodoId}
          setMenuTodoId={setMenuTodoId}
        />
      </div>

      <CompletedTodosSection
        items={completed.items}
        hasMore={completed.hasMore}
        loading={completed.loading}
        onLoadMore={loadMoreCompleted}
      />
    </div>
  );
}