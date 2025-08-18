 // pages/components/ChatWidget.tsx
import React, { useState, useRef, useEffect } from "react";

type Role = "user" | "assistant";
export type ChatMsg = { role: Role; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: "assistant", content: "Hi! How can I help?" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  // focus input when opening
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function sendMessage() {
    if (!input.trim()) return;
    const nextMsgs: ChatMsg[] = [...msgs, { role: "user", content: input }];
    setMsgs(nextMsgs);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMsgs }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data: { message: string } = await res.json();
      setMsgs((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (err) {
      setMsgs((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry—something went wrong reaching the assistant. Please try again.",
        },
      ]);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-emerald-600 text-white px-4 py-2 shadow hover:bg-emerald-700"
        >
          Chat
        </button>
      ) : (
        <div className="w-[320px] h-[420px] bg-white border rounded-xl shadow-lg flex flex-col">
          <div className="p-3 border-b flex items-center justify-between">
            <strong>Assistant</strong>
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 ${
                  m.role === "user"
                    ? "ml-auto bg-emerald-600 text-white"
                    : "mr-auto bg-gray-100 text-gray-900"
                }`}
              >
                {m.content}
              </div>
            ))}
          </div>

          <form
            className="border-t p-2 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 rounded-md border px-3 py-2 focus:outline-none focus:ring"
            />
            <button
              type="submit"
              className="rounded-md bg-emerald-600 text-white px-3 py-2 hover:bg-emerald-700"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}


