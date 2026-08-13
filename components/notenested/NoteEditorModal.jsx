import { Save, X } from "lucide-react";

export default function NoteEditorModal({
  editingId,
  draftTitle,
  setDraftTitle,
  draftContent,
  setDraftContent,
  onClose,
  onSave,
  saving,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl rounded-2xl border border-app bg-app p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-primary">
            {editingId ? "Edit note" : "Add note"}
          </h3>

          <button
            type="button"
            onClick={onClose}
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
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-app hover:bg-secondary cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!draftTitle.trim() || !draftContent.trim() || saving}
            onClick={onSave}
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
  );
}
