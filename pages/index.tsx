// pages/index.tsx
import * as React from "react";
import Head from "next/head";

// Data & types
import { PRODUCTS, type Product } from "../data/products";

// UI
import Cart, { type CartItem } from "../components/Cart";
import ChatWidget from "../components/ChatWidget";

/**
 * Helper: convert our CartItem -> Stripe line item.
 * - If id looks like a Stripe Price id (starts with "price_"), we pass { price, quantity }.
 * - Otherwise we create inline price_data with the local name + unit_amount.
 */
function toStripeLineItem(i: CartItem) {
  if (i.id.startsWith("price_")) {
    return { price: i.id, quantity: i.qty };
  }
  return {
    price_data: {
      currency: "USD",
      unit_amount: i.price, // cents
      product_data: { name: i.name },
    },
    quantity: i.qty,
  };
}

export default function Home() {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = React.useState(false);

  // Optional: read ?success=1 or ?canceled=1 from URL to show a simple status.
  const [status, setStatus] = React.useState<"success" | "canceled" | null>(
    null
  );
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("success")) setStatus("success");
    if (params.get("canceled")) setStatus("canceled");
  }, []);

  function addToCart(p: Product) {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === p.id);
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
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function handleCheckout() {
    if (items.length === 0) return;
    const lineItems = items.map(toStripeLineItem);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineItems }),
      });

      // Expecting { url: string } from /api/checkout
      const data: { url?: string } = await res.json();
      if (data?.url && typeof window !== "undefined") {
        window.location.href = data.url;
      }
    } catch {
      // no-op; you can toast an error here
    }
  }

  return (
    <>
      <Head>
        <title>Nature’s Way Soil — From Our Farm to Your Garden</title>
        <meta
          name="description"
          content="Premium organic soil blends enriched with biochar, worm castings, and mycorrhizae. Healthier plants, bigger yields."
        />
      </Head>

      {/* Status toast after Stripe redirect */}
      {status && (
        <div
          role="status"
          style={{
            position: "fixed",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            background: status === "success" ? "#0b7" : "#b00",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: 8,
            zIndex: 10_000,
          }}
        >
          {status === "success"
            ? "Payment successful—thank you!"
            : "Checkout canceled."}
        </div>
      )}

      {/* Hero */}
      <header
        style={{
          padding: "48px 16px 16px",
          textAlign: "center",
          maxWidth: 1024,
          margin: "0 auto",
        }}
      >
        <h1 style={{ margin: 0, lineHeight: 1.15 }}>
          Nature’s Way Soil <span style={{ opacity: 0.8 }}>🌱</span>
        </h1>
        <p style={{ marginTop: 12, opacity: 0.8 }}>
          From our farm to your garden — premium organic soil blends enriched
          with biochar, worm castings, & mycorrhizae.
        </p>
        <button
          onClick={() => setCartOpen(true)}
          style={{
            marginTop: 12,
            background: "#0b7",
            color: "#fff",
            border: 0,
            padding: "10px 14px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          View Cart
        </button>
      </header>

      {/* Product Grid */}
      <main
        style={{
          maxWidth: 1024,
          margin: "0 auto",
          padding: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        {PRODUCTS.map((p) => (
          <article
            key={p.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              overflow: "hidden",
              display: "grid",
              gridTemplateRows: "160px 1fr auto",
              background: "#fff",
            }}
          >
            {/* Image */}
            <div
              style={{
                background: `url(${p.image}) center/cover no-repeat`,
                width: "100%",
                height: 160,
              }}
              aria-label={p.name}
            />

            {/* Body */}
            <div style={{ padding: 12 }}>
              <h3 style={{ margin: "4px 0 0" }}>{p.name}</h3>
              {p.subtitle ? (
                <div style={{ fontSize: 12, opacity: 0.7 }}>{p.subtitle}</div>
              ) : null}
              <div style={{ marginTop: 8, fontWeight: 700 }}>
                {(p.price / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>

            {/* CTA */}
            <div style={{ padding: 12 }}>
              <button
                onClick={() => addToCart(p)}
                style={{
                  width: "100%",
                  background: "#0b7",
                  color: "#fff",
                  border: 0,
                  padding: "10px 14px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
                aria-label={`Add ${p.name} to cart`}
              >
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </main>

      {/* Cart */}
      <Cart
        open={cartOpen}
        items={items}
        onUpdateQty={updateQty}
        onRemove={remove}
        onCheckout={handleCheckout}
        onClose={() => setCartOpen(false)}
      />

      {/* Chat Widget */}
      <ChatWidget
        onAsk={async (q) => {
          // If you have an API route wired (e.g., /api/chat), call it here:
          // const res = await fetch("/api/chat", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify({ q }),
          // });
          // const data = await res.json();
          // return data.answer ?? "No answer available right now.";

          // Temporary local fallback:
          return `Great question about "${q}"! For soil health: mix compost, keep moisture even, and avoid over-fertilizing. 🌿`;
        }}
      />
    </>
  );
}

