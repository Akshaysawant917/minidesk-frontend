import { Bookmark, Link as LinkIcon, Trash2 } from "lucide-react";

export default function BookmarkGrid({
  bookmarks,
  contextMenu,
  onOpenBookmark,
  onContextMenu,
  onDeleteFromContext,
}) {
  const getFaviconUrl = (urlStr) => {
    try {
      const url = new URL(urlStr);
      return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`;
    } catch {
      return null;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Bookmark className="w-5 h-5 text-app/60" />
        <h3 className="text-xl font-semibold text-primary">Your Bookmarks</h3>
        <span className="text-sm text-app/50">({bookmarks.length})</span>
      </div>

      <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
        {bookmarks.map((bookmark) => (
          <button
            key={bookmark.id}
            type="button"
            onClick={() => window.open(bookmark.url, "_blank", "noopener,noreferrer")}
            onContextMenu={(e) => onContextMenu(e, bookmark)}
            className="group aspect-square rounded-md border border-app bg-app/70 p-1 text-center transition-all hover:border-primary/30 hover:bg-app"
          >
            <div className="flex h-full flex-col items-center justify-center">
              <img
                src={getFaviconUrl(bookmark.url)}
                alt="favicon"
                className="h-16 w-16 rounded-md"
                onError={(e) => {
                  e.target.style.display = "none";
                  if (e.target.nextElementSibling) {
                    e.target.nextElementSibling.style.display = "flex";
                  }
                }}
              />
              <div
                className="hidden h-7 w-7 items-center justify-center rounded-md bg-primary/10"
                key={`fallback-${bookmark.id}`}
              >
                <LinkIcon className="h-4 w-4 text-primary" />
              </div>

              <h4 className="mt-0.5 line-clamp-1 text-[10px] font-semibold text-primary">
                {bookmark.title}
              </h4>
            </div>
          </button>
        ))}
      </div>

      {contextMenu && (
        <div
          className="fixed z-[60] rounded-lg border border-app bg-white p-1.5 shadow-lg dark:bg-[#0b1220]"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            type="button"
            onClick={() => onDeleteFromContext(contextMenu.bookmarkId)}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 transition-all hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
