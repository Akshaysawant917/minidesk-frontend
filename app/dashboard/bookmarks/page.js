"use client";

import { useEffect, useState } from "react";
import { getBookmarks, createBookmark, deleteBookmark } from "@/api/bookmarks.api";
import BookmarksHeader from "@/components/bookmarks/BookmarksHeader";
import BookmarkModal from "@/components/bookmarks/BookmarkModal";
import BookmarkGrid from "@/components/bookmarks/BookmarkGrid";
import EmptyBookmarksState from "@/components/bookmarks/EmptyBookmarksState";

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
      <BookmarksHeader
        bookmarksCount={bookmarks.length}
        onAddBookmark={() => {
          setError("");
          setShowModal(true);
        }}
      />

      <BookmarkModal
        show={showModal}
        title={title}
        setTitle={setTitle}
        url={url}
        setUrl={setUrl}
        error={error}
        creating={creating}
        onSubmit={handleCreate}
        onClose={() => setShowModal(false)}
      />

      {bookmarks.length === 0 ? (
        <EmptyBookmarksState />
      ) : (
        <BookmarkGrid
          bookmarks={bookmarks}
          contextMenu={contextMenu}
          onContextMenu={handleContextMenu}
          onDeleteFromContext={handleDeleteFromContext}
        />
      )}
    </div>
  );
}
