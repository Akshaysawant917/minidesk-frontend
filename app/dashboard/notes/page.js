"use client";

import { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "@/api/notes.api";

import {
  FileText,
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- Initial Load ---------------- */

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data.items || []);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch {
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  /* ---------------- Load More ---------------- */

  const loadMoreNotes = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);

    try {
      const data = await getNotes(cursor);
      setNotes((prev) => [...prev, ...(data.items || [])]);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch {
      setError("Failed to load more notes");
    } finally {
      setLoadingMore(false);
    }
  };

  /* ---------------- Create ---------------- */

  const handleCreate = async () => {
    if (!content.trim()) return;

    setSaving(true);
    setError("");

    try {
      const newNote = await createNote(null, content);
      setNotes((prev) => [newNote, ...prev]);
      setContent("");
    } catch {
      setError("Failed to create note");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- Update ---------------- */

  const handleUpdate = async (id) => {
    if (!content.trim()) return;

    setSaving(true);
    setError("");

    try {
      const updated = await updateNote(id, null, content);

      setNotes((prev) =>
        prev.map((n) => (n.id === id ? updated : n))
      );

      setEditingId(null);
      setContent("");
    } catch {
      setError("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setContent("");
    setError("");
  };

  /* ---------------- Delete ---------------- */

  const handleDelete = async (id) => {
    if (!confirm("Delete this note? This can't be undone.")) return;

    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch {
      setError("Failed to delete note");
    }
  };

  /* ---------------- Render ---------------- */

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-app/60">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">Quick Notes</h2>
          <p className="text-app/60">Your brain doesn't need folders</p>
        </div>

        {/* Stats */}
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{notes.length}</div>
          <div className="text-xs text-app/50">Notes</div>
        </div>
      </div>

      {/* Create / Edit Form */}
      <div className="bg-gradient-to-br from-primary/5 to-transparent p-6 rounded-xl border border-app">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-primary">
            {editingId ? "Edit Note" : "New Note"}
          </h3>
          {content.trim() && (
            <Sparkles className="w-4 h-4 text-primary/50 ml-auto" />
          )}
        </div>

        <textarea
          placeholder="Note down your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-app border border-app rounded-lg p-4 text-app placeholder:text-app/40 focus:outline-none focus:border-primary transition-colors resize-none"
          rows={4}
          autoFocus={!!editingId}
        />

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={editingId ? () => handleUpdate(editingId) : handleCreate}
            disabled={!content.trim() || saving}
            className="flex items-center gap-2 bg-primary text-secondary   px-6 py-2.5 rounded-lg font-medium  disabled:cursor-not-allowed transition-all"
          >
            {editingId ? (
              <>
                <Save className="w-4 h-4" />
                {saving ? "Updating..." : "Update Note"}
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                {saving ? "Saving..." : "Add Note"}
              </>
            )}
          </button>

          {editingId && (
            <button
              onClick={handleCancelEdit}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-app/70 hover:text-app hover:bg-secondary transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          )}

          <div className="ml-auto text-xs text-app/40">
            {content.length} characters
          </div>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
      </div>

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-app/30" />
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">No notes yet</h3>
          <p className="text-app/50 mb-6">Start capturing your thoughts and ideas</p>
          <div className="inline-flex items-center gap-2 text-sm text-primary">
            <Sparkles className="w-4 h-4" />
            <span>Write your first note above</span>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`group bg-app border rounded-xl p-5 transition-all ${
                  editingId === note.id
                    ? "border-primary/50 shadow-lg"
                    : "border-app hover:border-primary/30 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="text-app/90 leading-relaxed whitespace-pre-wrap break-words">
                      {note.content}
                    </p>

                    {note.createdAt && (
                      <p className="text-xs text-app/40 mt-3">
                        {new Date(note.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button
                      onClick={() => {
                        setEditingId(note.id);
                        setContent(note.content);
                        setError("");
                        // Scroll to top
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-2 rounded-lg text-blue-500 hover:bg-blue-500/10 transition-colors"
                      title="Edit note"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(note.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <button
                onClick={loadMoreNotes}
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
                    <span>Load More Notes</span>
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