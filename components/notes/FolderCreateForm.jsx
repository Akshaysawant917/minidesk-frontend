import { FolderOpen, Plus, X } from "lucide-react";

export default function FolderCreateForm({
  folderName,
  setFolderName,
  creatingFolder,
  onCreate,
  onCancel,
}) {
  return (
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
          onClick={onCreate}
          disabled={!folderName.trim() || creatingFolder}
          className="rounded-lg bg-primary text-secondary px-4 py-2.5 font-medium disabled:opacity-50 cursor-pointer"
        >
          {creatingFolder ? "Creating..." : "Create"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-lg border border-app cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
