export default function TodoStats({ totalHigh, totalMedium, totalLow, totalCompleted }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-primary">{totalHigh}</div>
        <div className="text-xs text-app/50">High</div>
      </div>
      <div className="w-px h-8 bg-app/20"></div>
      <div className="text-center">
        <div className="text-2xl font-bold text-app/60">{totalMedium}</div>
        <div className="text-xs text-app/50">Medium</div>
      </div>
      <div className="w-px h-8 bg-app/20"></div>
      <div className="text-center">
        <div className="text-2xl font-bold text-app/60">{totalLow}</div>
        <div className="text-xs text-app/50">Low</div>
      </div>
      <div className="w-px h-8 bg-app/20"></div>
      <div className="text-center">
        <div className="text-2xl font-bold text-emerald-500">{totalCompleted}</div>
        <div className="text-xs text-app/50">Done</div>
      </div>
    </div>
  );
}
