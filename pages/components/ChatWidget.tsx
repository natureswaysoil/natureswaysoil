// pages/components/ChatWidget.tsx
import { useState } from "react";

// Strongly-typed chat message: role must be "user" or "assistant"
type ChatMsg = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);

  async function send() {
    // don't send empty messages
    if (!input.trim()) return;

    // Force the correct literal type for role so TS sees it as ChatMsg, not { role: string }
    const next: ChatMsg[] = [...msgs, { role: "user", content: input }];
    setMsgs(next);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // send messages in a shape your API expects (adjust if your endpoint differs)
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        setMsgs((m) => [
          ...m,
          { role: "assistant", content: "Sorry — something went wrong." },
        ]);
        return;
      }

      const data = await res.json();

      // Try a few common shapes; adjust to match your API response
      const replyText: string =
        (data?.message?.content ??
          data?.reply ??
          data?.content ??
          "").toString();

      setMsgs((m) => [...m, { role: "assistant", content: replyText }]);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: "Network error — please try again." },
      ]);
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded bg-green-700 px-3 py-2 text-white shadow hover:bg-green-800"
      >
        {open ? "Close chat" : "Chat"}
      </button>

      {open && (
        <div className="mt-2 w-80 rounded border bg-white p-3 shadow-xl">
          <div className="max-h-64 space-y-2 overflow-y-auto text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                <span
                  className={`inline-block rounded px-2 py-1 ${
                    m.role === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {m.content}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Ask something…"
              className="flex-1 rounded border px-2 py-1"
            />
            <button
              onClick={send}
              className="rounded bg-green-700 px-3 py-1 text-white hover:bg-green-800"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


