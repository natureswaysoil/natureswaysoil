import type { CartItem } from "@/lib/cart";

const KEY = "nws_cart";
const EVT = "nws:cart-changed";

function emit() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVT));
  }
}

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
  emit();
}

export function addToCart(item: CartItem) {
  const items = readCart();
  const i = items.findIndex((x) => x.slug === item.slug);
  if (i >= 0) items[i].qty += item.qty;
  else items.push(item);
  writeCart(items);
}

export function removeFromCart(slug: string) {
  writeCart(readCart().filter((x) => x.slug !== slug));
}

export function setQuantity(slug: string, qty: number) {
  const items = readCart();
  const i = items.findIndex((x) => x.slug === slug);
  if (i >= 0) {
    items[i].qty = Math.max(1, qty);
    writeCart(items);
  }
}

export function clearCart() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  emit();
}

export function cartCount() {
  return readCart().reduce((n, it) => n + (it.qty || 0), 0);
}

export function onCartChange(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener(EVT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVT, handler);
    window.removeEventListener("storage", handler);
  };
}

