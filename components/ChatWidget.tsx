import { useState, useEffect, useRef, FormEvent } from 'react';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Welcome message on first open
  useEffect(() => {
    if (isOpen && msgs.length === 0) {
      setMsgs([{
        role: 'assistant',
        content: "Hi! I'm here to help you with questions about Nature's Way Soil products, organic gardening, and soil health. How can I assist you today?",
        timestamp: new Date()
      }]);
    }
  }, [isOpen, msgs.length]);

  async function onSend(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { 
      role: 'user', 
      content: input,
      timestamp: new Date()
    };
    setMsgs(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...msgs, userMsg] })
      });
      const data = await res.json();
      const replyText: string = data?.reply ?? data?.message ?? data?.content ?? 'Thank you for your message!';
      const botMsg: ChatMessage = { 
        role: 'assistant', 
        content: replyText,
        timestamp: new Date()
      };
      setMsgs(prev => [...prev, botMsg]);
    } catch {
      const errMsg: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again or contact us directly.',
        timestamp: new Date()
      };
      setMsgs(prev => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  }

  function formatTime(date?: Date) {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
        style={{
          background: 'linear-gradient(135deg, #0f3d2e 0%, #1a5c42 100%)',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)'
        }}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        {!isOpen && msgs.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-bold">
            {msgs.filter(m => m.role === 'assistant').length}
          </span>
        )}
      </button>

      {/* Chat Window */}
      <div
        className="fixed bottom-24 right-6 z-50 flex flex-col bg-white rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden"
        style={{
          width: isOpen ? 'min(400px, calc(100vw - 3rem))' : '0',
          height: isOpen ? 'min(600px, calc(100vh - 10rem))' : '0',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between px-5 py-4 text-white"
          style={{
            background: 'linear-gradient(135deg, #0f3d2e 0%, #1a5c42 100%)'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Nature's Way Soil</h3>
              <p className="text-xs text-white/80">We typically reply instantly</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/10 rounded-lg transition"
            aria-label="Close chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
          {msgs.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-[#0f3d2e] to-[#1a5c42] text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'
                  }`}
                  style={{
                    animation: 'slideUp 0.3s ease-out'
                  }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                </div>
                <span className="text-xs text-gray-400 mt-1 px-1">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={onSend} className="border-t bg-white px-4 py-4">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isTyping}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-5 py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              style={{
                background: input.trim() && !isTyping 
                  ? 'linear-gradient(135deg, #0f3d2e 0%, #1a5c42 100%)'
                  : '#d1d5db'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Powered by Nature's Way Soil AI Assistant
          </p>
        </form>
      </div>

      {/* Inline Styles for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}