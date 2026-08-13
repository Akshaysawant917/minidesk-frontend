import { Calendar, Clock } from "lucide-react";
import TodoItem from "@/components/todos/TodoItem";

const toneStyles = {
  high: { iconBg: "bg-primary/10", iconColor: "text-primary", icon: Calendar },
  medium: { iconBg: "bg-blue-500/10", iconColor: "text-blue-500", icon: Clock },
  low: { iconBg: "bg-gray-500/10", iconColor: "text-gray-500", icon: Clock },
};

export default function TodoColumn({
  title,
  subtitle,
  count,
  tone,
  emptyTitle,
  emptyHint,
  todos,
  onToggleDone,
  onMove,
  menuTodoId,
  setMenuTodoId,
}) {
  const style = toneStyles[tone] || toneStyles.high;
  const Icon = style.icon;

  return (
    <section className="bg-app border border-app rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 ${style.iconBg} rounded-lg flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${style.iconColor}`} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary">{title}</h3>
            <p className="text-xs text-app/50">{subtitle}</p>
          </div>
        </div>
        <span className="text-sm px-3 py-1 bg-secondary rounded-full text-app/70">
          {count} {count === 1 ? "task" : "tasks"}
        </span>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon className="w-8 h-8 text-app/30" />
          </div>
          <p className="text-app/50 text-sm">{emptyTitle}</p>
          <p className="text-app/30 text-xs mt-1">{emptyHint}</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleDone={onToggleDone}
              onMove={onMove}
              menuTodoId={menuTodoId}
              setMenuTodoId={setMenuTodoId}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
