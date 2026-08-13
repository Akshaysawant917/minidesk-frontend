"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createFolder, getFolders } from "@/api/folders.api";

import { Folder, FolderOpen, Plus, X } from "lucide-react";

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
        <div className="bg-app border border-app rounded-xl p-4 max-w-lg">
          <div className="flex items-center gap-2 mb-3">
            <FolderOpen className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-primary">Create folder</h3>
          </div>

          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Folder name"
            className="w-full bg-secondary border border-app rounded-lg p-3 text-app placeholder:text-app/40 focus:outline-none focus:border-primary"
          />

          <div className="flex items-center gap-3 mt-3">
            <button
              type="button"
              onClick={handleCreateFolder}
              disabled={!folderName.trim() || creatingFolder}
              className="rounded-lg bg-primary text-secondary px-4 py-2.5 font-medium disabled:opacity-50 cursor-pointer"
            >
              {creatingFolder ? "Creating..." : "Create"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowFolderInput(false);
                setFolderName("");
              }}
              className="p-2 rounded-lg border border-app cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-sm">
          {error}
        </div>
      )}

      {folders.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-app rounded-xl bg-app/50">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Folder className="w-10 h-10 text-app/30" />
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">No folders yet</h3>
          <p className="text-app/50 mb-6">Create your first folder to start organizing notes.</p>
          <button
            type="button"
            onClick={() => setShowFolderInput(true)}
            className="inline-flex items-center gap-2 text-primary cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Create folder
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <Link
              key={folder.id}
              href={`/dashboard/notes/${encodeURIComponent(folder.name)}?folderId=${folder.id}`}
              className="group block rounded-xl border border-app bg-app p-5 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Folder className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-primary truncate">{folder.name}</h3>
                    <p className="text-xs text-app/50 mt-1">Open folder</p>
                  </div>
                </div>
                <span className="text-lg text-app/30 group-hover:text-primary transition-colors">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
