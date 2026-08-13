import { Edit3 } from "lucide-react";

export default function NotesPanel({ items, onViewAll }) {
  return (
    <div className="bg-app border border-app rounded-xl p-6 hover:border-primary/30 transition-all">
      <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-4">
        <Edit3 className="w-5 h-5" />
        Recent Notes
      </h3>

      {items.length === 0 ? (
        <p className="text-app/50 text-sm">No notes yet</p>
      ) : (
        <ul className="space-y-3">
          {items.map((note) => (
            <li key={note.id} className="border border-app rounded-lg p-4">
              <p className="text-sm font-semibold text-primary">
                {note.title || "Untitled Note"}
              </p>
              <p className="text-xs text-app/60 line-clamp-2">
                {note.content}
              </p>
            </li>
          ))}
        </ul>
      )}

      <p
        className="text-xs text-primary text-center mt-4 cursor-pointer hover:underline"
        onClick={onViewAll}
      >
        View all notes →
      </p>
    </div>
  );
}
