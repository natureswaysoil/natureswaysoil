import { useState, FormEvent } from 'react';

// NOTE: renamed to avoid duplicate identifier errors
export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatWidget() {
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  async function onSend(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMsgs(prev => [...prev, userMsg]);
    setInput('');

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...msgs, userMsg] })
      });
      const data = await res.json();
      const replyText: string = data?.reply ?? data?.message ?? data?.content ?? 'OK';
      const botMsg: ChatMessage = { role: 'assistant', content: replyText };
      setMsgs(prev => [...prev, botMsg]);
    } catch {
      const errMsg: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.'
      };
      setMsgs(prev => [...prev, errMsg]);
    }
  }

  // Simple render - this can be styled later
  return null;
}