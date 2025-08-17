// /pages/index.tsx
import React, { useMemo, useState } from "react";
import Head from "next/head";

// IMPORTANT: keep these paths exactly as shown
import { PRODUCTS, type Product } from "../data/products";
import Cart, { type CartItem } from "../components/Cart";
import ChatWidget from "../components/ChatWidget";

function dollars(cents: number) {
  return (cents / 100).toFixed(2);
}

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  // --- Featured selection rules:
  // 1) show products with featured === true & active === true
  // 2) if none are flagged, fallback to the first 3 active products
  const featured: Product[] = useMemo(() => {
    const active = PRODUCTS.filter(p => p.active);
    const flagged = active.filter(p => p.featured);
    return (flagged.length ? flagged : active).slice(0, 3);
  }, []);

  function addToCart(p: Product) {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === p.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
    setCartOpen(true);
  }

  function updateQty(id: string, qty: number) {
    setItems(prev =>
      prev
        .map(i => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        .filter(i => i.qty > 0)
    );
  }

  function remove(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  return (
    <>
      <Head>
        <title>Nature’s Way Soil — From our farm to your garden</title>
        <meta
          name="description"
          content="Premium organic soil blends enriched with biochar, worm castings & mycorrhizae — made in the USA."
        />
      </Head>

      {/* HERO */}
      <header className="w-full bg-[#0f3d2e] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold">
              Nature’s Way Soil
            </h1>
            <p className="mt-3 text-white/80">
              From our farm to your garden — premium organic soil blends
              enriched with biochar, worm castings, & mycorrhizae.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#featured"
                className="inline-flex items-center rounded-md bg-white px-4 py-2 text-[#0f3d2e] font-medium shadow"
              >
                View Featured
              </a>
              <a
                href="/shop"
                className="inline-flex items-center rounded-md border border-white/40 px-4 py-2 font-medium"
              >
                View All Products
              </a>
            </div>
            <ul className="mt-6 grid gap-2 text-sm text-white/80">
              <li>• Biochar for aeration & nutrient retention</li>
              <li>• Worm castings for living biology</li>
              <li>• Mycorrhizae to supercharge roots</li>
            </ul>
          </div>
          <div className="justify-self-center">
            {/* If you have a hero image: /public/soil-bag-hero.png */}
            <img
              src="/soil-bag-hero.png"
              alt="Nature’s Way Soil"
              className="w-full max-w-sm rounded-lg shadow-lg"
              onError={(e) => {
                // invisible fallback, keeps layout tidy if missing
                (e.currentTarget as HTMLImageElement).style.opacity = "0";
              }}
            />
          </div>
        </div>
      </header>

      {/* FEATURED */}
      <main className="mx-auto max-w-6xl px-4">
        <section id="featured" className="py-12">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Featured</h2>
            <a href="/shop" className="text-[#0f3d2e] hover:underline">
              View all
            </a>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <article
                key={p.id}
                className="rounded-xl border border-black/10 bg-white shadow-sm"
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-neutral-50">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/placeholder-product.png";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{p.name}</h3>
                  {!!p.subtitle && (
                    <p className="mt-1 text-sm text-neutral-600">{p.subtitle}</p>
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

          <div className="mt-8 text-center">
            <a
              href="/shop"
              className="inline-flex items-center rounded-md border border-black/20 px-4 py-2"
            >
              Browse full catalog
            </a>
          </div>
        </section>
      </main>

      {/* CART + CHAT */}
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        subtotal={subtotal}
        updateQty={updateQty}
        removeItem={remove}
      />
      <ChatWidget />
    </>
  );
}

