import { Folder, Plus } from "lucide-react";

export default function EmptyFolderNotesState({ onAddNote }) {
  return (
    <div className="text-center py-16 border border-dashed border-app rounded-xl">
      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
        <Folder className="w-10 h-10 text-app/30" />
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">No notes in this folder</h3>
      <p className="text-app/50 mb-6">Create your first note for this folder.</p>
      <button
        type="button"
        onClick={onAddNote}
        className="inline-flex items-center gap-2 text-primary cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        Add note
      </button>
    </div>
  );
}
