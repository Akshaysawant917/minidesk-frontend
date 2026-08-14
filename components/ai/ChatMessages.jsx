import { Bot, LoaderCircle } from "lucide-react";
import ChatMessage from "./ChatMessage";
import EmptyState from "./EmptyState";

export default function ChatMessages({ messages, isLoading, onSelectPrompt }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      {messages.length === 0 ? (
        <EmptyState onSelectPrompt={onSelectPrompt} />
      ) : (
        <div aria-live="polite" className="mx-auto max-w-4xl space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={`${message.role}-${index}`} message={message} />
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-app bg-secondary/30 px-4 py-3 text-sm text-app/80">
                <Bot className="h-4 w-4 text-primary" />
                <span>MiniDesk is thinking...</span>
                <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
