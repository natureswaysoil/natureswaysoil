import { useState } from "react";

type ChatMsg = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: "assistant", content: "Hi! Ask about soil, compost, or applications." },
  ]);
  const [input, setInput] = useState("");

  async function send() {
    if (!input.trim()) return;
    const next = [...msgs, { role: "user", content: input }];
    setMsgs(next);
    setInput("");

    try {
      const r = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const j = await r.json();
      setMsgs([...next, { role: "assistant", content: j.reply ?? "Thanks! We'll be in touch." }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Thanks! We'll be in touch." }]);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-4 right-4 rounded-full bg-green-700 text-white px-4 py-3 shadow-lg hover:bg-green-800"
      >
        {open ? "Close Chat" : "Chat"}
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 w-80 rounded-2xl border bg-white shadow-xl overflow-hidden">
          <div className="p-3 border-b font-semibold">Ask us anything</div>
          <div className="p-3 h-64 overflow-y-auto space-y-2 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                <span
                  className={`inline-block px-3 py-2 rounded-xl ${
                    m.role === "user" ? "bg-green-700 text-white" : "bg-gray-100"
                  }`}
                >
                  {m.content}
                </span>
              </div>
            ))}
          </div>
          <div className="p-3 flex gap-2 border-t">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => (e.key === "Enter" ? send() : null)}
              placeholder="Type a message…"
              className="flex-1 rounded-xl border px-3 py-2"
            />
            <button onClick={send} className="rounded-xl bg-green-700 text-white px-3 py-2">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}


