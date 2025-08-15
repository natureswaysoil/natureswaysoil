// pages/cart.tsx
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { calculate, type Cart, type CartItem } from "../lib/cart";
import { readCart, setQuantity, removeFromCart, clearCart, onCartChange } from "../lib/cart-store";

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [cart, setCart] = useState<Cart>({ items: [], shipping: 0, tax: 0, subtotal: 0, total: 0 });

  function recompute(list = items) {
    setCart(calculate({ items: list, shipping: 0, tax: 0, subtotal: 0, total: 0 }));
  }

  useEffect(() => {
    const init = readCart();
    setItems(init);
    setCart(calculate({ items: init, shipping: 0, tax: 0, subtotal: 0, total: 0 }));
    const off = onCartChange(() => {
      const current = readCart();
      setItems(current);
      setCart(calculate({ items: current, shipping: 0, tax: 0, subtotal: 0, total: 0 }));
    });
    return off;
  }, []);

  if (!items.length) {
    return (
      <main className="min-h-screen max-w-3xl mx-auto px-6 py-16">
        <Head><title>Your Cart – Nature’s Way Soil</title></Head>
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="mt-4 text-gray-700">Your cart is empty.</p>
        <a href="/products" className="mt-6 inline-block px-5 py-3 rounded-2xl bg-green-700 text-white">Browse products →</a>
      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-16">
      <Head><title>Your Cart – Nature’s Way Soil</title></Head>
      <h1 className="text-3xl font-bold">Your Cart</h1>

      <div className="mt-8 grid md:grid-cols-3 gap-8">
        <section className="md:col-span-2 space-y-4">
          {items.map((it) => (
            <div key={it.slug} className="flex items-center gap-4 border rounded-2xl p-4">
              <div className="flex-1">
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-gray-600">SKU: {it.sku || "—"}</div>
              </div>
              <div className="w-28 text-right">${(it.price * it.qty).toFixed(2)}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setQuantity(it.slug, Math.max(1, it.qty - 1)); }}
                  className="w-8 h-8 rounded-lg border"
                  aria-label="Decrease quantity"
                >–</button>
                <input
                  type="number"
                  min={1}
                  value={it.qty}
                  onChange={(e) => {
                    const q = Math.max(1, Number(e.target.value) || 1);
                    setQuantity(it.slug, q);
                  }}
                  className="w-14 text-center border rounded-lg py-1"
                />
                <button
                  onClick={() => { setQuantity(it.slug, it.qty + 1); }}
                  className="w-8 h-8 rounded-lg border"
                  aria-label="Increase quantity"
                >+</button>
              </div>
              <button
                onClick={() => removeFromCart(it.slug)}
                className="ml-2 text-sm text-red-600"
              >Remove</button>
            </div>
          ))}

          <button
            onClick={() => clearCart()}
            className="text-sm text-gray-600 underline"
          >
            Clear cart
          </button>
        </section>

        <aside className="md:col-span-1 border rounded-2xl p-5 h-fit">
          <h2 className="font-semibold">Order summary</h2>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>${cart.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>${cart.shipping.toFixed(2)}</span></div>
            <div className="flex justify-between font-semibold"><span>Total</span><span>${cart.total.toFixed(2)}</span></div>
          </div>
          <button
            onClick={() => router.push("/checkout")}
            className="mt-4 w-full px-5 py-3 rounded-2xl bg-green-700 text-white"
          >
            Checkout
          </button>
          <a href="/products" className="mt-3 block text-center text-green-700 text-sm">Continue shopping →</a>
        </aside>
      </div>
    </main>
  );
}
