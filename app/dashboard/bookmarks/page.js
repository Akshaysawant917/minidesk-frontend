"use client";

import { useEffect, useState } from "react";
import { getBookmarks, createBookmark, deleteBookmark } from "@/api/bookmarks.api";

import {
  Bookmark,
  Plus,
  Trash2,
  Link as LinkIcon,
} from "lucide-react";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  /* ---------- Load Bookmarks ---------- */
  const loadBookmarks = async () => {
    try {
      const data = await getBookmarks();
      setBookmarks(Array.isArray(data) ? data : data.items || []);
    } catch {
      setError("Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setError("");
    setShowModal(false);
  };

  /* ---------- Create Bookmark ---------- */
  const handleCreate = async (e) => {
    e?.preventDefault();
    if (!title.trim() || !url.trim()) return;

    // basic URL validation
    if (!url.includes("://")) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    setCreating(true);
    setError("");

    try {
      const newBookmark = await createBookmark(title, url);
      setBookmarks((prev) => [newBookmark, ...prev]);
      resetForm();
    } catch {
      setError("Failed to create bookmark");
    } finally {
      setCreating(false);
    }
  };

  /* ---------- Delete Bookmark ---------- */
  const handleDelete = async (id) => {
    setDeleting(id);
    setError("");

    try {
      await deleteBookmark(id);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } catch {
      setError("Failed to delete bookmark");
    } finally {
      setDeleting(null);
    }
  };

  const handleContextMenu = (e, bookmark) => {
    e.preventDefault();
    setContextMenu({ bookmarkId: bookmark.id, x: e.clientX, y: e.clientY });
  };

  const handleDeleteFromContext = (id) => {
    setContextMenu(null);
    handleDelete(id);
  };

  /* ---------- Get Favicon URL ---------- */
  const getFaviconUrl = (urlStr) => {
    try {
      const url = new URL(urlStr);
      return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`;
    } catch {
      return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-app/60">Loading your bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">Bookmarks</h2>
          <p className="text-app/60">Save and organize your favorite links</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{bookmarks.length}</div>
            <div className="text-xs text-app/50">Saved</div>
          </div>
          <button
            onClick={() => {
              setError("");
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-secondary transition-all hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            Add Bookmark
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-md rounded-xl border border-app bg-white p-5 shadow-xl dark:bg-[#0b1220]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-primary">Add New Bookmark</h3>
                <p className="text-sm text-app/60">Save a link for quick access</p>
              </div>
              <button onClick={() => setShowModal(false)} className="rounded-lg p-2 text-app/60 hover:bg-app/10">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-app/80">URL</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full rounded-lg border border-app bg-app px-4 py-2.5 text-app placeholder:text-app/40 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-app/80">Title</label>
                <input
                  type="text"
                  placeholder="e.g., GitHub"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-app bg-app px-4 py-2.5 text-app placeholder:text-app/40 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={creating || !title.trim() || !url.trim()}
                  className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-secondary transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  {creating ? "Adding..." : "Save Bookmark"}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="rounded-lg border border-app px-4 py-2.5 text-sm font-medium text-app/70">
                  Cancel
                </button>
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Bookmarks Grid */}
      {bookmarks.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-10 h-10 text-app/30" />
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">No bookmarks yet</h3>
          <p className="text-app/50">Start adding links to your collection</p>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Bookmark className="w-5 h-5 text-app/60" />
            <h3 className="text-xl font-semibold text-primary">Your Bookmarks</h3>
            <span className="text-sm text-app/50">({bookmarks.length})</span>
          </div>

          <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
            {bookmarks.map((bookmark) => (
              <button
                key={bookmark.id}
                type="button"
                onClick={() => window.open(bookmark.url, "_blank", "noopener,noreferrer")}
                onContextMenu={(e) => handleContextMenu(e, bookmark)}
                className="group aspect-square rounded-md border border-app bg-app/70 p-1 text-center transition-all hover:border-primary/30 hover:bg-app"
              >
                <div className="flex h-full flex-col items-center justify-center">
                  <img
                    src={getFaviconUrl(bookmark.url)}
                    alt="favicon"
                    className="h-16 w-16 rounded-md"
                    onError={(e) => {
                      e.target.style.display = "none";
                      if (e.target.nextElementSibling) {
                        e.target.nextElementSibling.style.display = "flex";
                      }
                    }}
                  />
                  <div
                    className="hidden h-7 w-7 items-center justify-center rounded-md bg-primary/10"
                    key={`fallback-${bookmark.id}`}
                  >
                    <LinkIcon className="h-4 w-4 text-primary" />
                  </div>

                  <h4 className="mt-0.5 line-clamp-1 text-[10px] font-semibold text-primary">
                    {bookmark.title}
                  </h4>
                </div>
              </button>
            ))}
          </div>

          {contextMenu && (
            <div
              className="fixed z-[60] rounded-lg border border-app bg-white p-1.5 shadow-lg dark:bg-[#0b1220]"
              style={{ top: contextMenu.y, left: contextMenu.x }}
            >
              <button
                type="button"
                onClick={() => handleDeleteFromContext(contextMenu.bookmarkId)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 transition-all hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
