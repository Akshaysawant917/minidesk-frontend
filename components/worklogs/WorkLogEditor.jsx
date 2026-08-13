import { Save, Sparkles, CheckCircle2 } from "lucide-react";

export default function WorkLogEditor({
  content,
  setContent,
  handleEditorKeyDown,
  handleEditorFocus,
  textareaRef,
  handleSave,
  saving,
  todayLogId,
  error,
}) {
  const isDisabled = saving || !content.replace(/[-\s\r\n]+/g, "").trim();

  return (
    <div className="bg-gradient-to-br from-primary/5 to-transparent p-6 rounded-xl border-2 border-primary/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-primary rounded-xl flex flex-col items-center justify-center text-secondary">
          <span className="text-xs font-medium">
            {new Date().toLocaleDateString("en-US", { weekday: "short" })}
          </span>
          <span className="text-lg font-bold">{new Date().getDate()}</span>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
            Today&apos;s Work Log
            {todayLogId && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          </h3>
          <p className="text-sm text-app/60">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {content.trim() && <Sparkles className="w-5 h-5 text-primary/50" />}
      </div>

      <textarea
        placeholder="What did you work on today? What went well? What could be better?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleEditorKeyDown}
        onFocus={handleEditorFocus}
        ref={textareaRef}
        rows={6}
        className="w-full bg-app border border-app rounded-lg p-4 text-app placeholder:text-app/40 focus:outline-none focus:border-primary transition-colors resize-none"
        autoFocus
      />

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={handleSave}
          disabled={isDisabled}
          className="flex items-center gap-2 bg-primary text-secondary px-6 py-2.5 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : todayLogId ? "Update Todays Log" : "Save Todays log"}
        </button>

        <div className="text-xs text-app/40">{content.length} characters</div>

        {todayLogId && (
          <div className="ml-auto flex items-center gap-2 text-sm text-emerald-500">
            <CheckCircle2 className="w-4 h-4" />
            <span>Saved</span>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
