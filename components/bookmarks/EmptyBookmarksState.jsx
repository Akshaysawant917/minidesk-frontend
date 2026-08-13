import { Bookmark } from "lucide-react";

export default function EmptyBookmarksState() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
        <Bookmark className="w-10 h-10 text-app/30" />
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">No bookmarks yet</h3>
      <p className="text-app/50">Start adding links to your collection</p>
    </div>
  );
}
