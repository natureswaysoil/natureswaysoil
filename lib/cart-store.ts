// lib/cart-store.ts
import type { CartItem } from "./cart";

const KEY = "nws_cart";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(item: CartItem) {
  const items = readCart();
  const i = items.findIndex((x) => x.slug === item.slug);
  if (i >= 0) items[i].qty += item.qty;
  else items.push(item);
  writeCart(items);
}

export function clearCart() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function cartCount() {
  return readCart().reduce((n, it) => n + (it.qty || 0), 0);
}
