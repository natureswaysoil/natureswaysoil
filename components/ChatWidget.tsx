import React from "react";
export default function ChatWidget() {
  return (
    <button title="Ask our AI Gardener" style={{
      position:"fixed", right:16, bottom:16, background:"#166534", color:"#fff",
      border:0, borderRadius:999, padding:"12px 14px", cursor:"pointer",
      boxShadow:"0 6px 20px rgba(0,0,0,.15)", zIndex:40
    }}>🌱 Ask Garden AI</button>
  );
}
