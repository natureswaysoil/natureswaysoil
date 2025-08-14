import { useEffect, useMemo, useState } from "react";
import { PRODUCTS, type Product } from "../data/products";
import Cart, { type CartItem } from "../components/Cart";
import ChatWidget from "../components/ChatWidget";

export default function Home() {
  const [promo, setPromo] = useState<string | undefined>();
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const pc = params.get("pc") || params.get("promo");
    setPromo(pc || undefined);
  }, []);

  function addToCart(p: Product) {
    setItems(prev => {
      const i = prev.findIndex(x => x.id === p.id);
      if (i >= 0) { const c = [...prev]; c[i] = { ...c[i], qty: c[i].qty + 1 }; return c; }
      return [...prev, { ...p, qty: 1 }];
    });
    setOpen(true);
  }
  function updateQty(id: string, qty: number) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }

  const year = useMemo(() => new Date().getFullYear(), []);
  const brand = process.env.NEXT_PUBLIC_BRAND_NAME || "Nature’s Way Soil";

  return (
    <main style={{padding: 24}}>
      <h1 style={{marginBottom:8}}>{brand} — From Our Farm To Your Garden</h1>
      <p style={{marginTop:0, color:"#555"}}>Premium organic soil and plant care that support stronger roots, greener leaves, and bigger blooms.</p>

      <section style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:16, marginTop:24}}>
        {PRODUCTS.map(p => (
          <div key={p.id} style={{border:"1px solid #eee", borderRadius:12, overflow:"hidden"}}>
            <img src={p.image} alt={p.title} style={{width:"100%", height:160, objectFit:"cover"}} />
            <div style={{padding:12}}>
              <div style={{fontWeight:600}}>{p.title}</div>
              <div style={{fontSize:13, color:"#666", marginTop:4}}>Stronger roots. Greener leaves.</div>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10}}>
                <strong>${p.price.toFixed(2)}</strong>
                <button onClick={() => addToCart(p)} style={{background:"#166534", color:"#fff", padding:"8px 10px", borderRadius:10}}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <footer style={{marginTop:36, borderTop:"1px solid #eee", paddingTop:12, color:"#666", fontSize:14}}>
        © {year} {brand}. All rights reserved. • <a href="/api/health" target="_blank" rel="noreferrer">Health</a>
      </footer>

      {open && <Cart items={items} onClose={() => setOpen(false)} onUpdateQty={updateQty} promotionCode={promo} />}
      <ChatWidget />
    </main>
  );
}
