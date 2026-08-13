import { Bar, BarChart, ResponsiveContainer } from "recharts";

export default function StatCard({ icon: Icon, label, value, sub, color, chartData = null }) {
  const colorClasses = {
    emerald: "text-emerald-500 bg-emerald-500/10",
    blue: "text-blue-500 bg-blue-500/10",
    purple: "text-purple-500 bg-purple-500/10",
  };

  const chartColors = {
    emerald: "#10b981",
    blue: "#3b82f6",
    purple: "#8b5cf6",
  };

  return (
    <div className="bg-app border border-app rounded-xl p-6">
      <div className={`p-3 rounded-lg inline-flex ${colorClasses[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-sm text-app/60 mt-3">{label}</p>
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="text-xs text-app/50">
        {value === 0 && label === "Work Days" ? "Bro, are you even working? 😬" : sub}
      </p>

      {chartData && chartData.length > 0 ? (
        <div className="mt-4 h-14">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={8} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <Bar dataKey="count" radius={[4, 4, 0, 0]} fill={chartColors[color]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : null}
    </div>
  );
}
