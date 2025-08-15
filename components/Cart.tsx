// pages/components/Cart.tsx
import * as React from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number; // store in cents for Stripe-friendliness; display divides by 100
  qty: number;
}

export interface CartProps {
  open: boolean;
  items: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onClose: () => void;
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const Cart: React.FC<CartProps> = ({
  open,
  items,
  onUpdateQty,
  onRemove,
  onCheckout,
  onClose,
}) => {
  // SSR guard not necessary here (no window usage in render),
  // but keep logic pure & typed.
  const subtotal = React.useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const handleDec = (id: string, current: number) => {
    const next = Math.max(1, current - 1);
    onUpdateQty(id, next);
  };

  const handleInc = (id: string, current: number) => {
    const next = current + 1;
    onUpdateQty(id, next);
  };

  if (!open) return null;

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "min(420px, 95vw)",
        height: "100dvh",
        background: "#ffffff",
        boxShadow: "0 0 0 9999px rgba(0,0,0,.3)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>Cart</strong>
        <button onClick={onClose} aria-label="Close cart">
          ✕
        </button>
      </header>

      <div style={{ padding: 16, overflowY: "auto", flex: 1 }}>
        {items.length === 0 ? (
          <p style={{ opacity: 0.7 }}>Your cart is empty.</p>
        ) : (
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {items.map((it) => (
              <li
                key={it.id}
                style={{
                  borderBottom: "1px solid #f1f1f1",
                  padding: "12px 0",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{it.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    {currency.format(it.price / 100)}
                  </div>
                  <div style={{ marginTop: 8, display: "inline-flex", gap: 8 }}>
                    <button
                      onClick={() => handleDec(it.id, it.qty)}
                      aria-label={`Decrease ${it.name}`}
                    >
                      −
                    </button>
                    <span aria-live="polite">{it.qty}</span>
                    <button
                      onClick={() => handleInc(it.id, it.qty)}
                      aria-label={`Increase ${it.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 600 }}>
                    {currency.format((it.price * it.qty) / 100)}
                  </div>
                  <button
                    onClick={() => onRemove(it.id)}
                    style={{
                      marginTop: 6,
                      fontSize: 12,
                      opacity: 0.8,
                      textDecoration: "underline",
                      background: "transparent",
                      border: 0,
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer
        style={{
          borderTop: "1px solid #eee",
          padding: 16,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Subtotal</div>
          <div style={{ fontWeight: 700 }}>{currency.format(subtotal / 100)}</div>
        </div>
        <button
          disabled={items.length === 0}
          onClick={onCheckout}
          style={{
            background: "#0b7",
            border: 0,
            color: "#fff",
            padding: "10px 14px",
            borderRadius: 6,
            cursor: items.length === 0 ? "not-allowed" : "pointer",
          }}
          aria-disabled={items.length === 0}
        >
          Checkout
        </button>
      </footer>
    </aside>
  );
};

export default React.memo(Cart);
