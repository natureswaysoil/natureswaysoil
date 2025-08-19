// /pages/shop.tsx
import React, { useMemo, useState } from "react";
import Head from "next/head";
import { PRODUCTS, type Product } from "../data/products";
import Cart, { type CartItem } from "../components/Cart";

function dollars(cents: number) {
  return (cents / 100).toFixed(2);
}

export default function Shop() {
  const active = useMemo(() => PRODUCTS.filter(p => p.active), []);
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(p: Product) {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === p.slug);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { id: p.slug, name: p.title, price: p.price, qty: 1 }];
    });
    setCartOpen(true);
  }

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  return (
    <>
      <Head>
        <title>Shop — Nature’s Way Soil</title>
      </Head>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Shop</h1>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((p) => (
            <article
              key={p.slug}
              className="rounded-xl border border-black/10 bg-white shadow-sm"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-neutral-50">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/placeholder-product.png";
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{p.title}</h3>
                {!!p.description && (
                  <p className="mt-1 text-sm text-neutral-600">{p.description}</p>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    ${dollars(p.price)}
                  </span>
                  <button
                    onClick={() => addToCart(p)}
                    className="rounded-md bg-[#0f3d2e] px-3 py-1.5 text-white"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onUpdateQty={(id: string, qty: number) =>
          setItems(prev =>
            prev
              .map(i => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
              .filter(i => i.qty > 0)
          )
        }
        onRemove={(id: string) => setItems(prev => prev.filter(i => i.id !== id))}
        onCheckout={() => {}}
      />
    </>
  );
}
