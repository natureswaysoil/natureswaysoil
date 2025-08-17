// /data/products.ts
// Copy-paste this entire file

export type Product = {
  id: string;
  title: string;
  price: number;         // cents
  image?: string;
  subtitle?: string;
  slug: string;
};

// IMPORTANT: the file BELOW must exist at: /data/data_products.ts
// If your file is somewhere else, see the notes after this file.
import * as RAW from "./data_products";

// Accept a few possible export shapes: PRODUCTS / default / products
type AnyList = any[];
const RAW_LIST: AnyList =
  ((RAW as any).PRODUCTS as AnyList) ??
  ((RAW as any).default as AnyList) ??
  ((RAW as any).products as AnyList) ??
  [];

// tiny helpers
const toSlug = (s: string) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const toCents = (v: any) => {
  const n = Number(v);
  // if the CSV already provided cents, keep it; otherwise convert dollars->cents
  if (!isFinite(n)) return 0;
  return n > 0 && n < 1000 ? Math.round(n * 100) : Math.round(n);
};

const SEEN = new Set<string>();
const list: Product[] = [];

for (const r of RAW_LIST) {
  const idRaw = r?.id ?? r?.sku ?? r?.ID ?? "";
  const titleRaw = r?.title ?? r?.name ?? r?.Title ?? "";
  const priceRaw = r?.price ?? r?.Price ?? r?.["Selling Price"] ?? 0;

  const id = String(idRaw).trim();
  const title = String(titleRaw).trim();
  const price = toCents(priceRaw);

  // only keep active + complete rows if the generator included flags
  const active = (r?.active ?? r?.Active ?? r?.status ?? r?.Status) ?? true;
  if (!active) continue;

  if (!id || !title || !price) continue;

  // ensure unique id
  let uid = id;
  let i = 2;
  while (SEEN.has(uid)) uid = `${id}-${i++}`;
  SEEN.add(uid);

  list.push({
    id: uid,
    title,
    price,
    image: r?.image ?? r?.Image ?? r?.img ?? undefined,
    subtitle: r?.subtitle ?? r?.Subtitle ?? undefined,
    slug: toSlug(title),
  });
}

export const PRODUCTS: Product[] = list;



