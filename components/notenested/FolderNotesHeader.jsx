import { ArrowLeft, Plus } from "lucide-react";

export default function FolderNotesHeader({ folderName, onBack, onAddNote }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-lg border border-app bg-app px-3 py-2 text-app/80 hover:text-primary hover:border-primary/40 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        All folders
      </button>

      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">{folderName}</h2>
          <p className="text-app/60">Folder notes</p>
        </div>

        <button
          type="button"
          onClick={onAddNote}
          className="flex items-center gap-2 rounded-lg bg-primary text-secondary px-4 py-2.5 font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add note
        </button>
      </div>
    </div>
  );
}
