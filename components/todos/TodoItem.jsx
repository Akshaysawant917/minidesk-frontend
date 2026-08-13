import { CheckCircle2, ChevronRight } from "lucide-react";

const getTagBorderClass = (tag) => {
  switch (tag) {
    case "work":
      return "border-blue-500/50";
    case "freelance":
      return "border-purple-500/50";
    case "project1":
      return "border-amber-500/50";
    default:
      return "border-primary/40";
  }
};

const getMoveOptions = (status) => {
  if (status === "high") return ["medium", "low"];
  if (status === "medium") return ["high", "low"];
  return ["high", "medium"];
};

export default function TodoItem({ todo, onToggleDone, onMove, menuTodoId, setMenuTodoId }) {
  const isMenuOpen = menuTodoId === todo.id;
  const moveOptions = getMoveOptions(todo.status);

  return (
    <li
      key={todo.id}
      className={`group relative flex items-center gap-3 p-4 rounded-lg border ${getTagBorderClass(todo.tag)} hover:border-primary/30 bg-secondary/30 hover:bg-secondary/50 transition-all`}
    >
      <button
        onClick={() => onToggleDone(todo)}
        className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-app hover:border-emerald-500 hover:bg-emerald-500/10 transition-all flex items-center justify-center group/check"
        aria-label="Mark as complete"
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-0 group-hover/check:opacity-100 transition-opacity" />
      </button>

      <span className="flex-1 text-app/90 group-hover:text-primary transition-colors">
        {todo.content}
      </span>

      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => setMenuTodoId(isMenuOpen ? null : todo.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-app/60 hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
          aria-label="Open task actions"
        >
          <span className="flex flex-col gap-[2px]">
            <span className="block h-[3px] w-[3px] rounded-full bg-current" />
            <span className="block h-[3px] w-[3px] rounded-full bg-current" />
            <span className="block h-[3px] w-[3px] rounded-full bg-current" />
          </span>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-10 z-50 min-w-[130px] rounded-lg border border-app/40 bg-app shadow-xl p-2">
            <p className="px-2 pb-2 text-[10px] uppercase tracking-wide text-app/40">
              Move to
            </p>
            {moveOptions.map((targetStatus) => (
              <button
                key={targetStatus}
                onClick={() => onMove(todo, targetStatus)}
                className="w-full flex items-center justify-between gap-2 rounded-md px-2 py-2 text-sm text-app/80 hover:bg-secondary transition-colors cursor-pointer"
              >
                <span className="capitalize">{targetStatus}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
