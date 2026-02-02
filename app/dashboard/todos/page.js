"use client";

import { useEffect, useState } from "react";
import {
  getActiveTodos,
  getCompletedTodos,
  createTodo,
  moveTodo,
  toggleTodoDone,
} from "@/api/todos.api";

import {
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  Calendar,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function TodosPage() {
  // --------------------
  // STATE
  // --------------------
  const [activeTodos, setActiveTodos] = useState({
    today: [],
    later: [],
  });

  const [completed, setCompleted] = useState({
    items: [],
    cursor: null,
    hasMore: true,
    loading: false,
  });

  const [text, setText] = useState("");
  const [status, setStatus] = useState("TODAY");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  // --------------------
  // LOADERS
  // --------------------
  const loadActiveTodos = async () => {
    const data = await getActiveTodos();
    setActiveTodos({
      today: data.today || [],
      later: data.later || [],
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
        await Promise.all([
          loadActiveTodos(),
          loadCompletedTodos(),
        ]);
      } catch {
        setError("Failed to load todos");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // --------------------
  // ACTIONS
  // --------------------
  const handleCreate = async (e) => {
    e?.preventDefault();
    if (!text.trim()) return;

    setCreating(true);
    setError("");

    try {
      const todo = await createTodo(text, status);

      setActiveTodos((prev) => ({
        ...prev,
        [todo.status === "TODAY" ? "today" : "later"]: [
          todo,
          ...prev[todo.status === "TODAY" ? "today" : "later"],
        ],
      }));

      setText("");
      setStatus("TODAY");
    } catch {
      setError("Failed to create todo");
    } finally {
      setCreating(false);
    }
  };

  const handleMove = async (todo) => {
    const newStatus = todo.status === "TODAY" ? "LATER" : "TODAY";

    try {
      await moveTodo(todo.id, newStatus);

      setActiveTodos((prev) => ({
        today:
          newStatus === "TODAY"
            ? [todo, ...prev.today]
            : prev.today.filter((t) => t.id !== todo.id),
        later:
          newStatus === "LATER"
            ? [todo, ...prev.later]
            : prev.later.filter((t) => t.id !== todo.id),
      }));
    } catch {
      setError("Failed to move todo");
    }
  };

  const handleToggleDone = async (todo) => {
    try {
      await toggleTodoDone(todo.id, true);

      // remove from active
      setActiveTodos((prev) => ({
        today: prev.today.filter((t) => t.id !== todo.id),
        later: prev.later.filter((t) => t.id !== todo.id),
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

  const totalToday = activeTodos.today.length;
  const totalLater = activeTodos.later.length;
  const totalCompleted = completed.items.length;

  const renderActiveTodo = (todo, moveHint, targetList) => (
    <li
      key={todo.id}
      className="group flex items-center gap-3 p-4 rounded-lg border border-app hover:border-primary/30 bg-secondary/30 hover:bg-secondary/50 transition-all"
    >
      <button
        onClick={() => handleToggleDone(todo)}
        className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-app hover:border-emerald-500 hover:bg-emerald-500/10 transition-all flex items-center justify-center group/check"
        aria-label="Mark as complete"
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-0 group-hover/check:opacity-100 transition-opacity" />
      </button>

      <span className="flex-1 text-app/90 group-hover:text-primary transition-colors">
        {todo.content}
      </span>

      <button
        onClick={() => handleMove(todo)}
        title={moveHint}
        className="flex-shrink-0 flex items-center gap-1 text-xs text-app/50 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
      >
        <span>{targetList}</span>
        <ChevronRight className="w-3 h-3" />
      </button>
    </li>
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">Tasks</h2>
          <p className="text-app/60">Focus on today, park the rest</p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{totalToday}</div>
            <div className="text-xs text-app/50">Today</div>
          </div>
          <div className="w-px h-8 bg-app/20"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-app/60">{totalLater}</div>
            <div className="text-xs text-app/50">Later</div>
          </div>
          <div className="w-px h-8 bg-app/20"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-500">{totalCompleted}</div>
            <div className="text-xs text-app/50">Done</div>
          </div>
        </div>
      </div>

      {/* Create Form */}
      <div className="bg-gradient-to-br from-primary/5 to-transparent">
        <form onSubmit={handleCreate} className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-app border border-app rounded-lg px-4 py-3 text-app placeholder:text-app/40 focus:outline-none focus:border-primary transition-colors"
              autoFocus
            />
            {text.trim() && (
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
            )}
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-app border border-app rounded-lg px-4 py-3 text-app focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="TODAY">Today</option>
            <option value="LATER">Later</option>
          </select>

          <button
            type="submit"
            disabled={creating || !text.trim()}
            className="flex items-center gap-2 bg-primary text-secondary   px-6 py-3 rounded-lg font-medium  disabled:cursor-not-allowed transition-all"
          >
            <Plus className="w-4 h-4" />
            {creating ? "Adding..." : "Add"}
          </button>
        </form>

        {error && (
          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today Section */}
        <section className="bg-app border border-app rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">Today</h3>
                <p className="text-xs text-app/50">What matters now</p>
              </div>
            </div>
            <span className="text-sm px-3 py-1 bg-secondary rounded-full text-app/70">
              {totalToday} {totalToday === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {activeTodos.today.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-app/30" />
              </div>
              <p className="text-app/50 text-sm">No tasks for today</p>
              <p className="text-app/30 text-xs mt-1">You're all clear! ✨</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {activeTodos.today.map((todo) =>
                renderActiveTodo(todo, "Move to Later", "Later")
              )}
            </ul>
          )}
        </section>

        {/* Later Section */}
        <section className="bg-app border border-app rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">Later</h3>
                <p className="text-xs text-app/50">For another time</p>
              </div>
            </div>
            <span className="text-sm px-3 py-1 bg-secondary rounded-full text-app/70">
              {totalLater} {totalLater === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {activeTodos.later.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-app/30" />
              </div>
              <p className="text-app/50 text-sm">Nothing parked here</p>
              <p className="text-app/30 text-xs mt-1">Keep it clear 🎯</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {activeTodos.later.map((todo) =>
                renderActiveTodo(todo, "Move to Today", "Today")
              )}
            </ul>
          )}
        </section>
      </div>

      {/* Completed Section */}
      <section className="bg-app border border-app rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary">Completed</h3>
              <p className="text-xs text-app/50">Well done!</p>
            </div>
          </div>
          <span className="text-sm px-3 py-1 bg-emerald-500/10 rounded-full text-emerald-500">
            {totalCompleted} done
          </span>
        </div>

        {completed.items.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-app/30" />
            </div>
            <p className="text-app/50 text-sm">No completed tasks yet</p>
            <p className="text-app/30 text-xs mt-1">Start checking things off!</p>
          </div>
        ) : (
          <>
            <ul className="space-y-2">
              {completed.items.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-3 p-4 rounded-lg border border-app/50 bg-secondary/20"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="flex-1 text-app/40 line-through">
                    {todo.content}
                  </span>
                </li>
              ))}
            </ul>

            {completed.hasMore && (
              <button
                onClick={loadMoreCompleted}
                disabled={completed.loading}
                className="mt-4 w-full py-3 text-sm text-primary hover:text-primary/80 font-medium transition-colors disabled:opacity-50"
              >
                {completed.loading ? "Loading..." : "Load more completed tasks"}
              </button>
            )}
          </>
        )}
      </section>
    </div>
  );
}