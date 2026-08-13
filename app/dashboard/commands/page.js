"use client";

import { useEffect, useState } from "react";
import { saveCommand, getCommands, deleteCommand } from "@/api/commands.api";
import CommandsHeader from "@/components/commands/CommandsHeader";
import CommandModal from "@/components/commands/CommandModal";
import CommandList from "@/components/commands/CommandList";

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
      <CommandsHeader onAddCommand={() => setIsModalOpen(true)} />

      <CommandModal
        isOpen={isModalOpen}
        commandText={commandText}
        setCommandText={setCommandText}
        error={error}
        saving={saving}
        onSubmit={handleSave}
        onClose={() => {
          setIsModalOpen(false);
          setError("");
        }}
      />

      <div className="flex items-center justify-between text-sm text-app/50">
        <span>{commands.length} commands</span>
      </div>

      <CommandList
        commands={commands}
        copied={copied}
        onCopy={copyToClipboard}
        onDelete={handleDelete}
      />

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
