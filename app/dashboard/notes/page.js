"use client";

import { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "@/api/notes.api";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
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

    try {
      await createNote(null, content);
      setContent("");
      loadNotes();
    } catch {
      setError("Failed to create note");
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateNote(id, null, content);
      setEditingId(null);
      setContent("");
      loadNotes();
    } catch {
      setError("Failed to update note");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this note?")) return;

    try {
      await deleteNote(id);
      loadNotes();
    } catch {
      setError("Failed to delete note");
    }
  };

  if (loading) return <p>Loading notes…</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notes</h2>

      {/* Create / Edit */}
      <div className="mb-6">
        <textarea
          placeholder="Write a note…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-[var(--border)] rounded p-2 text-sm"
          rows={3}
        />

        <button
          onClick={editingId ? () => handleUpdate(editingId) : handleCreate}
          className="mt-2 bg-[var(--primary)] text-white px-3 py-1 rounded text-sm"
        >
          {editingId ? "Update note" : "Add note"}
        </button>
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <ul className="space-y-3">
        {notes.map((note) => (
          <li
            key={note.id}
            className="border border-[var(--border)] rounded p-3"
          >
            <p className="text-sm mb-2">{note.content}</p>

            <div className="flex gap-3 text-sm">
              <button
                onClick={() => {
                  setEditingId(note.id);
                  setContent(note.content);
                }}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
