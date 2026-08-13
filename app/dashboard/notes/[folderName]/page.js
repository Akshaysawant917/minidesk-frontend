"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createNote, deleteNote, updateNote } from "@/api/notes.api";
import { getFolderNotes } from "@/api/folders.api";

import {
    ArrowLeft,
    ChevronDown,
    Edit3,
    FileText,
    Folder,
    Plus,
    Save,
    Trash2,
    X,
} from "lucide-react";

export default function FolderNotesPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const folderName = decodeURIComponent(params.folderName || "");
    const folderId = searchParams.get("folderId");

    const [notes, setNotes] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [noteModalOpen, setNoteModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [editorOpen, setEditorOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [draftTitle, setDraftTitle] = useState("");
    const [draftContent, setDraftContent] = useState("");

    const currentFolder = {
        id: folderId,
        name: folderName,
    };

    const loadFolderNotes = async (activeFolderId, reset = true, nextCursor = null) => {
        if (!activeFolderId) {
            setNotes([]);
            return;
        }

        if (reset) {
            setLoading(true);
            setCursor(null);
            setHasMore(true);
        } else {
            setLoadingMore(true);
        }

        try {
            const data = await getFolderNotes(activeFolderId, nextCursor);
            const items = data.items || [];
            setNotes((prev) => (reset ? items : [...prev, ...items]));
            setCursor(data.nextCursor);
            setHasMore(data.hasMore);
        } catch {
            setError("Failed to load notes");
        } finally {
            if (reset) setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        if (!folderId) {
            setNotes([]);
            setLoading(false);
            setError("Folder data is missing.");
            return;
        }

        setError("");
        loadFolderNotes(folderId, true, null);
    }, [folderId]);

    const closeAllModals = () => {
        setNoteModalOpen(false);
        setSelectedNote(null);
        setEditorOpen(false);
        setEditingId(null);
        setDraftTitle("");
        setDraftContent("");
    };

    const openCreateModal = () => {
        setEditingId(null);
        setDraftTitle("");
        setDraftContent("");
        setSelectedNote(null);
        setNoteModalOpen(false);
        setEditorOpen(true);
    };

    const openEditModal = (note) => {
        setEditingId(note.id);
        setDraftTitle(note.title || "");
        setDraftContent(note.content || "");
        setEditorOpen(true);
        setNoteModalOpen(false);
    };

    const handleSave = async () => {
        const titleValue = draftTitle.trim();
        const contentValue = draftContent.trim();

        if (!titleValue || !contentValue || !currentFolder?.id) return;

        setSaving(true);
        setError("");

        try {
            if (editingId) {
                const updated = await updateNote(editingId, titleValue, contentValue, currentFolder.id);
                setNotes((prev) => prev.map((note) => (note.id === editingId ? updated : note)));
            } else {
                const newNote = await createNote(titleValue, contentValue, currentFolder.id);
                setNotes((prev) => [newNote, ...prev]);
            }

            closeAllModals();
        } catch {
            setError("Failed to save note");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this note? This can't be undone.")) return;

        try {
            await deleteNote(id);
            setNotes((prev) => prev.filter((note) => note.id !== id));
            if (selectedNote?.id === id) {
                setSelectedNote(null);
                setNoteModalOpen(false);
            }
        } catch {
            setError("Failed to delete note");
        }
    };

    const loadMoreNotes = async () => {
        if (!currentFolder?.id || !hasMore || loadingMore) return;
        await loadFolderNotes(currentFolder.id, false, cursor);
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
                    <p className="text-app/60">Loading folder notes...</p>
                </div>
            </div>
        );
    }

    if (!currentFolder) {
        return (
            <div className="bg-app border border-app rounded-xl p-10 text-center">
                <h3 className="text-xl font-semibold text-primary mb-2">Folder not found</h3>
                <p className="text-app/60">This folder may have been removed or you do not have access.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            <button
                type="button"
                onClick={() => router.push("/dashboard/notes")}
                className="inline-flex items-center gap-2 rounded-lg border border-app bg-app px-3 py-2 text-app/80 hover:text-primary hover:border-primary/40 cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" />
                All folders
            </button>
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">


                    <div>
                        <h2 className="text-3xl font-bold text-primary mb-2">{currentFolder.name}</h2>
                        <p className="text-app/60">Folder notes</p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="flex items-center gap-2 rounded-lg bg-primary text-secondary px-4 py-2.5 font-medium cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    Add note
                </button>
            </div>

            {error && (
                <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-sm">
                    {error}
                </div>
            )}

            {notes.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-app rounded-xl">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Folder className="w-10 h-10 text-app/30" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">No notes in this folder</h3>
                    <p className="text-app/50 mb-6">Create your first note for this folder.</p>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 text-primary cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        Add note
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {notes.map((note) => {
                        const preview = (note.content || "").replace(/\s+/g, " ").trim();

                        return (
                            <button
                                key={note.id}
                                type="button"
                                onClick={() => {
                                    setSelectedNote(note);
                                    setNoteModalOpen(true);
                                }}
                                className="group w-full rounded-2xl border border-app bg-app p-4 text-left transition-all hover:border-primary/30 hover:shadow-md cursor-pointer"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <span className="font-bold text-primary truncate text-lg leading-snug">
                                            {note.title || "Untitled note"}
                                        </span>
                                    </div>

                                    <span className="text-[11px] text-app/45 shrink-0 pt-1">
                                        {new Date(note.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>

                                <p className="mt-3 text-xs text-app/60 leading-5 line-clamp-3">
                                    {preview || "No preview available"}
                                </p>
                            </button>
                        );
                    })}
                </div>
            )}

            {hasMore && (
                <div className="flex justify-center pt-2">
                    <button
                        type="button"
                        onClick={loadMoreNotes}
                        disabled={loadingMore}
                        className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-app border border-app rounded-lg text-app/80 hover:text-primary font-medium transition-all disabled:opacity-50 cursor-pointer"
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

            {noteModalOpen && selectedNote && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeAllModals();
                    }}
                >
                    <div className="w-full max-w-5xl rounded-2xl border border-app bg-app p-6 shadow-2xl">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-app/50">Note</p>
                                <h3 className="text-3xl font-extrabold text-primary mt-1 leading-tight">
                                    {selectedNote.title || "Untitled note"}
                                </h3>
                            </div>

                            <button
                                type="button"
                                onClick={closeAllModals}
                                className="p-2 rounded-lg border border-app hover:bg-secondary cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="overflow-y-auto max-h-[70vh] whitespace-pre-wrap break-words rounded-xl bg-secondary p-5 text-base text-app/90 leading-8 tracking-wide">
                            {selectedNote.content || "No content"}
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-5">
                            <button
                                type="button"
                                onClick={() => openEditModal(selectedNote)}
                                className="flex items-center gap-2 rounded-lg border border-app px-4 py-2.5 text-app hover:bg-secondary cursor-pointer"
                            >
                                <Edit3 className="w-4 h-4" />
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={() => handleDelete(selectedNote.id)}
                                className="flex items-center gap-2 rounded-lg border border-red-500/40 px-4 py-2.5 text-red-500 hover:bg-red-500/10 cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editorOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeAllModals();
                    }}
                >
                    <div className="w-full max-w-4xl rounded-2xl border border-app bg-app p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold text-primary">
                                {editingId ? "Edit note" : "Add note"}
                            </h3>

                            <button
                                type="button"
                                onClick={closeAllModals}
                                className="p-2 rounded-lg border border-app hover:bg-secondary cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <input
                                type="text"
                                value={draftTitle}
                                onChange={(e) => setDraftTitle(e.target.value)}
                                placeholder="Note title"
                                className="w-full bg-secondary border border-app rounded-lg p-3 text-app placeholder:text-app/40 focus:outline-none focus:border-primary"
                            />

                            <textarea
                                value={draftContent}
                                onChange={(e) => setDraftContent(e.target.value)}
                                placeholder="Write your note..."
                                rows={14}
                                className="w-full bg-secondary border border-app rounded-lg p-4 text-base text-app placeholder:text-app/40 focus:outline-none focus:border-primary resize-none leading-7"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-5">
                            <button
                                type="button"
                                onClick={closeAllModals}
                                className="px-4 py-2.5 rounded-lg border border-app hover:bg-secondary cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={!draftTitle.trim() || !draftContent.trim() || saving}
                                onClick={handleSave}
                                className="flex items-center gap-2 rounded-lg bg-primary text-secondary px-4 py-2.5 font-medium disabled:opacity-50 cursor-pointer"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        {editingId ? "Update note" : "Save note"}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
