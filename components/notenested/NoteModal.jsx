import { Edit3, Trash2, X } from "lucide-react";

export default function NoteModal({ note, onClose, onEdit, onDelete }) {
  if (!note) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-5xl rounded-2xl border border-app bg-app p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-app/50">Note</p>
            <h3 className="text-3xl font-extrabold text-primary mt-1 leading-tight">
              {note.title || "Untitled note"}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg border border-app hover:bg-secondary cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[70vh] whitespace-pre-wrap break-words rounded-xl bg-secondary p-5 text-base text-app/90 leading-8 tracking-wide">
          {note.content || "No content"}
        </div>

        <div className="flex items-center justify-end gap-3 mt-5">
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-2 rounded-lg border border-app px-4 py-2.5 text-app hover:bg-secondary cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-2 rounded-lg border border-red-500/40 px-4 py-2.5 text-red-500 hover:bg-red-500/10 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
