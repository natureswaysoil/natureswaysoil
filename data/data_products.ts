// /data/products.ts

// Base product you edit. `sku` is optional for you.
export type ProductBase = {
  slug: string;
  title: string;
  subtitle: string;
  price: number;   // number only (no $)
  image: string;   // path under /public, e.g. "/products/dog-urine-1gal.jpg"
  active: boolean;
  sku?: string;    // optional: if you provide it, we use it
};

// Product the app uses everywhere: sku is guaranteed
export type Product = Omit<ProductBase, "sku"> & { sku: string };

/** Edit this list as usual (no need to include sku unless you want to). */
const RAW_PRODUCTS: ProductBase[] = [
  {
    slug: "dog-urine-1gal",
    title: "Dog Urine Neutralizer – 1 gal",
    subtitle: "Pet-safe spot repair & odor control",
    price: 39.99,
    image: "/products/dog-urine-1gal.jpg",
    active: true,
    // sku: "DOG-URINE-1GAL", // optionally set your own
  },
  {
    slug: "liquid-bone-meal-32oz",
    title: "Liquid Bone Meal Fertilizer — 32 oz",
    subtitle: "Fast phosphorus + calcium",
    price: 24.99,
    image: "/products/liquid-bone-meal-32oz.jpg",
    active: true,
  },
  {
    slug: "liquid-kelp-32oz",
    title: "Liquid Kelp Fertilizer — 32 oz",
    subtitle: "Natural hormones & micros",
    price: 24.99,
    image: "/products/liquid-kelp-32oz.jpg",
    active: true,
  },
  {
    slug: "hay-pasture-1gal",
    title: "Hay & Pasture Liquid Fertilizer — 1 gal",
    subtitle: "Horse-safe pasture nutrition",
    price: 49.99,
    image: "/products/hay-pasture-1gal.jpg",
    active: true,
  },
];

/** If you didn't specify sku, generate one from slug and a sequence number. */
function makeSku(p: ProductBase, index: number): string {
  if (p.sku && p.sku.trim()) return p.sku.trim();
  const base = p.slug.replace(/[^a-z0-9]/gi, "").toUpperCase();
  const seq = String(index + 1).padStart(3, "0");
  return `NWS-${base}-${seq}`;
}

/** This is what the rest of the app imports. */
export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p, i) => ({
  ...p,
  sku: makeSku(p, i),
}));

export const activeProducts = PRODUCTS.filter((p) => p.active);

export function getProduct(slug: string): Product | null {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export type { Product as DefaultProduct };

