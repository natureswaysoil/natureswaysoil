// pages/index.tsx
import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { PRODUCTS, type Product } from "../data/products";
import Cart, { type CartItem } from "../components/Cart";
import ChatWidget from "../components/ChatWidget";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [promo, setPromo] = useState<string | undefined>(undefined);

  // read promo code from URL (?pc=CODE or ?promo=CODE)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const pc = params.get("pc") || params.get("promo");
    setPromo(pc || undefined);
  }, []);

  function addToCart(p: Product) {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === p.id);
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
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  return (
    <>
      <Head>
        <title>Nature’s Way Soil — From Our Farm To Your Garden</title>
        <meta
          name="description"
          content="Eco-friendly soil blends with biochar, compost, worm castings & mycorrhizae. Healthier roots, fewer waterings, better yields."
        />
      </Head>

      {/* HERO */}
      <header
        style={{
          background:
            "linear-gradient(180deg, #F1F8F3 0%, rgba(241,248,243,0) 60%)",
          padding: "56px 20px 16px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 36, margin: 0 }}>
          Nature’s Way Soil — 🌿 It’s Live
        </h1>
        <p style={{ color: "#475569", margin: "10px 0 18px" }}>
          Biochar-activated. Compost-rich. Mycorrhizae-powered.
        </p>
        <button
          onClick={() =>
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
          }
          style={{
            background: "#166534",
            color: "#fff",
            border: 0,
            borderRadius: 10,
            padding: "12px 18px",
            fontSize: 16,
          }}
        >
          Shop Bestsellers
        </button>
      </header>

      {/* PRODUCT GRID */}
      <main style={{ maxWidth: 1080, margin: "24px auto", padding: "0 16px" }}>
        <section id="products" style={{ marginTop: 8 }}>
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            }}
          >
            {PRODUCTS.map((p) => (
              <article
                key={p.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                <div style={{ aspectRatio: "4/3", background: "#f8fafc" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: 14 }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: 18 }}>{p.name}</h3>
                  <p style={{ margin: "0 0 12px", color: "#475569", fontSize: 14 }}>
                    {p.subtitle || "Organic, biochar-activated blend"}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <strong>${(p.price / 100).toFixed(2)}</strong>
                    <button
                      onClick={() => addToCart(p)}
                      style={{
                        background: "#166534",
                        color: "#fff",
                        border: 0,
                        borderRadius: 8,
                        padding: "8px 12px",
                        fontSize: 14,
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* TRUST STRIP */}
        <section
          style={{
            marginTop: 28,
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 14,
            display: "grid",
            gap: 8,
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          }}
        >
          <div>✅ Sustainably sourced</div>
          <div>💧 Helps retain water</div>
          <div>🪱 Worm castings + compost</div>
          <div>🧪 Mycorrhizal fungi support</div>
        </section>
      </main>

      {/* CART DRAWER */}
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onQty={updateQty}
        onRemove={remove}
        promo={promo}
        subtotal={subtotal}
      />

      {/* AI Chat helper */}
      <ChatWidget />
    </>
  );
}
