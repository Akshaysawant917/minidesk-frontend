import { Plus } from "lucide-react";

export default function BookmarkModal({
  show,
  title,
  setTitle,
  url,
  setUrl,
  error,
  creating,
  onSubmit,
  onClose,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-app bg-white p-5 shadow-xl dark:bg-[#0b1220]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primary">Add New Bookmark</h3>
            <p className="text-sm text-app/60">Save a link for quick access</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-app/60 hover:bg-app/10">
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-app/80">URL</label>
            <input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border border-app bg-app px-4 py-2.5 text-app placeholder:text-app/40 focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-app/80">Title</label>
            <input
              type="text"
              placeholder="e.g., GitHub"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-app bg-app px-4 py-2.5 text-app placeholder:text-app/40 focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={creating || !title.trim() || !url.trim()}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-secondary transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {creating ? "Adding..." : "Save Bookmark"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-app px-4 py-2.5 text-sm font-medium text-app/70"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
