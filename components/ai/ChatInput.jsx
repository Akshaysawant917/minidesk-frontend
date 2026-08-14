import { ArrowUp, LoaderCircle } from "lucide-react";

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="sticky bottom-0 border-t border-app bg-app/90 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
        <div className="flex items-end gap-3 rounded-2xl border border-app bg-secondary/20 p-2 shadow-sm">
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask MiniDesk anything..."
            className="max-h-32 min-h-[48px] w-full resize-none bg-transparent px-3 py-3 text-sm text-app placeholder:text-app/40 focus:outline-none"
          />

          <button
            type="button"
            onClick={onSend}
            disabled={disabled || !value.trim()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-secondary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
          >
            {disabled ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
