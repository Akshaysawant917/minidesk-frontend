"use client";

import { useEffect, useState } from "react";
import { saveCommand, getCommands, deleteCommand } from "@/api/commands.api";
import { Copy, Trash2 } from "lucide-react";

export default function CommandsPage() {
  const [commands, setCommands] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [commandText, setCommandText] = useState("");
  const [copied, setCopied] = useState(null);

  const loadCommands = async () => {
    try {
      const data = await getCommands({ limit: 30 });
      setCommands(data.items || []);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (e) {
      setError("Failed to load commands");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCommands();
  }, []);

  const loadMore = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    try {
      const data = await getCommands({ limit: 30, cursor });
      setCommands((p) => [...p, ...(data.items || [])]);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch {
      setError("Failed to load more commands");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSave = async (e) => {
    e?.preventDefault();
    if (!commandText.trim()) return;

    setSaving(true);
    setError("");

    try {
      const cmd = await saveCommand(commandText);
      setCommands((p) => [cmd, ...p]);
      setCommandText("");
    } catch {
      setError("Failed to save command");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this command?")) return;

    try {
      await deleteCommand(id);
      setCommands((p) => p.filter((c) => c.id !== id));
    } catch {
      setError("Failed to delete command");
    }
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-app/60">Loading commands...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">Commands</h2>
          <p className="text-app/60">Save and manage your frequently used commands</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{commands.length}</div>
          <div className="text-xs text-app/50">Commands</div>
        </div>
      </div>

      {/* Save Command Form */}
      <div className="bg-gradient-to-br from-primary/5 to-transparent p-6 rounded-xl border border-app">
        <h3 className="font-semibold text-primary mb-3">Add Command</h3>
        <form onSubmit={handleSave} className="space-y-3">
          <textarea
            placeholder="Paste your command here..."
            value={commandText}
            onChange={(e) => setCommandText(e.target.value)}
            className="w-full bg-app border border-app rounded-lg p-4 text-app placeholder:text-app/40 focus:outline-none focus:border-primary transition-colors resize-none"
            rows={3}
          />

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={saving || !commandText.trim()}
            className="bg-primary text-secondary px-6 py-2.5 rounded-lg font-medium disabled:cursor-not-allowed disabled:opacity-60 transition-all"
          >
            {saving ? "Saving..." : "Save Command"}
          </button>
        </form>
      </div>

      {/* Commands List */}
      {commands.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Copy className="w-10 h-10 text-app/30" />
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">No commands yet</h3>
          <p className="text-app/50">Start saving your favorite commands above</p>
        </div>
      ) : (
        <div className="space-y-2">
          {commands.map((cmd) => (
            <div
              key={cmd.id}
              className="group bg-app border border-app rounded-lg p-4 hover:border-primary/30 transition-all flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <code className="text-sm text-app/90 break-all block font-mono bg-secondary/30 p-3 rounded">
                  {cmd.command}
                </code>
                {cmd.createdAt && (
                  <p className="text-xs text-app/40 mt-2">
                    {new Date(cmd.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                )}
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => copyToClipboard(cmd.command, cmd.id)}
                  className={`p-2 rounded transition-all ${
                    copied === cmd.id
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "text-app/50 hover:text-app hover:bg-secondary"
                  }`}
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(cmd.id)}
                  className="p-2 rounded text-red-500 hover:bg-red-500/10 transition-all"
                  title="Delete command"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-app border border-app rounded-lg text-app/80 hover:text-primary font-medium transition-all disabled:opacity-50"
          >
            {loadingMore ? (
              <>
                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <span>Loading...</span>
              </>
            ) : (
              <span>Load More Commands</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
