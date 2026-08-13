export default function CommandModal({
  isOpen,
  commandText,
  setCommandText,
  error,
  saving,
  onSubmit,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-app bg-app p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-primary">Add Command</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-app/50 hover:text-primary transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <textarea
            placeholder="Paste your command here..."
            value={commandText}
            onChange={(e) => setCommandText(e.target.value)}
            className="w-full bg-secondary/10 border border-app rounded-lg p-4 text-app placeholder:text-app/40 focus:outline-none focus:border-primary transition-colors resize-none"
            rows={5}
          />

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-app text-app/70 hover:text-primary transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !commandText.trim()}
              className="bg-primary text-secondary px-5 py-2.5 rounded-lg font-medium disabled:cursor-not-allowed disabled:opacity-60 transition-all cursor-pointer"
            >
              {saving ? "Saving..." : "Save Command"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
