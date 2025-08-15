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

  // Read promo from URL (?pc=CODE or ?promo=CODE)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const pc = params.get("pc") || params.get("promo") || undefined;
    setPromo(pc || undefined);
  }, []);

  function addToCart(p: Product) {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === p.id);
      if (idx >= 0) {

::contentReference[oaicite:0]{index=0}
