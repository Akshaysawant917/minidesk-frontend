import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function TaskProgressChart({ chartRange, setChartRange, trend, chartLoading }) {
  return (
    <div className="rounded-2xl border border-app bg-app p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="text-xl font-semibold text-primary">Task progress</h3>
        <div className="inline-flex rounded-lg border border-app bg-secondary p-1">
          {['7d', '30d'].map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setChartRange(range)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer ${
                chartRange === range ? "bg-primary text-secondary" : "text-app/70"
              }`}
            >
              {range === "7d" ? "7 days" : "30 days"}
            </button>
          ))}
        </div>
      </div>

      {chartLoading ? (
        <div className="h-64 flex items-center justify-center text-app/50 text-sm">Loading chart...</div>
      ) : trend.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-app/50 text-sm">No data yet</div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={11} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
