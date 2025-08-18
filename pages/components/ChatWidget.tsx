
'use client';

import { useState, FormEvent } from 'react';

export type ChatMsg = { role: 'user' | 'assistant'; content: string };

export default function ChatWidget() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');

  async function onSend(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    // Make the new message a ChatMsg so role is the literal 'user'
    const userMsg: ChatMsg = { role: 'user', content: input };

    // Functional state update prevents stale snapshot and keeps types correct
    setMsgs(prev => [...prev, userMsg]);
    setInput('');

    try {
      // If you call an API, send the full transcript including the new message
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...msgs, userMsg] })
      });

      const data = await res.json();
      const replyText: string =
        data?.reply ?? data?.message ?? data?.content ?? 'OK';

      const botMsg: ChatMsg = { role: 'assistant', content: replyText };
      setMsgs(prev => [...prev, botMsg]);
    } catch {
      const errMsg: ChatMsg = {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.'
      };
      setMsgs(prev => [...prev, errMsg]);
    }
  }

  return (
    <div className="max-w-xl w-full mx-auto p-4 border rounded-lg">
      <div className="space-y-2 max-h-72 overflow-auto mb-3">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span
              className={
                m.role === 'user'
                  ? 'inline-block bg-green-600 text-white px-3 py-1 rounded-md'
                  : 'inline-block bg-gray-200 text-gray-900 px-3 py-1 rounded-md'
              }
            >
              {m.content}
            </span>
          </div>
        ))}
        {msgs.length === 0 && (
          <div className="text-gray-500 text-sm">Ask me something…</div>
        )}
      </div>

      <form onSubmit={onSend} className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message"
          className="flex-1 border rounded-md px-3 py-2"
        />
        <button type="submit" className="px-4 py-2 rounded-md bg-green-700 text-white">
          Send
        </button>
      </form>
    </div>
  );
}

