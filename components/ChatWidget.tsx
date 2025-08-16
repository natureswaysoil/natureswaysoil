'use client';
import { useState, useRef, useEffect } from 'react';

type Role = 'user' | 'assistant';
type Msg = { role: Role; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  // auto-scroll to newest message
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [msgs, open]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    const next: Msg[] = [...msgs, { role: 'user', content: text }];
    setMsgs(next);
    setInput('');
    setBusy(true);

    try {
      const r = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      const j = await r.json().catch(() => ({}));
      const replyText =
        j?.text ??
        j?.reply ??
        (typeof j === 'string' ? j : 'Thanks! We’ll be in touch.');

      const reply: Msg = { role: 'assistant', content: String(replyText) };
      setMsgs((prev) => [...prev, reply]);
    } catch {
      setMsgs((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry—AI is unavailable right now.' },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') send();
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-40 px-4 py-3 rounded-2xl bg-green-700 text-white shadow-lg"
        aria-expanded={open}
        aria-controls="nws-chat"
      >
        {open ? 'Close chat' : 'Chat with us'}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          id="nws-chat"
          className="fixed bottom-20 right-4 z-40 w-[min(92vw,380px)] h-[520px] bg-white border rounded-2xl shadow-xl flex flex-col"
        >
          <div className="px-4 py-3 border-b font-semibold">
            Nature’s Way Soil Assistant
          </div>

          <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-3 space-y-3 text-sm"
          >
            {msgs.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
                <div
                  className={`inline-block px-3 py-2 rounded-xl ${
                    m.role === 'user'
                      ? 'bg-green-700 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {busy && (
              <div className="text-gray-500">Assistant is typing…</div>
            )}
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask about products, shipping, refunds…"
              className="flex-1 border rounded-xl px-3 py-2"
            />
            <button
              onClick={send}
              disabled={busy}
              className="px-4 py-2 rounded-2xl bg-green-700 text-white disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}



