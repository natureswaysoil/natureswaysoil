// pages/components/ChatWidget.tsx
import * as React from "react";

export interface ChatWidgetProps {
  buttonLabel?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  onAsk?: (message: string) => Promise<string> | string; // hook to your OpenAI proxy
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  buttonLabel = "Ask Garden AI",
  title = "Garden Assistant",
  subtitle = "Get tips, soil advice & planting help.",
  placeholder = "Ask about tomatoes, orchids, compost…",
  onAsk,
}) => {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const safeSetOpen = (next: boolean) => setOpen(next);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setInput("");

    let reply = "Thanks for your question! 🌱";
    if (onAsk) {
      try {
        const r = await onAsk(trimmed);
        reply = typeof r === "string" ? r : reply;
      } catch {
        reply = "Hmm, I had trouble answering. Please try again.";
      }
    }
    setMessages((m) => [...m, { role: "assistant", content: reply }]);
  };

  return (
    <>
      {/* Launcher button */}
      <button
        onClick={() => safeSetOpen(true)}
        aria-label={buttonLabel}
        style={{
          position: "fixed",
          right: 16,
          bottom: 16,
          zIndex: 999,
          borderRadius: 999,
          background: "#0b7",
          color: "#fff",
          border: 0,
          padding: "12px 16px",
          boxShadow: "0 4px 16px rgba(0,0,0,.2)",
          cursor: "pointer",
        }}
      >
        💬 {buttonLabel}
      </button>

      {!open ? null : (
        <section
          aria-label="AI Chat"
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            right: 16,
            bottom: 76,
            width: "min(360px, 95vw)",
            height: 420,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          <header
            style={{
              padding: "12px 14px",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{title}</strong>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{subtitle}</div>
            </div>
            <button
              onClick={() => safeSetOpen(false)}
              aria-label="Close chat"
              style={{ background: "transparent", border: 0, fontSize: 18 }}
            >
              ✕
            </button>
          </header>

          <div style={{ padding: 12, gap: 8, display: "grid", flex: 1, overflowY: "auto" }}>
            {messages.length === 0 ? (
              <div style={{ opacity: 0.7, fontSize: 14 }}>
                Ask how to improve soil health, watering, sunlight, or pest control.
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    justifySelf: m.role === "user" ? "end" : "start",
                    background: m.role === "user" ? "#0b7" : "#f3f3f3",
                    color: m.role === "user" ? "#fff" : "#000",
                    padding: "8px 10px",
                    borderRadius: 12,
                    maxWidth: "85%",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.content}
                </div>
              ))
            )}
          </div>

          <footer style={{ borderTop: "1px solid #eee", padding: 10, display: "flex", gap: 8 }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? send() : undefined)}
              placeholder={placeholder}
              aria-label="Type your question"
              style={{
                flex: 1,
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: "8px 10px",
              }}
            />
            <button
              onClick={send}
              style={{
                background: "#0b7",
                color: "#fff",
                border: 0,
                borderRadius: 8,
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </footer>
        </section>
      )}
    </>
  );
};

export default React.memo(ChatWidget);
