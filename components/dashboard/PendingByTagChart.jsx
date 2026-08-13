import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const CHART_COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#a78bfa"];

export default function PendingByTagChart({ pendingByTag, chartLoading }) {
  return (
    <div className="rounded-2xl border border-app bg-app p-5">
      <h3 className="text-xl font-semibold text-primary mb-4">Pending by tag</h3>

      {chartLoading ? (
        <div className="h-64 flex items-center justify-center text-app/50 text-sm">Loading chart...</div>
      ) : pendingByTag.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-app/50 text-sm">No tag data</div>
      ) : (
        <>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pendingByTag}
                  dataKey="count"
                  nameKey="tag"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={3}
                >
                  {pendingByTag.map((entry, index) => (
                    <Cell key={`${entry.tag}-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 space-y-2">
            {pendingByTag.map((item, index) => (
              <div key={`${item.tag}-${index}`} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                  <span className="text-app/80">{item.tag}</span>
                </div>
                <span className="font-medium text-primary">{item.count}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
