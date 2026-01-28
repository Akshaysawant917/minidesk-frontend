"use client";

import { useEffect, useState } from "react";
import { getTodos, createTodo, moveTodo } from "@/api/todos.api";

export default function TodosPage() {
  const [todos, setTodos] = useState({
    today: [],
    later: [],
  });

  const [text, setText] = useState("");
  const [status, setStatus] = useState("TODAY");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const loadTodos = async () => {
    try {
      const data = await getTodos();
      setTodos({
        today: data.today || [],
        later: data.later || [],
      });
    } catch {
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleCreate = async () => {
    if (!text.trim()) return;

    setCreating(true);
    setError("");

    try {
      await createTodo(text, status);
      setText("");
      setStatus("TODAY");
      await loadTodos();
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
      await loadTodos();
    } catch {
      setError("Failed to move todo");
    }
  };

  if (loading) {
    return <p>Loading todos…</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Todos
      </h2>

      {/* Create Todo */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="New todo…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border border-[var(--border)] rounded px-2 py-1 text-sm"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-[var(--border)] rounded px-2 py-1 text-sm"
        >
          <option value="TODAY">Today</option>
          <option value="LATER">Later</option>
        </select>

        <button
          onClick={handleCreate}
          disabled={creating}
          className="bg-[var(--primary)] text-white px-3 py-1 rounded text-sm disabled:opacity-60"
        >
          {creating ? "Adding…" : "Add"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500 mb-4">
          {error}
        </p>
      )}

      {/* Today */}
      <section className="mb-6">
        <h3 className="font-medium mb-2">
          Today
        </h3>

        {todos.today.length === 0 && (
          <p className="text-sm text-gray-500">
            No todos for today.
          </p>
        )}

        <ul className="space-y-2">
          {todos.today.map((todo) => (
            <li
              key={todo.id}
              onClick={() => handleMove(todo)}
              title="Click to move to Later"
              className="border border-[var(--border)] rounded p-2 text-sm cursor-pointer hover:bg-gray-50"
            >
              {todo.content}
            </li>
          ))}
        </ul>
      </section>

      {/* Later */}
      <section>
        <h3 className="font-medium mb-2">
          Later
        </h3>

        {todos.later.length === 0 && (
          <p className="text-sm text-gray-500">
            No todos for later.
          </p>
        )}

        <ul className="space-y-2">
          {todos.later.map((todo) => (
            <li
              key={todo.id}
              onClick={() => handleMove(todo)}
              title="Click to move to Today"
              className="border border-[var(--border)] rounded p-2 text-sm cursor-pointer hover:bg-gray-50"
            >
              {todo.content}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
