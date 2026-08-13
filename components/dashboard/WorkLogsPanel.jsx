import { Clock } from "lucide-react";

export default function WorkLogsPanel({ items, onViewAll }) {
  return (
    <div className="bg-app border border-app rounded-xl p-6 hover:border-primary/30 transition-all">
      <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5" />
        Work Logs
      </h3>

      {items.length === 0 ? (
        <p className="text-app/50 text-sm">No work logs yet</p>
      ) : (
        <ul className="space-y-3">
          {items.map((log) => (
            <li key={log.id} className="border border-app rounded-lg p-4">
              <p className="text-xs text-app/60 mb-1">
                {new Date(log.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-app/80 line-clamp-2">
                {log.content}
              </p>
            </li>
          ))}
        </ul>
      )}

      <p
        className="text-xs text-primary text-center mt-4 cursor-pointer hover:underline"
        onClick={onViewAll}
      >
        View all work logs →
      </p>
    </div>
  );
}
