// /pages/index.tsx
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import products from "../data/products";

type CartLine = { sku: string; name: string; price: number; qty: number; image?: string };

export default function Home() {
  const active = useMemo(() => products.filter(p => p.status === "active"), []);
  const [cart, setCart] = useState<CartLine[]>([]);

  // Load cart from localStorage (client only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) setCart(JSON.parse(raw));
    } catch {}
  }, []);

  // Save cart
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (sku: string) => {
    const p = active.find(x => x.sku === sku);
    if (!p) return;
    setCart(prev => {
      const i = prev.findIndex(l => l.sku === sku);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return [...prev, { sku: p.sku, name: p.name, price: p.price, qty: 1, image: p.image }];
    });
  };

  const total = cart.reduce((s, l) => s + l.price * l.qty, 0);

  return (
    <>
      <Head>
        <title>Nature&apos;s Way Soil | Organic Mixes & Amendments</title>
        <meta name="description" content="Premium organic soils, compost, biochar, and earth-friendly amendments." />
      </Head>

      <header style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/logo.png" alt="Nature's Way Soil" style={{ height: 40 }} />
          <h1 style={{ margin: 0 }}>Nature&apos;s Way Soil</h1>
        </div>
        <a href="/cart" style={styles.cartLink} aria-label="Cart">
          🛒 <span style={{ marginLeft: 6 }}>{cart.reduce((s, l) => s + l.qty, 0)} items</span>
          <span style={{ marginLeft: 8 }}>${total.toFixed(2)}</span>
        </a>
      </header>

      <main style={styles.main}>
        <section style={styles.hero}>
          <div>
            <h2 style={{ fontSize: 28, margin: "0 0 8px" }}>Premium Organic Soil & Amendments</h2>
            <p style={{ margin: 0 }}>
              Sustainably sourced, biochar-enriched, and powered by worm castings & mycorrhizae.
            </p>
          </div>
          <img src="/hero.jpg" alt="" style={{ maxHeight: 160, borderRadius: 12, objectFit: "cover" }} />
        </section>

        <section>
          <h3 style={{ margin: "24px 0 12px" }}>Shop</h3>
          <div style={styles.grid}>
            {active.map(p => (
              <article key={p.sku} style={styles.card}>
                <div style={{ width: "100%", paddingTop: "75%", position: "relative", background: "#f7f7f7" }}>
                  <img
                    src={p.image}
                    alt={p.title || p.name}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                <div style={{ padding: 12 }}>
                  <h4 style={{ margin: "0 0 6px", fontSize: 16 }}>{p.name}</h4>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong>${p.price.toFixed(2)}</strong>
                    <button onClick={() => addToCart(p.sku)} style={styles.button} aria-label={`Add ${p.name} to cart`}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <small>© {new Date().getFullYear()} Nature&apos;s Way Soil • <a href="https://natureswaysoil.com">natureswaysoil.com</a></small>
      </footer>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 16px", borderBottom: "1px solid #eee", position: "sticky", top: 0, background: "#fff", zIndex: 10
  },
  cartLink: { textDecoration: "none", display: "flex", alignItems: "center", fontWeight: 600 },
  main: { maxWidth: 1100, margin: "0 auto", padding: "16px" },
  hero: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: 16, borderRadius: 12, background: "#f3faf5", border: "1px solid #e0efe6", gap: 16
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 16
  },
  card: { border: "1px solid #eee", borderRadius: 12, overflow: "hidden", background: "#fff" },
  button: { padding: "6px 10px", borderRadius: 8, border: "1px solid #0a7b34", background: "#10a344", color: "#fff", cursor: "pointer" },
  footer: { textAlign: "center", padding: 24, borderTop: "1px solid #eee", marginTop: 24 }
};

