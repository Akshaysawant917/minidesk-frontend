"use client";

import { ArrowUpRight } from "lucide-react";

export default function AskMiniDeskCard({ value, onChange, onSubmit }) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-primary/20 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.06),_transparent_42%),linear-gradient(135deg,#111827_0%,#1f2937_45%,#0f172a_100%)] p-4 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.9)] ring-1 ring-white/10 sm:p-5">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-12 left-6 h-28 w-28 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white shadow-inner ring-1 ring-white/15">
            <ArrowUpRight className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">Ask MiniDesk</p>
            <p className="mt-1 text-sm text-slate-200">Get quick answers from your workspace</p>
            <label htmlFor="ask-minidesk" className="sr-only">Ask MiniDesk</label>
          </div>
        </div>

        <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-2 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm sm:max-w-xl sm:flex-1">
          <input
            id="ask-minidesk"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onSubmit();
              }
            }}
            placeholder="Ask MiniDesk anything..."
            className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-slate-300/80 focus:outline-none"
          />

          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-900 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            aria-label="Ask MiniDesk"
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
