'use client';

// import { DashboardLayout } from '@/components/layout/DashboardLayout';
// import { BackgroundPicker } from '@/components/BackgroundPicker';

import {
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  FileText,
  Zap,
  Target,
  Calendar,
  Flame,
  Trophy,
} from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    {
      label: 'Total Tasks',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: CheckCircle2,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Work Hours',
      value: '42.5',
      change: '+8%',
      trend: 'up',
      icon: Clock,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Notes Created',
      value: '18',
      change: '+23%',
      trend: 'up',
      icon: FileText,
      color: 'from-orange-500 to-red-500',
    },
    {
      label: 'Productivity',
      value: '94%',
      change: '+5%',
      trend: 'up',
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const recentActivities = [
    {
      user: 'Sarah Johnson',
      action: 'completed project milestone',
      time: '2 hours ago',
      icon: Trophy,
      color: 'text-yellow-500',
    },
    {
      user: 'Michael Chen',
      action: 'updated design specifications',
      time: '4 hours ago',
      icon: FileText,
      color: 'text-blue-500',
    },
    {
      user: 'Emma Davis',
      action: 'submitted quarterly report',
      time: '6 hours ago',
      icon: CheckCircle2,
      color: 'text-green-500',
    },
    {
      user: 'James Wilson',
      action: 'scheduled team meeting',
      time: '8 hours ago',
      icon: Calendar,
      color: 'text-purple-500',
    },
  ];

  const upcomingTasks = [
    { task: 'Review Q1 marketing strategy', due: 'Today, 3:00 PM', priority: 'high' },
    { task: 'Team sync meeting', due: 'Today, 5:00 PM', priority: 'medium' },
    { task: 'Update client presentation', due: 'Tomorrow, 10:00 AM', priority: 'high' },
    { task: 'Code review PR #234', due: 'Tomorrow, 2:00 PM', priority: 'low' },
  ];

  const quickStats = [
    { label: 'Streak', value: '12 days', icon: Flame, color: 'text-orange-500' },
    { label: 'Goals', value: '8/10', icon: Target, color: 'text-blue-500' },
    { label: 'Focus Time', value: '4.2h', icon: Clock, color: 'text-purple-500' },
  ];

  return (
    <div>


      <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent  p-8">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse [animation-delay:1s]" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-5xl font-bold tracking-tight mb-3 bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text">
              Welcome back, Akshay
            </h1>
            <p className="text-lg text-muted-foreground">
              You're doing great! Here's your productivity overview for today.
            </p>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex gap-3">
            {quickStats.map((stat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all hover:scale-105"
              >
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-sm font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-xl border border-app bg-app p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Gradient background */}
            <div className={`absolute top-0 right-0 w-32 h-32  opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-opacity-10`}>
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {stat.change}
                </div>
              </div>

              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Work Logs Widget */}
        <div className="group rounded-xl border border-app bg-app p-6 hover:shadow-lg hover:shadow-primary/10 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Work Logs
            </h3>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              3 today
            </span>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50 border border-primary/10">
              <span className="text-sm">Project Alpha</span>
              <span className="text-xs text-muted-foreground">2.5h</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50 border border-primary/10">
              <span className="text-sm">Design Review</span>
              <span className="text-xs text-muted-foreground">1.2h</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50 border border-primary/10">
              <span className="text-sm">Code Refactor</span>
              <span className="text-xs text-muted-foreground">3.1h</span>
            </div>
          </div>

          <button className="w-full px-4 py-2.5 rounded-lg bg-primary text-secondary hover:bg-primary/90 transition-all hover:scale-[1.02] font-medium">
            Add Log
          </button>
        </div>

        {/* Todos Widget */}
        <div className="group rounded-xl border border-app bg-app p-6 hover:shadow-lg hover:shadow-primary/10 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Today's Tasks
            </h3>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              5 left
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-all">
              <input type="checkbox" className="h-4 w-4 rounded border-primary/20 text-primary focus:ring-primary" />
              <span className="text-sm flex-1">Finish project outline</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-all">
              <input type="checkbox" className="h-4 w-4 rounded border-primary/20 text-primary focus:ring-primary" defaultChecked />
              <span className="text-sm flex-1 line-through opacity-60">Review pull requests</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-all">
              <input type="checkbox" className="h-4 w-4 rounded border-primary/20 text-primary focus:ring-primary" />
              <span className="text-sm flex-1">Update documentation</span>
            </label>
          </div>

          <button className="w-full px-4 py-2.5 rounded-lg bg-primary text-secondary hover:bg-primary/90 transition-all hover:scale-[1.02] font-medium">
            Add Task
          </button>
        </div>

        {/* Notes Widget */}
        <div className="group rounded-xl border border-app bg-app p-6 hover:shadow-lg hover:shadow-primary/10 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Quick Notes
            </h3>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              8 notes
            </span>
          </div>

          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <p className="text-sm font-medium mb-1">Meeting Ideas</p>
              <p className="text-xs text-muted-foreground">Brainstorm for Q1 strategy...</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
              <p className="text-sm font-medium mb-1">Code Snippets</p>
              <p className="text-xs text-muted-foreground">React hooks optimization...</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <p className="text-sm font-medium mb-1">Design Inspiration</p>
              <p className="text-xs text-muted-foreground">Color palette references...</p>
            </div>
          </div>

          <button className="w-full px-4 py-2.5 rounded-lg bg-primary text-secondary hover:bg-primary/90 transition-all hover:scale-[1.02] font-medium">
            Add Note
          </button>
        </div>
      </div>

      {/* Bottom Section: Activity & Upcoming */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-xl border border-app bg-app p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent Activity
          </h3>

          <div className="space-y-4">
            {recentActivities.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-all group"
              >
                <div className={`p-2 rounded-lg bg-accent group-hover:scale-110 transition-transform ${activity.color}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>
                    {' '}{activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="rounded-xl border border-app bg-app p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Upcoming Tasks
          </h3>

          <div className="space-y-3">
            {upcomingTasks.map((task, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg border border-app hover:border-primary/40 transition-all hover:shadow-md"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">{task.task}</p>
                  <p className="text-xs text-muted-foreground">{task.due}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${task.priority === 'high'
                      ? 'bg-red-500/10 text-red-500'
                      : task.priority === 'medium'
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'bg-blue-500/10 text-blue-500'
                    }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}