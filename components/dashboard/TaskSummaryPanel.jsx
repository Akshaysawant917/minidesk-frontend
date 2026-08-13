import { CheckCircle2 } from "lucide-react";

export default function TaskSummaryPanel({ items, count, onViewAll }) {
  return (
    <div className="bg-app border border-app rounded-xl p-6 hover:border-primary/30 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          High Priority
        </h3>
        <span className="text-xs bg-secondary px-3 py-1 rounded-full text-app/70">
          {count} tasks
        </span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8 text-app/30" />
          </div>
          <p className="text-app/50 text-sm">No high priority tasks</p>
          <p className="text-app/30 text-xs mt-1">Perfect! Everything is under control</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((todo) => (
            <li
              key={todo.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-app bg-secondary/30"
            >
              <span className="text-sm text-app/80">{todo.content}</span>
            </li>
          ))}
        </ul>
      )}

      {count > items.length && (
        <p
          className="text-xs text-primary text-center mt-4 cursor-pointer hover:underline"
          onClick={onViewAll}
        >
          View all high priority tasks →
        </p>
      )}
    </div>
  );
}
