import { useState } from "react";
import Image from "next/image";

/** Allow only these two literal values */
type ChatRole = "user" | "assistant";

/** Single chat message */
export type ChatMsg = {
  role: ChatRole;
  content: string;
};

export default function ChatWidget() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed) return;

    // build a strongly typed message first
    const userMsg: ChatMsg = { role: "user", content: trimmed };

    // append it via functional setState to keep the type
    setMsgs((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      // call your (stub) API – you can swap this later for real OpenAI
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...msgs, userMsg] }),
      });

      if (!res.ok) throw new Error(`Chat API ${res.status}`);

      const data = (await res.json()) as { reply: string };
      const assistantMsg: ChatMsg = { role: "assistant", content: data.reply };

      setMsgs((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const assistantMsg: ChatMsg = {
        role: "assistant",
        content:
          "Sorry—something went wrong reaching the chat service. Please try again.",
      };
      setMsgs((prev) => [...prev, assistantMsg]);
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="mt-16 rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-center gap-3">
        <Image
          src="/logo-with-tagline.png"
          width={32}
          height={32}
          alt="Nature's Way Soil logo"
        />
        <h3 className="text-lg font-semibold">Ask us anything</h3>
      </div>

      <div className="mb-3 max-h-64 space-y-3 overflow-auto pr-1">
        {msgs.length === 0 && (
          <p className="text-sm text-gray-500">
            Try: <em>“Which product should I use for dog urine spots?”</em>
          </p>
        )}

        {msgs.map((m, i) => (
          <div
            key={i}
            className={`rounded-lg p-2 text-sm ${
              m.role === "user"
                ? "bg-emerald-50 text-emerald-900"
                : "bg-gray-50 text-gray-900"
            }`}
          >
            <span className="mr-2 inline-block rounded px-1.5 py-0.5 text-xs font-semibold ring-1 ring-inset ring-black/5">
              {m.role === "user" ? "You" : "Assistant"}
            </span>
            {m.content}
          </div>
        ))}
      </div>

      <div className="flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a question and press ⌘/Ctrl+Enter to send"
          className="min-h-[44px] flex-1 resize-y rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          onClick={() => void sendMessage()}
          disabled={sending || !input.trim()}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm disabled:opacity-50"
        >
          {sending ? "Sending…" : "Send"}
        </button>
      </div>
    </div>
  );
}


