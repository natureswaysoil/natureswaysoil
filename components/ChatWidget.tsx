
'use client';

import { useState, FormEvent } from 'react';

/** Chat message shape used everywhere in this file. */
type ChatMsg = { role: 'user' | 'assistant'; content: string };

export default function ChatWidget() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');

  async function onSend(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    // user message
    const user: ChatMsg = { role: 'user', content: text };
    setMsgs((m) => [...m, user]);
    setInput('');

    // demo reply (replace with real API later)
    const reply: ChatMsg = { role: 'assistant', content: "Thanks! We'll be in touch." };
    setMsgs((m) => [...m, reply]);
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
                  : 'inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-md'
              }
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>

      <form className="flex gap-2" onSubmit={onSend}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
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

