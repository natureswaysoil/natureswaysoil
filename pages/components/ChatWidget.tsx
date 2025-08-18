"use client";

import { useState } from "react";

type ChatMsg = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: "assistant", content: "Hi! Ask me anything about the site or products." },
  ]);
  const [input, setInput] = useState("");

  async function send() {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Make a properly-typed user message
    const userMsg: ChatMsg = { role: "user", content: trimmed };

    // Update UI immediately
    setMsgs((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...msgs, userMsg] }),
      });

      const data = await res.json();
      const replyText = typeof data?.reply === "string" ? data.reply : "";

      if (replyText) {
        setMsgs((prev) => [...prev, { role: "assistant", content: replyText }]);
      } else {
        setMsgs((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry — I couldn't get a reply." },
        ]);
      }
    } catch {
      setMsgs((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 rounded-2xl bg-white border shadow-lg">
      <div className="p-3 text-sm font-medium border-b">Assistant</div>

      <div className="p-3 space-y-2 max-h-64 overflow-y-auto text-sm">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : ""}>
            <span
              className={`inline-block rounded-lg px-3 py-2 ${
                m.role === "user" ? "bg-green-50" : "bg-gray-100"
              }`}
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>

      <div className="p-3 flex gap-2 border-t">
        <input
          className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a question…"
        />
        <button
          onClick={send}
          className="rounded-md bg-green-600 text-white px-3 text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}


