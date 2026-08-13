"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createFolder, getFolders } from "@/api/folders.api";
import EmptyFoldersState from "@/components/notes/EmptyFoldersState";
import FolderCard from "@/components/notes/FolderCard";
import FolderCreateForm from "@/components/notes/FolderCreateForm";
import { Plus } from "lucide-react";

export default function NotesPage() {
  const router = useRouter();
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFolders = async () => {
    try {
      const data = await getFolders();
      setFolders(Array.isArray(data) ? data : data?.items || []);
    } catch {
      setError("Failed to load folders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFolders();
  }, []);

  const handleCreateFolder = async () => {
    const name = folderName.trim();
    if (!name) return;

    setCreatingFolder(true);
    setError("");

    try {
      const newFolder = await createFolder(name);
      setFolders((prev) => [newFolder, ...prev]);
      setFolderName("");
      setShowFolderInput(false);
      router.push(`/dashboard/notes/${encodeURIComponent(newFolder.name)}?folderId=${newFolder.id}`);
    } catch {
      setError("Failed to create folder");
    } finally {
      setCreatingFolder(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-app/60">Loading folders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">Folders</h2>
          <p className="text-app/60">Open a folder to view its notes.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowFolderInput((prev) => !prev)}
          className="flex items-center gap-2 rounded-lg bg-primary text-secondary px-4 py-2.5 font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          New folder
        </button>
      </div>

      {showFolderInput && (
        <FolderCreateForm
          folderName={folderName}
          setFolderName={setFolderName}
          creatingFolder={creatingFolder}
          onCreate={handleCreateFolder}
          onCancel={() => {
            setShowFolderInput(false);
            setFolderName("");
          }}
        />
      )}

      {error && (
        <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-sm">
          {error}
        </div>
      )}

      {folders.length === 0 ? (
        <EmptyFoldersState onCreate={() => setShowFolderInput(true)} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
        </div>
      )}
    </div>
  );
}
