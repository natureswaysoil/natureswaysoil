
import { useState, useEffect, useRef } from "react";
export default function ChatWidget(){
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<{role:"user"|"assistant"; content:string}[]>([
    { role:"assistant", content:"Hi! Need help picking the right product?" }
  ]);
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{ if(open) boxRef.current?.scrollTo({ top: 99999, behavior: "smooth"}); }, [msgs, open]);
  async function send(){
    if(!input.trim()) return;
    const next = [...msgs, { role:"user", content: input }];
    setMsgs(next); setInput("");
    const r = await fetch("/api/chat", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ messages: next }) });
    const j = await r.json();
    setMsgs([...next, { role:"assistant", content: j.reply || "Thanks! We’ll be in touch." }]);
    try{ await fetch("/api/lead", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ source:"chat", message: input, page: window.location.pathname }) }); }catch{}
  }
  return (
    <div>
      <button onClick={()=>setOpen(!open)} className="fixed right-4 bottom-4 z-50 shadow rounded-full px-4 py-3 bg-green-700 text-white">
        {open ? "Close" : "Chat"}
      </button>
      {open && (
        <div className="fixed right-4 bottom-20 z-50 w-80 rounded-2xl border bg-white shadow">
          <div className="p-3 bg-green-700 text-white font-medium">Nature’s Way Soil</div>
          <div ref={boxRef} className="h-64 overflow-auto p-3 space-y-2 text-sm">
            {msgs.map((m,i)=> (<div key={i} className={m.role==="assistant"?"bg-gray-100 p-2 rounded-2xl":"bg-green-50 p-2 rounded-2xl ml-8"}>{m.content}</div>))}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 border rounded-xl px-3 py-2" placeholder="Type a message..." />
            <button onClick={send} className="px-3 py-2 rounded-xl bg-green-700 text-white">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
