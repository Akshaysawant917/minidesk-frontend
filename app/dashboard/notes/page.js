"use client";

import { useEffect, useState } from "react";
import { getNotes, createNote } from "@/api/notes.api";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch {
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleCreate = async () => {
    if (!content.trim()) return;

    setCreating(true);

    try {
      await createNote(null, content);
      setContent("");
      await loadNotes(); // refresh list
    } catch {
      setError("Failed to create note");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <p>Loading notes…</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Notes
      </h2>

      {/* Create note */}
      <div className="mb-6">
        <textarea
          placeholder="Write a note…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-[var(--border)] rounded p-2 text-sm"
          rows={3}
        />

        <button
          onClick={handleCreate}
          disabled={creating}
          className="mt-2 bg-[var(--primary)] text-white px-3 py-1 rounded text-sm disabled:opacity-60"
        >
          {creating ? "Saving…" : "Add note"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500 mb-4">
          {error}
        </p>
      )}

      {notes.length === 0 && (
        <p className="text-sm text-gray-500">
          No notes yet.
        </p>
      )}

      <ul className="space-y-3">
        {notes.map((note) => (
          <li
            key={note.id}
            className="border border-[var(--border)] rounded p-3"
          >
            <p className="text-sm text-gray-700">
              {note.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
