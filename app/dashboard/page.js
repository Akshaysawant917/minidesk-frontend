"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDashboardCharts, getDashboardSummary } from "@/api/dashboard.api";
import {
  CheckCircle2,
  FileText,
  Clock,
  Calendar,
  Edit3,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART_COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#a78bfa"];

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [chartRange, setChartRange] = useState("7d");
  const [chartLoading, setChartLoading] = useState(true);

  const [todayTodos, setTodayTodos] = useState([]);
  const [todayCount, setTodayCount] = useState(0);

  const [notes, setNotes] = useState([]);
  const [notesCount, setNotesCount] = useState(0);

  const [workLogs, setWorkLogs] = useState([]);
  const [workLogsCount, setWorkLogsCount] = useState(0);

  const [trend, setTrend] = useState([]);
  const [pendingByTag, setPendingByTag] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboardSummary();

        setTodayTodos(data.todos.todayItems || []);
        setTodayCount(data.todos.todayCount || 0);

        setNotes(data.notes.latest || []);
        setNotesCount(data.notes.count || 0);

        setWorkLogs(data.workLogs.latest || []);
        setWorkLogsCount(data.workLogs.count || 0);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const loadCharts = async () => {
      try {
        setChartLoading(true);
        const data = await getDashboardCharts(chartRange);
        setTrend(data.trend || []);
        setPendingByTag(data.pendingByTag || []);
      } catch {
        setTrend([]);
        setPendingByTag([]);
      } finally {
        setChartLoading(false);
      }
    };

    loadCharts();
  }, [chartRange]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-app/60">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const workLogChartData = [...workLogs]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7)
    .map((log) => ({
      day: new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      count: 1,
    }));

  return (
    <div className="space-y-2 animate-fadeIn">

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-app p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-app/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">{dayName} 👋</h1>
          <p className="text-app/80 text-lg mb-1">{dateStr}</p>
          <p className="text-app/60">Prioritize and manage your work effectively</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={CheckCircle2}
          label="High Priority Tasks"
          value={todayCount}
          sub={`${todayCount} pending`}
          color="emerald"
        />

        <StatCard
          icon={FileText}
          label="Quick Notes"
          value={notesCount}
          sub="Total notes captured"
          color="blue"
        />

        <StatCard
          icon={Calendar}
          label="Work Days"
          value={workLogsCount}
          sub="Days logged this month"
          color="purple"
          chartData={workLogChartData}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
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
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* High Priority Todos */}
        <div className="bg-app border border-app rounded-xl p-6 hover:border-primary/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              High Priority
            </h3>
            <span className="text-xs bg-secondary px-3 py-1 rounded-full text-app/70">
              {todayCount} tasks
            </span>
          </div>

          {todayTodos.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8 text-app/30" />
              </div>
              <p className="text-app/50 text-sm">No high priority tasks</p>
              <p className="text-app/30 text-xs mt-1">Perfect! Everything is under control</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {todayTodos.map(todo => (
                <li
                  key={todo.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-app bg-secondary/30"
                >
                  <span className="text-sm text-app/80">{todo.content}</span>
                </li>
              ))}
            </ul>
          )}

          {todayCount > todayTodos.length && (
            <p
              className="text-xs text-primary text-center mt-4 cursor-pointer hover:underline"
              onClick={() => router.push("/dashboard/todos")}
            >
              View all high priority tasks →
            </p>
          )}
        </div>

        {/* Recent Notes */}
        <div className="bg-app border border-app rounded-xl p-6 hover:border-primary/30 transition-all">
          <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-4">
            <Edit3 className="w-5 h-5" />
            Recent Notes
          </h3>

          {notes.length === 0 ? (
            <p className="text-app/50 text-sm">No notes yet</p>
          ) : (
            <ul className="space-y-3">
              {notes.map(note => (
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
            onClick={() => router.push("/dashboard/notes")}
          >
            View all notes →
          </p>
        </div>

        {/* Work Logs */}
        <div className="bg-app border border-app rounded-xl p-6 hover:border-primary/30 transition-all">
          <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5" />
            Work Logs
          </h3>

          {workLogs.length === 0 ? (
            <p className="text-app/50 text-sm">No work logs yet</p>
          ) : (
            <ul className="space-y-3">
              {workLogs.map(log => (
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
            onClick={() => router.push("/dashboard/worklogs")}
          >
            View all work logs →
          </p>
        </div>

      </div>
    </div>
  );
}

/* ---------- Stat Card ---------- */

function StatCard({ icon: Icon, label, value, sub, color, chartData = null }) {
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
