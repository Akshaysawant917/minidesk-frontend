import { Sparkles } from "lucide-react";

const promptSuggestions = [
  "What did I work on this week?",
  "What are my pending tasks?",
  "Find my notes about MiniDesk",
  "Give me a summary of my recent work",
];

export default function EmptyState({ onSelectPrompt }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Sparkles className="h-7 w-7" />
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-app">How can I help?</h2>

        <div className="mt-7 grid gap-3 text-left sm:grid-cols-2">
          {promptSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSelectPrompt(suggestion)}
              className="rounded-xl border border-app bg-secondary/20 px-4 py-3 text-sm text-app/80 transition-colors hover:border-primary/30 hover:bg-secondary/40 hover:text-primary"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
