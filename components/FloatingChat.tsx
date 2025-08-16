'use client';
import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const next = [...msgs, { role: "user", content: input.trim() } as Msg];
    setMsgs(next); setInput(""); setBusy(true);
    try {
      const r = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const j = await r.json();
      setMsgs([...next, { role: "assistant", content: j.text || "…" }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Sorry—AI is unavailable right now." }]);
    } finally { setBusy(false); }
  }

  return (
    <>
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-4 right-4 px-4 py-3 rounded-2xl bg-green-700 text-white shadow-lg"
      >
        {open ? "Close chat" : "Chat with us"}
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 w-[min(92vw,380px)] h-[520px] bg-white border rounded-2xl shadow-xl flex flex-col">
          <div className="px-4 py-3 border-b font-semibold">Nature’s Way Soil Assistant</div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                <div className={`inline-block px-3 py-2 rounded-xl ${m.role === "user" ? "bg-green-700 text-white" : "bg-gray-100"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {busy && <div className="text-gray-500">Assistant is typing…</div>}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about products, shipping, refunds…"
              className="flex-1 border rounded-xl px-3 py-2"
            />
            <button onClick={send} disabled={busy} className="px-4 py-2 rounded-2xl bg-green-700 text-white">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

