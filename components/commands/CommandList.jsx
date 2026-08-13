import { Copy, Trash2 } from "lucide-react";

export default function CommandList({ commands, copied, onCopy, onDelete }) {
  if (commands.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <Copy className="w-10 h-10 text-app/30" />
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">No commands yet</h3>
        <p className="text-app/50">Start saving your favorite commands</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {commands.map((cmd) => (
        <div
          key={cmd.id}
          className="group bg-app border border-app rounded-lg p-3 hover:border-primary/30 transition-all flex items-center justify-between gap-3"
        >
          <code className="flex-1 min-w-0 rounded-md bg-secondary/30 px-2 py-2 text-xs text-app/90 break-all font-mono leading-relaxed">
            {cmd.command}
          </code>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onCopy(cmd.command, cmd.id)}
              className={`p-2 rounded transition-all cursor-pointer ${
                copied === cmd.id
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "text-app/50 hover:text-app hover:bg-secondary"
              }`}
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDelete(cmd.id)}
              className="p-2 rounded text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
              title="Delete command"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
