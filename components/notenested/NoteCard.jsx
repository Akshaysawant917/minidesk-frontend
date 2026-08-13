import { FileText } from "lucide-react";

export default function NoteCard({ note, onOpen }) {
  const preview = (note.content || "").replace(/\s+/g, " ").trim();

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full rounded-2xl border border-app bg-app p-4 text-left transition-all hover:border-primary/30 hover:shadow-md cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <span className="font-bold text-primary truncate text-lg leading-snug">
            {note.title || "Untitled note"}
          </span>
        </div>

        <span className="text-[11px] text-app/45 shrink-0 pt-1">
          {new Date(note.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      <p className="mt-3 text-xs text-app/60 leading-5 line-clamp-3">
        {preview || "No preview available"}
      </p>
    </button>
  );
}
