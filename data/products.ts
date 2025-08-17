// data/products.ts
// Bridge wrapper around your generated data_products.ts
// Ensures the UI always has name, title, price (cents), image fallback,
// and a guaranteed `slug` for product links.

import * as RAW from "../data_products";

type MaybeAny = any;
const RAW_LIST: MaybeAny[] =
  (RAW as any).PRODUCTS ??
  (RAW as any).default ??
  (RAW as any).products ??
  [];

/** App-wide product type used by components */
export type Product = {
  id: string;
  name: string;
  title?: string;
  price: number;            // cents
  image?: string;
  subtitle?: string;
  description?: string;
  sku?: string;
  stripePriceId?: string | null;
  status?: "active" | "draft";
  category?: string;
  slug: string;             // <-- now guaranteed
};

function slugify(input: string): string {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Normalize raw input into strict Product[] our UI expects */
function normalize(raw: any): Product | null {
  if (!raw) return null;

  const title = String(raw.title ?? raw.name ?? "").trim();
  const price = Number(raw.price ?? 0);
  if (!title || !price) return null;

  const id =
    String(raw.id ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "_")).trim();

  const name = String(raw.name ?? title);
  const image =
    raw.image && String(raw.image).trim()
      ? String(raw.image).trim()
      : "/products/missing.jpg"; // safe fallback

  const status =
    String(raw.status ?? "active").toLowerCase() === "draft" ? "draft" : "active";

  const baseForSlug = raw.slug ?? raw.id ?? title;
  const slug = slugify(baseForSlug);

  return {
    id,
    name,
    title,
    price,
    image,
    subtitle: raw.subtitle || undefined,
    description: raw.description || undefined,
    sku: raw.sku || undefined,
    stripePriceId: raw.stripePriceId ?? null,
    status,
    category: raw.category || undefined,
    slug, // <-- guaranteed
  };
}

/** Final, sanitized array used by pages/components */
export const PRODUCTS: Product[] = (Array.isArray(RAW_LIST) ? RAW_LIST : [])
  .map(normalize)
  .filter((p): p is Product => Boolean(p));

/** Helpers */
export function getProduct(idOrSlug: string) {
  return (
    PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug) ?? null
  );
}

export function activeProducts() {
  return PRODUCTS.filter((p) => (p.status ?? "active") === "active");
}




