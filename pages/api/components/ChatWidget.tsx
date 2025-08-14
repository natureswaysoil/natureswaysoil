import { useEffect, useRef, useState } from "react";
type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I’m your Garden Assistant 🌿 Ask me about soil, watering, or plant care." }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  async function send() {
    const text = (inputRef.current?.value || "").trim();
    if (!text) return;
    setMessages(m => [...m, { role: "user", content: text }]);
    inputRef.current!.value = "";
    setBusy(true);
    try {
      const r = await fetch("/api/chat", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ messages: [...messages, { role:"user", content: text }] })});
      const j = await r.json();
      setMessages(m => [...m, { role:"assistant", content: j.reply || "Happy to help!" }]);
    } catch {
      setMessages(m => [...m, { role:"assistant", content: "I’m having trouble right now, but try compost + biochar for drainage + retention combo." }]);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)} style={{position:"fixed", right:20, bottom:20, background:"#166534", color:"#fff", padding:"10px 14px", borderRadius:999}}>
        💬 Ask a Garden Expert
      </button>
      {open && (
        <div style={{position:"fixed", right:20, bottom:90, width:320, background:"#fff", border:"1px solid #eee", borderRadius:16, overflow:"hidden", boxShadow:"0 6px 24px rgba(0,0,0,.12)"}}>
          <div style={{background:"#166534", color:"#fff", padding:10, display:"flex", justifyContent:"space-between"}}>
            <strong>Garden Assistant</strong>
            <button onClick={() => setOpen(false)} style={{color:"#fff"}}>✕</button>
          </div>
          <div style={{height:240, overflowY:"auto", padding:10}}>
            {messages.map((m,i)=><div key={i} style={{textAlign:m.role==="user"?"right":"left", margin:"6px 0"}}><span style={{display:"inline-block", background:m.role==="user"?"#e7f3ec":"#f3f4f6", padding:"6px 10px", borderRadius:12, fontSize:13}}>{m.content}</span></div>)}
            {busy && <div style={{fontSize:12, color:"#666"}}>Thinking…</div>}
          </div>
          <div style={{display:"flex", gap:6, padding:10, borderTop:"1px solid #eee"}}>
            <input ref={inputRef} onKeyDown={e => e.key==="Enter" && send()} placeholder="Ask about soil, watering…" style={{flex:1, padding:"8px 10px", border:"1px solid #ddd", borderRadius:8}} />
            <button onClick={send} style={{padding:"8px 12px", background:"#166534", color:"#fff", borderRadius:8}}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
