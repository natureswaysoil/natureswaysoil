
'use client';

import { useState, FormEvent } from 'react';

type ChatMsg = { role: 'user' | 'assistant'; content: string };

export default function ChatWidget() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');

  async function onSend(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMsg = { role: 'user', content: trimmed };
    setMsgs(prev => [...prev, userMsg]);
    setInput('');
    // Send `userMsg` to your API and append the assistant reply
  }

  return (
    <div>
      {msgs.map((m, i) => (
        <div key={i}>{m.role}: {m.content}</div>
      ))}
      <form onSubmit={onSend}>
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}


