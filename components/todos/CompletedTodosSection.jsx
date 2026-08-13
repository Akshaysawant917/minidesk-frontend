import { CheckCircle2 } from "lucide-react";

export default function CompletedTodosSection({ items, hasMore, loading, onLoadMore }) {
  return (
    <section className="bg-app border border-app rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary">Completed</h3>
            <p className="text-xs text-app/50">Well done!</p>
          </div>
        </div>
        <span className="text-sm px-3 py-1 bg-emerald-500/10 rounded-full text-emerald-500">
          {items.length} done
        </span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8 text-app/30" />
          </div>
          <p className="text-app/50 text-sm">No completed tasks yet</p>
          <p className="text-app/30 text-xs mt-1">Start checking things off!</p>
        </div>
      ) : (
        <>
          <ul className="space-y-2">
            {items.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 p-4 rounded-lg border border-app/50 bg-secondary/20"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="flex-1 text-app/40 line-through">
                  {todo.content}
                </span>
              </li>
            ))}
          </ul>

          {hasMore && (
            <button
              onClick={onLoadMore}
              disabled={loading}
              className="mt-4 w-full py-3 text-sm text-primary hover:text-primary/80 font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load more completed tasks"}
            </button>
          )}
        </>
      )}
    </section>
  );
}
