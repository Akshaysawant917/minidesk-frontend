import { Clock, ChevronDown } from "lucide-react";

export default function WorkLogPastList({
  pastLogs,
  renderLogContent,
  formatDate,
  getDayOfWeek,
  getDateNumber,
  hasMore,
  loadingMore,
  loadMoreLogs,
}) {
  return (
    <>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-app/60" />
          <h3 className="text-xl font-semibold text-primary">Past Logs</h3>
          <span className="text-sm text-app/50">({pastLogs.length} days)</span>
        </div>

        <div className="space-y-3">
          {pastLogs.map((log) => (
            <div
              key={log.id}
              className="group bg-app border border-app rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-secondary rounded-lg flex flex-col items-center justify-center border border-app group-hover:border-primary/30 transition-colors">
                  <span className="text-xs font-medium text-app/60">
                    {getDayOfWeek(log.date)}
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {getDateNumber(log.date)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-primary">{formatDate(log.date)}</h4>
                    <span className="text-xs text-app/40">
                      {new Date(log.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {renderLogContent(log.content)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={loadMoreLogs}
            disabled={loadingMore}
            className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-app border border-app rounded-lg text-app/80 hover:text-primary font-medium transition-all disabled:opacity-50"
          >
            {loadingMore ? (
              <>
                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span>Load More Logs</span>
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
