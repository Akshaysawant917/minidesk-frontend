import { Plus, Sparkles } from "lucide-react";

export default function TodoForm({
  text,
  setText,
  tag,
  setTag,
  status,
  setStatus,
  handleCreate,
  creating,
  error,
}) {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-transparent">
      <form onSubmit={handleCreate} className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-app border border-app rounded-lg px-4 py-3 text-app placeholder:text-app/40 focus:outline-none focus:border-primary transition-colors"
            autoFocus
          />
          {text.trim() && (
            <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          )}
        </div>

        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="bg-app border border-app rounded-lg px-4 py-3 text-app focus:outline-none focus:border-primary transition-colors cursor-pointer"
        >
          <option value="personal">Personal</option>
          <option value="freelance">Freelance</option>
          <option value="work">Work</option>
          <option value="project1">Project1</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-app border border-app rounded-lg px-4 py-3 text-app focus:outline-none focus:border-primary transition-colors cursor-pointer"
        >
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <button
          type="submit"
          disabled={creating || !text.trim()}
          className="flex items-center gap-2 bg-primary text-secondary px-6 py-3 rounded-lg font-medium disabled:cursor-not-allowed transition-all"
        >
          <Plus className="w-4 h-4" />
          {creating ? "Adding..." : "Add"}
        </button>
      </form>

      {error && (
        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
