import Link from "next/link";
import { Folder } from "lucide-react";

export default function FolderCard({ folder }) {
  return (
    <Link
      href={`/dashboard/notes/${encodeURIComponent(folder.name)}?folderId=${folder.id}`}
      className="group block rounded-xl border border-app bg-app p-5 transition-all hover:border-primary/30 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Folder className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-primary truncate">{folder.name}</h3>
            <p className="text-xs text-app/50 mt-1">Open folder</p>
          </div>
        </div>
        <span className="text-lg text-app/30 group-hover:text-primary transition-colors">→</span>
      </div>
    </Link>
  );
}
