// components/HeaderCart.tsx
'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { cartCount, onCartChange } from "../lib/cart-store";

export default function HeaderCart() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(cartCount());
    const off = onCartChange(() => setCount(cartCount()));
    return off;
  }, []);

  return (
    <button
      onClick={() => router.push("/cart")}
      className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl border hover:shadow-sm"
      aria-label="View cart"
      title="View cart"
    >
      <span aria-hidden>🛒</span>
      <span className="text-sm">Cart</span>
      <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-green-700 text-white text-xs flex items-center justify-center">
        {count}
      </span>
    </button>
  );
}
