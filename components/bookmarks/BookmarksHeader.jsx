import { Bookmark, Plus } from "lucide-react";

export default function BookmarksHeader({ bookmarksCount, onAddBookmark }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-2">Bookmarks</h2>
        <p className="text-app/60">Save and organize your favorite links</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{bookmarksCount}</div>
          <div className="text-xs text-app/50">Saved</div>
        </div>
        <button
          onClick={onAddBookmark}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-secondary transition-all hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Add Bookmark
        </button>
      </div>
    </div>
  );
}
