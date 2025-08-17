// data/products.ts
// Bridge wrapper around your generated data_products.ts
// Ensures the UI always has `name`, `title`, valid cents price,
// and an image fallback to avoid runtime/builder errors.

// Try to import in the most flexible way possible so this works
// whether your generator exported `PRODUCTS` (named) or `default`.
import * as RAW from "./data_products";

type MaybeAny = any;
const RAW_LIST: MaybeAny[] =
  (RAW as any).PRODUCTS ??
  (RAW as any).default ??
  (RAW as any).products ??
  [];

/** App-wide product type used by components */
export type Product = {
  id: string;
  /** canonical display name */
  name: string;
  /** optional alias; older components sometimes read title */
  title?: string;
  /** price in cents */
  price: number;
  /** public URL or /public path; a fallback is added here */
  image?: string;
  /** optional */
  subtitle?: string;
  /** optional */
  description?: string;
  /** optional */
  sku?: string;
  /** optional */
  stripePriceId?: string | null;
  /** "active" | "draft" (default "active" if omitted) */
  status?: "active" | "draft";
  /** optional */
  category?: string;
};

/** Normalize raw input into strict Product[] our UI expects */
function normalize(raw: any): Product | null {
  if (!raw) return null;

  // In your generator you said "title and price required" — keep that here
  const title = String(raw.title ?? raw.name ?? "").trim();
  const price = Number(raw.price ?? 0);

  if (!title || !price) return null;

  // id must be present and unique — your generator already ensured uniqueness
  const id = String(raw.id ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "_")).trim();

  // Use `name` as canonical display; alias `title` for legacy consumers
  const name = String(raw.name ?? title);
  const image =
    raw.image && String(raw.image).trim()
      ? String(raw.image).trim()
      : "/products/missing.jpg"; // fallback so builder never fails

  // status default to "active" if omitted
  const status =
    String(raw.status ?? "active").toLowerCase() === "draft" ? "draft" : "active";

  return {
    id,
    name,
    title, // keep a copy for components reading `p.title`
    price,
    image,
    subtitle: raw.subtitle || undefined,
    description: raw.description || undefined,
    sku: raw.sku || undefined,
    stripePriceId: raw.stripePriceId ?? null,
    status,
    category: raw.category || undefined,
  };
}

/** Final, sanitized array used by pages/components */
export const PRODUCTS: Product[] = (Array.isArray(RAW_LIST) ? RAW_LIST : [])
  .map(normalize)
  .filter((p): p is Product => Boolean(p));

/** Helpers (handy in pages/api/checkout.ts etc.) */
export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

export function activeProducts() {
  return PRODUCTS.filter((p) => (p.status ?? "active") === "active");
}



