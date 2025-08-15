// ⬇️ ADD THESE FIRST
import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";

import { PRODUCTS, type Product } from "../data/products";   // correct with /data at repo root
import Cart, { type CartItem } from "../components/Cart";    // correct with /components at repo root
import ChatWidget from "../components/ChatWidget";           // if you use it in the JSX
const [items, setItems] = useState<CartItem[]>([]);
const [cartOpen, setCartOpen] = useState(false);


function addToCart(p: Product) {
  setItems((prev) => {
    const idx = prev.findIndex((i) => i.id === p.id);
    const copy = [...prev];

    if (idx >= 0) {
      copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
    } else {
      copy.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
    }

    return copy; // ← REQUIRED
  });

  setCartOpen(true);
}

function updateQty(id: string, qty: number) {
  setItems((prev) =>
    prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
  ); // ← callback returns CartItem[]
}

function remove(id: string) {
  setItems((prev) => prev.filter((i) => i.id !== id)); // ← returns CartItem[]
}

const subtotal = useMemo(
  () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
  [items]
);
