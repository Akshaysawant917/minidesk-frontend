export default function WorkLogsHeader({ totalDays }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-2">Work Logs</h2>
        <p className="text-app/60">One reflection per day. Keep it simple.</p>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold text-primary">{totalDays}</div>
        <div className="text-xs text-app/50">Days Logged</div>
      </div>
    </div>
  );
}
