"use client";

import { useEffect, useState } from "react";
import { getBookmarks, createBookmark, deleteBookmark } from "@/api/bookmarks.api";

import {
  Bookmark,
  Plus,
  Trash2,
  Link as LinkIcon,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

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
      setTitle("");
      setUrl("");
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

  /* ---------- Extract Domain from URL ---------- */
  const getDomain = (urlStr) => {
    try {
      const url = new URL(urlStr);
      return url.hostname.replace("www.", "");
    } catch {
      return "bookmark";
    }
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

        {/* Stats */}
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{bookmarks.length}</div>
          <div className="text-xs text-app/50">Saved</div>
        </div>
      </div>

      {/* Add Bookmark Form */}
      <div className="bg-gradient-to-br from-primary/5 to-transparent p-6 rounded-xl border-2 border-primary/20">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Bookmark
          </h3>
          <p className="text-sm text-app/60 mt-1">Save any link for quick access</p>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-app/80 mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="e.g., GitHub"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-app border border-app rounded-lg px-4 py-2.5 text-app placeholder:text-app/40 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-app/80 mb-2">
                URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-app border border-app rounded-lg px-4 py-2.5 text-app placeholder:text-app/40 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={creating || !title.trim() || !url.trim()}
              className="flex items-center gap-2 bg-primary text-secondary px-6 py-2.5 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Plus className="w-4 h-4" />
              {creating ? "Adding..." : "Add Bookmark"}
            </button>

            {(title.trim() || url.trim()) && (
              <Sparkles className="w-4 h-4 text-primary/50" />
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
        </form>
      </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((bookmark) => (
              <a
                key={bookmark.id}
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-app border border-app rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={getFaviconUrl(bookmark.url)}
                    alt="favicon"
                    className="w-10 h-10 rounded-lg flex-shrink-0"
                    onError={(e) => {
                      e.target.style.display = "none";
                      if (e.target.nextElementSibling) {
                        e.target.nextElementSibling.style.display = "flex";
                      }
                    }}
                  />
                  <div
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 hidden"
                    key={`fallback-${bookmark.id}`}
                  >
                    <LinkIcon className="w-5 h-5 text-primary" />
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(bookmark.id);
                    }}
                    disabled={deleting === bookmark.id}
                    className="ml-auto flex-shrink-0 p-2 rounded-lg text-app/50 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                    aria-label="Delete bookmark"
                  >
                    {deleting === bookmark.id ? (
                      <div className="w-4 h-4 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <h4 className="font-semibold text-primary mb-1 line-clamp-2 group-hover:text-primary/80">
                  {bookmark.title}
                </h4>
                <p className="text-xs text-app/50 line-clamp-1 group-hover:text-app/60">
                  {getDomain(bookmark.url)}
                </p>

                <div className="mt-3 pt-3 border-t border-app/30 flex items-center gap-2 text-xs text-app/40 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all">
                  <ExternalLink className="w-3 h-3" />
                  <span>Open link</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
