'use client';
import { useState } from 'react';

type ChatMsg = { role: 'user' | 'assistant'; content: string };

export default function ChatWidget() {
  // 1) State is strongly typed
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: 'assistant', content: 'Hi! How can I help?' },
  ]);
  const [input, setInput] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;

    // 2) Build a ChatMsg explicitly
    const userMsg: ChatMsg = { role: 'user', content: value };

    // 3) Build next as ChatMsg[]
    const next: ChatMsg[] = [...msgs, userMsg];

    setMsgs(next);
    setInput('');

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      const data = await res.json();
      const replyText =
        data?.reply ?? data?.message ?? data?.content ?? 'Okay.';

      const assistantMsg: ChatMsg = { role: 'assistant', content: replyText };
      setMsgs(prev => [...prev, assistantMsg]);
    } catch {
      setMsgs(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry—couldn’t reach the chat service just now.",
        },
      ]);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 rounded-2xl bg-white border shadow-lg">
      <div className="p-3 text-sm font-semibold">Chat</div>

      <div className="p-3 space-y-2 h-64 overflow-y-auto text-sm">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
            <span className="inline-block max-w-[85%] rounded-xl px-3 py-2 bg-gray-100">
              {m.content}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2 p-3 border-t">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a question…"
          className="flex-1 rounded-xl border px-3 py-2 text-sm"
        />
        <button className="rounded-xl bg-green-700 text-white px-3 py-2 text-sm">
          Send
        </button>
      </form>
    </div>
  );
}




