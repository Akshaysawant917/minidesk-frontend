"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiClient, getTokenFromCookie } from "@/api/client";
import ChatHeader from "@/components/ai/ChatHeader";
import ChatInput from "@/components/ai/ChatInput";
import ChatMessages from "@/components/ai/ChatMessages";

export default function AIPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasAutoSubmitted = useRef(false);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  const initialMessage = useMemo(() => searchParams.get("message")?.trim() || "", [searchParams]);

  useEffect(() => {
    if (!initialMessage || hasAutoSubmitted.current) {
      return;
    }

    hasAutoSubmitted.current = true;

    const sendInitialMessage = async () => {
      setMessages([{ role: "user", content: initialMessage }]);
      setIsLoading(true);
      setError("");

      try {
        const response = await apiClient.post("/ai/chat", { message: initialMessage });

        setMessages([
          { role: "user", content: initialMessage },
          { role: "assistant", content: response.data.answer || "" },
        ]);
      } catch (err) {
        const message =
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Sorry, I couldn't process that request. Please try again.";

        setMessages([
          { role: "user", content: initialMessage },
          { role: "assistant", content: `Sorry, I couldn't process that request. Please try again.${message ? ` ${message}` : ""}` },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    sendInitialMessage();
  }, [initialMessage]);

  const handleSend = async (messageText = input) => {
    const trimmed = messageText.trim();

    if (!trimmed || isLoading) {
      return;
    }

    const userMessage = { role: "user", content: trimmed };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await apiClient.post("/ai/chat", { message: trimmed });
      const answer = response.data.answer || "";

      setMessages((current) => [...current, { role: "assistant", content: answer }]);
    } catch (err) {
      const backendError =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Sorry, I couldn't process that request. Please try again.";

      setMessages((current) => [
        ...current,
        { role: "assistant", content: backendError },
      ]);
      setError(backendError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-app text-app">
      <ChatHeader onBack={() => router.push("/dashboard")} />

      <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-5xl flex-col">
        {error && (
          <div className="border-b border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600 sm:px-6">
            {error}
          </div>
        )}

        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          onSelectPrompt={(prompt) => handleSend(prompt)}
        />

        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => handleSend()}
          disabled={isLoading}
        />
      </main>
    </div>
  );
}
