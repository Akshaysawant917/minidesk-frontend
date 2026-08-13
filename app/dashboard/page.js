"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDashboardCharts, getDashboardSummary } from "@/api/dashboard.api";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import NotesPanel from "@/components/dashboard/NotesPanel";
import PendingByTagChart from "@/components/dashboard/PendingByTagChart";
import StatCard from "@/components/dashboard/StatCard";
import TaskProgressChart from "@/components/dashboard/TaskProgressChart";
import TaskSummaryPanel from "@/components/dashboard/TaskSummaryPanel";
import WorkLogsPanel from "@/components/dashboard/WorkLogsPanel";
import {
  CheckCircle2,
  FileText,
  Clock,
  Calendar,
  Edit3,
} from "lucide-react";

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

  const workLogChartData = [...workLogs]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7)
    .map((log) => ({
      day: new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      count: 1,
    }));

  return (
    <div className="space-y-2 animate-fadeIn">
      <DashboardHeader />

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
        <TaskProgressChart
          chartRange={chartRange}
          setChartRange={setChartRange}
          trend={trend}
          chartLoading={chartLoading}
        />

        <PendingByTagChart
          pendingByTag={pendingByTag}
          chartLoading={chartLoading}
        />
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <TaskSummaryPanel
          items={todayTodos}
          count={todayCount}
          onViewAll={() => router.push("/dashboard/todos")}
        />

        <NotesPanel
          items={notes}
          onViewAll={() => router.push("/dashboard/notes")}
        />

        <WorkLogsPanel
          items={workLogs}
          onViewAll={() => router.push("/dashboard/worklogs")}
        />
      </div>
    </div>
  );
}
