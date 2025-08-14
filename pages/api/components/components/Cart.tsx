import { loadStripe } from "@stripe/stripe-js";
import type { Product } from "../data/products";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export type CartItem = Product & { qty: number };
type Props = {
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: string, qty: number) => void;
  promotionCode?: string;
};

export default function Cart({ items, onClose, onUpdateQty, promotionCode }: Props) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  async function checkout() {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      alert("Checkout is not enabled yet. (Add Stripe keys in Vercel → Settings → Environment Variables.)");
      return;
    }
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lineItems: items.map(i => ({ price: i.priceId, quantity: i.qty })),
        promotionCode
      })
    });
    const data = await res.json();
    const stripe = await stripePromise;
    if (data?.url) { window.location.href = data.url; return; }
    if (stripe && data.sessionId) await stripe.redirectToCheckout({ sessionId: data.sessionId });
  }

  return (
    <div style={{position:"fixed", inset:0, display:"flex", zIndex:50}}>
      <div style={{flex:1, background:"rgba(0,0,0,.4)"}} onClick={onClose} />
      <div style={{width:360, background:"#fff", height:"100%", padding:16, overflowY:"auto"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
          <h3>Your Cart</h3>
          <button onClick={onClose}>Close</button>
        </div>
        {items.length === 0 ? <p>Your cart is empty.</p> : (
          <>
            {items.map(i => (
              <div key={i.id} style={{display:"flex", gap:8, marginBottom:8}}>
                <img src={i.image} alt={i.title} width={64} height={64} style={{objectFit:"cover", borderRadius:8}} />
                <div style={{flex:1}}>
                  <div style={{fontWeight:600, fontSize:14}}>{i.title}</div>
                  <div style={{fontSize:13}}>${i.price.toFixed(2)}</div>
                  <div style={{display:"flex", alignItems:"center", gap:8, marginTop:6}}>
                    <button onClick={() => onUpdateQty(i.id, Math.max(1, i.qty - 1))}>-</button>
                    <span>{i.qty}</span>
                    <button onClick={() => onUpdateQty(i.id, i.qty + 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
            <div style={{borderTop:"1px solid #eee", paddingTop:12, marginTop:8}}>
              {promotionCode && <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4}}><span>Promo</span><strong>{promotionCode}</strong></div>}
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:8}}><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
              <button onClick={checkout} style={{width:"100%", padding:"10px 12px", background:"#166534", color:"#fff", borderRadius:12}}>
                Checkout Securely with Stripe
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
