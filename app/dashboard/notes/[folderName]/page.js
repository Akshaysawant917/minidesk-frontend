"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createNote, deleteNote, updateNote } from "@/api/notes.api";
import { getFolderNotes } from "@/api/folders.api";
import EmptyFolderNotesState from "@/components/notenested/EmptyFolderNotesState";
import FolderNotesHeader from "@/components/notenested/FolderNotesHeader";
import NoteCard from "@/components/notenested/NoteCard";
import NoteEditorModal from "@/components/notenested/NoteEditorModal";
import NoteModal from "@/components/notenested/NoteModal";
import { ChevronDown } from "lucide-react";

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
            <FolderNotesHeader
                folderName={currentFolder.name}
                onBack={() => router.push("/dashboard/notes")}
                onAddNote={openCreateModal}
            />

            {error && (
                <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-sm">
                    {error}
                </div>
            )}

            {notes.length === 0 ? (
                <EmptyFolderNotesState onAddNote={openCreateModal} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onOpen={() => {
                                setSelectedNote(note);
                                setNoteModalOpen(true);
                            }}
                        />
                    ))}
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
                <NoteModal
                    note={selectedNote}
                    onClose={closeAllModals}
                    onEdit={() => openEditModal(selectedNote)}
                    onDelete={() => handleDelete(selectedNote.id)}
                />
            )}

            {editorOpen && (
                <NoteEditorModal
                    editingId={editingId}
                    draftTitle={draftTitle}
                    setDraftTitle={setDraftTitle}
                    draftContent={draftContent}
                    setDraftContent={setDraftContent}
                    onClose={closeAllModals}
                    onSave={handleSave}
                    saving={saving}
                />
            )}
        </div>
    );
}
