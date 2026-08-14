import { ArrowLeft, Sparkles } from "lucide-react";

export default function ChatHeader({ onBack }) {
  return (
    <header className="border-b border-app bg-app/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-tight text-app">Ask MiniDesk</h1>
            <p className="text-xs text-app/60">Your personal productivity assistant</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg border border-app bg-secondary/50 px-3 py-2 text-sm text-app/80 transition-colors hover:border-primary/30 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </button>
      </div>
    </header>
  );
}
