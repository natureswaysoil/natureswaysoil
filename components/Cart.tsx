import React from "react";
export type CartItem = { id: string; name: string; price: number; qty: number };

export default function Cart({
  open, onClose, items, onQty, onRemove, promo, subtotal,
}: {
  open: boolean; onClose: () => void; items: CartItem[];
  onQty: (id: string, qty: number) => void; onRemove: (id: string) => void;
  promo?: string; subtotal: number;
}) {
  if (!open) return null;
  return (
    <aside onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.35)", display:"grid", justifyContent:"end", zIndex:50 }}>
      <div onClick={(e)=>e.stopPropagation()} style={{ width:380, maxWidth:"90vw", height:"100%", background:"#fff", padding:16, overflow:"auto" }}>
        <h2 style={{ marginTop:0 }}>Your Cart</h2>
        {promo && <div style={{ background:"#F1F8F3", padding:8, borderRadius:8, marginBottom:8 }}>Promo: <strong>{promo}</strong></div>}
        {items.length===0 ? <p>Your cart is empty.</p> : (
          <ul style={{ listStyle:"none", padding:0, margin:0 }}>
            {items.map(i=>(
              <li key={i.id} style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:8, padding:"8px 0", borderBottom:"1px solid #eee" }}>
                <div>
                  <div style={{ fontWeight:600 }}>{i.name}</div>
                  <div style={{ color:"#475569" }}>${(i.price/100).toFixed(2)}</div>
                  <div style={{ marginTop:6 }}>
                    <button onClick={()=>onQty(i.id, Math.max(1, i.qty-1))}>−</button>
                    <span style={{ padding:"0 8px" }}>{i.qty}</span>
                    <button onClick={()=>onQty(i.id, i.qty+1)}>+</button>
                    <button onClick={()=>onRemove(i.id)} style={{ marginLeft:10 }}>Remove</button>
                  </div>
                </div>
                <div style={{ fontWeight:600 }}>${((i.price*i.qty)/100).toFixed(2)}</div>
              </li>
            ))}
          </ul>
        )}
        <div style={{ marginTop:12, display:"flex", justifyContent:"space-between" }}>
          <div>Subtotal</div><strong>${(subtotal/100).toFixed(2)}</strong>
        </div>
        <form method="POST" action="/api/checkout" onSubmit={async(e)=>{
          e.preventDefault();
          const lineItems = items.map(i=>({ price: i.id, quantity: i.qty }));
          const res = await fetch("/api/checkout",{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ lineItems }) });
          const data = await res.json(); if (data?.url) window.location.href = data.url;
        }}>
          <button type="submit" disabled={items.length===0} style={{ width:"100%", marginTop:16, background:"#166534", color:"#fff", border:0, borderRadius:10, padding:"12px 14px", fontSize:16 }}>Checkout</button>
        </form>
        <button onClick={onClose} style={{ marginTop:8, width:"100%" }}>Continue Shopping</button>
      </div>
    </aside>
  );
}
