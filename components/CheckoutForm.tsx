"use client";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe, AddressElement } from "@stripe/react-stripe-js";
import { calculate, Cart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { readCart, clearCart } from "@/lib/cart-store";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

function InnerCheckout({ initialCart }: { initialCart: Cart }) {
  const stripe = useStripe();
  const elements = useElements();
  const [cart, setCart] = useState<Cart>(calculate(initialCart));
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/stripe/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart })
      });
      const j = await r.json();
      setClientSecret(j.clientSecret);
    })();
  }, [cart.total]);

  async function pay() {
    if (!stripe || !elements || !clientSecret) return;
    setLoading(true); setErr(null);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/success`, receipt_email: email || undefined }
    });
    if (error) setErr(error.message || "Payment error");
    else clearCart();
    setLoading(false);
  }

  return (
    <div className="grid md:grid-cols-5 gap-10">
      <div className="md:col-span-3 space-y-6">
        <div className="p-5 border rounded-2xl">
          <h3 className="font-semibold">Contact</h3>
          <input placeholder="Email for receipt" value={email} onChange={(e) => setEmail(e.target.value)}
            className="mt-3 w-full border rounded-xl px-3 py-2" />
        </div>
        <div className="p-5 border rounded-2xl">
          <h3 className="font-semibold">Billing & Shipping</h3>
          <div className="mt-3"><AddressElement options={{ mode: "shipping", fields: { phone: "always" } }} /></div>
        </div>
        <div className="p-5 border rounded-2xl">
          <h3 className="font-semibold">Payment</h3>
          <div className="mt-3"><PaymentElement /></div>
          {err && <p className="text-red-600 text-sm mt-3">{err}</p>}
          <button onClick={pay} disabled={loading || !stripe} className="mt-4 px-6 py-3 rounded-2xl bg-green-700 text-white">
            {loading ? "Processing..." : "Pay now"}
          </button>
        </div>
      </div>

      <aside className="md:col-span-2 p-5 border rounded-2xl h-fit">
        <h3 className="font-semibold">Order summary</h3>
        <ul className="mt-3 space-y-2">
          {cart.items.map((it) => (
            <li key={it.slug} className="flex justify-between text-sm">
              <span>{it.title} × {it.qty}</span>
              <span>${(it.price * it.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t pt-3 text-sm space-y-1">
          <div className="flex justify-between"><span>Subtotal</span><span>${cart.subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>${cart.shipping.toFixed(2)}</span></div>
          <div className="flex justify-between font-semibold"><span>Total</span><span>${cart.total.toFixed(2)}</span></div>
        </div>
      </aside>
    </div>
  );
}

export default function CheckoutForm({ slug, qty }: { slug?: string; qty?: number }) {
  const item = slug ? getProduct(slug) : null;
  const items = item
    ? [{ slug: item.slug, title: item.title, price: item.price, qty: qty || 1, sku: item.sku }]
    : readCart();
  const initialCart: Cart = { items, shipping: 0, tax: 0, subtotal: 0, total: 0 };

  return (
    <Elements stripe={stripePromise}>
      <InnerCheckout initialCart={initialCart} />
    </Elements>
  );
}
