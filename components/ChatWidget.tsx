
// components/ChatWidget.tsx
import React, { useState, useRef, useEffect } from 'react';

type Role = 'user' | 'assistant';
type ChatMsg = { role: Role; content: string };

type ChatAPIResponse =
  | { reply?: string; content?: string; message?: string }
  | { error: string };

const CHAT_ENDPOINT = '/api/ai/chat'; // change if your route differs

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: 'assistant', content: "Hi! I'm your soil helper. How can I help?" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // auto-scroll to bottom when new messages arrive
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    // 1) push the user's message as a typed ChatMsg
    const userMsg: ChatMsg = { role: 'user', content: text };
    setMsgs(prev => [...prev, userMsg]);
    setInput('');

    // 2) call the API with the full, typed transcript (+ this new message)
    setLoading(true);
    try {
      const payload = { messages: [...msgs, userMsg] }; // typed ChatMsg[] payload
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: ChatAPIResponse = await res.json();

      // support several common shapes: {reply}, {content}, {message}
      const replyText =
        ('reply' in data && data.reply) ||
        ('content' in data && data.content) ||
        ('message' in data && data.message) ||
        (res.ok ? 'Hmm, I could not find an answer right now.' : 'Sorry, something went wrong.');

      const assistantMsg: ChatMsg = { role: 'assistant', content: replyText };
      setMsgs(prev => [...prev, assistantMsg]);
    } catch (err) {
      const assistantMsg: ChatMsg = {
        role: 'assistant',
        content: 'Sorry—there was a network or server error. Please try again.',
      };
      setMsgs(prev => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="rounded-full bg-green-700 text-white px-4 py-2 shadow-lg hover:bg-green-800"
      >
        {open ? 'Close chat' : 'Chat'}
      </button>

      {/* Panel */}
      {open && (
        <div className="mt-3 w-[360px] max-w-[90vw] rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="font-medium">Ask Nature’s Way Soil</div>
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="max-h-[320px] overflow-y-auto px-4 py-3 space-y-3 text-sm"
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'user'
                    ? 'ml-auto max-w-[85%] rounded-2xl bg-green-600 px-3 py-2 text-white'
                    : 'mr-auto max-w-[85%] rounded-2xl bg-gray-100 px-3 py-2 text-gray-900'
                }
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="mr-auto max-w-[85%] rounded-2xl bg-gray-100 px-3 py-2 text-gray-900">
                Thinking…
              </div>
            )}
          </div>

          {/* Input row */}
          <div className="flex items-center gap-2 border-t px-3 py-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type your message…"
              className="flex-1 rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="rounded-xl bg-green-700 px-3 py-2 text-white text-sm hover:bg-green-800 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


