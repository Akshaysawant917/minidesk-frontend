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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(false);
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

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-secondary px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition-all cursor-pointer"
        >
          Add Command
        </button>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => {
            setIsModalOpen(false);
            setError("");
          }}
        >
          <div
            className="w-full max-w-xl rounded-xl border border-app bg-app p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-primary">Add Command</h3>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setError("");
                }}
                className="text-app/50 hover:text-primary transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <textarea
                placeholder="Paste your command here..."
                value={commandText}
                onChange={(e) => setCommandText(e.target.value)}
                className="w-full bg-secondary/10 border border-app rounded-lg p-4 text-app placeholder:text-app/40 focus:outline-none focus:border-primary transition-colors resize-none"
                rows={5}
              />

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setError("");
                  }}
                  className="px-4 py-2.5 rounded-lg border border-app text-app/70 hover:text-primary transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !commandText.trim()}
                  className="bg-primary text-secondary px-5 py-2.5 rounded-lg font-medium disabled:cursor-not-allowed disabled:opacity-60 transition-all cursor-pointer"
                >
                  {saving ? "Saving..." : "Save Command"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-app/50">
        <span>{commands.length} commands</span>
      </div>

      {commands.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Copy className="w-10 h-10 text-app/30" />
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">No commands yet</h3>
          <p className="text-app/50">Start saving your favorite commands</p>
        </div>
      ) : (
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
                  onClick={() => copyToClipboard(cmd.command, cmd.id)}
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
                  onClick={() => handleDelete(cmd.id)}
                  className="p-2 rounded text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                  title="Delete command"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center pt-2">
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
