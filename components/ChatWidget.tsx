// components/ChatWidget.tsx
import { useState } from "react";

type Role = "user" | "assistant";
type Msg = { role: Role; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Hi! How can I help?" },
  ]);
  const [input, setInput] = useState("");

  async function send() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Msg = { role: "user", content: text };
    setMsgs((prev) => [...prev, userMsg]);
    setInput("");

    try {
      // Optional backend call; if your /api/ai/chat isn’t set up, we fall back gracefully.
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...msgs, userMsg] }),
      });

      let reply = "Okay!";
      if (res.ok) {
        const data = await res.json().catch(() => null);
        reply = (data?.reply as string) ?? reply;
      } else {
        reply = "I'm offline right now, but I’ll get back to you.";
      }

      const botMsg: Msg = { role: "assistant", content: reply };
      setMsgs((prev) => [...prev, botMsg]);
    } catch {
      setMsgs((prev) => [
        ...prev,
        { role: "assistant", content: "I'm offline right now, but I’ll get back to you." },
      ]);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-green-700 text-white px-4 py-2 shadow"
        >
          Chat
        </button>
      ) : (
        <div className="w-80 h-96 rounded-xl border shadow bg-white flex flex-col">
          <div className="flex items-center justify-between p-2 border-b">
            <div className="font-semibold">Help</div>
            <button onClick={() => setOpen(false)} className="text-sm text-gray-500">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-auto p-3 space-y-2">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "text-right"
                    : "text-left"
                }
              >
                <span
                  className={
                    "inline-block rounded-lg px-3 py-2 " +
                    (m.role === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-800")
                  }
                >
                  {m.content}
                </span>
              </div>
            ))}
          </div>

          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message…"
              className="flex-1 border rounded px-2 py-1"
            />
            <button
              onClick={send}
              className="bg-green-700 text-white rounded px-3 py-1"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



