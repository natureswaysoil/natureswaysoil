import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { PRODUCTS, type Product } from "../data/products";
import Cart, { type CartItem } from "../components/Cart";
import ChatWidget from "../components/ChatWidget";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [promo, setPromo] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const pc = params.get("pc") || params.get("promo");
    setPromo(pc || undefined);
  }, []);

  function addToCart(p: Product) {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === p.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { ...p, qty: 1 }];
    });
    setCartOpen(true);
  }

  function updateQty(id: string, qty: number) {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)));
  }

  const brand = process.env.NEXT_PUBLIC_BRAND_NAME || "Nature’s Way Soil";
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@natureswaysoil.com";
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <Head>
        <title>{brand} — From Our Farm to Your Garden</title>
        <meta
          name="description"
          content="Premium organic soil and plant care that nurture growth, boost blooms, and feed your garden naturally."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo-with-tagline.png"
              width={56}
              height={56}
              alt="Nature’s Way Soil"
              className="rounded"
            />
            <span className="font-semibold">{brand}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#shop" className="hover:underline">Shop</a>
            <a href="#story" className="hover:underline">Our Story</a>
            <a href="#promise" className="hover:underline">Promise</a>
            <button
              onClick={() => setCartOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-green-700 text-white"
            >
              View Cart ({items.reduce((s, i) => s + i.qty, 0)})
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="relative">
          <img src="/hero-garden.jpg" alt="Healthy garden" className="w-full h-[60vh] object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-5xl mx-auto px-6 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">From Our Farm to Your Garden</h1>
              <p className="text-lg md:text-2xl max-w-2xl">
                Premium organic soil and plant care that nurture growth, boost blooms, and feed your garden naturally.
              </p>
              <div className="mt-6 flex gap-3">
                <a href="#shop" className="px-6 py-3 rounded-xl bg-green-600 font-semibold">🛒 Shop Now</a>
                <a href="#story" className="px-6 py-3 rounded-xl bg-white/10 border">Learn More</a>
              </div>
            </div>
          </div>
        </section>

        {/* SHOP GRID */}
        <section id="shop" className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map(p => (
              <div key={p.id} className="border rounded-2xl overflow-hidden shadow-sm">
                <img src={p.image} alt={p.title} className="w-full h-52 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-gray-700 text-sm mt-1">Stronger roots. Greener leaves. Better harvests.</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold">${p.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(p)}
                      className="px-4 py-2 rounded-xl bg-green-700 text-white"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STORY */}
        <section id="story" className="bg-green-50">
          <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-3">Why Gardeners Trust {brand}</h2>
              <p className="text-gray-700 mb-3">
                A thriving garden starts with living soil. Every product we create is crafted with care using organic,
                sustainable ingredients directly from our farm.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>100% Organic Ingredients</li>
                <li>Sourced From Our Farm</li>
                <li>Satisfaction Guaranteed</li>
                <li>Secure Stripe Checkout</li>
              </ul>
            </div>
            <img src="/farm.jpg" alt="Our farm" className="w-full rounded-2xl shadow" />
          </div>
        </section>

        {/* PROMISE */}
        <section id="promise" className="max-w-6xl mx-auto px-4 py-14">
          <div className="bg-white border rounded-2xl p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Farm-to-Garden Promise</h3>
              <p className="text-gray-700">
                We ship directly from our farm so you get the freshest mixes and formulas. If you are not thrilled,
                we will make it right.
              </p>
              <p className="mt-4 font-semibold">Summer Offer: Free shipping over $50</p>
            </div>
            <div className="text-right">
              <a href="#shop" className="inline-block px-6 py-3 rounded-xl bg-green-700 text-white font-semibold">
                Shop All Products
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {year} {brand}. All rights reserved.</p>
          <p>Questions? <a href={`mailto:${supportEmail}`} className="underline">{supportEmail}</a></p>
        </div>
      </footer>

      {/* CART + CHAT */}
      {cartOpen && (
        <Cart
          items={items}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          promotionCode={promo}
        />
      )}
      <ChatWidget />
    </>
  );
}
