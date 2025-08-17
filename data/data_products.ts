// /data/products.ts

// Base product you edit. sku stays optional for you.
export type ProductBase = {
  slug: string;
  title: string;
  subtitle: string;
  price: number;   // number only (no $)
  image: string;   // path under /public, e.g. "/products/dog-urine-1gal.jpg"
  active: boolean;
  sku?: string;    // optional: your manual SKU wins if provided
};

// Product the app uses everywhere: sku is guaranteed
export type Product = Omit<ProductBase, "sku"> & { sku: string };

/** Edit this list as usual (you may add `sku` if you want to override the generator). */
const RAW_PRODUCTS: ProductBase[] = [
  {
    slug: "dog-urine-1gal",
    title: "Dog Urine Neutralizer – 1 gal",
    subtitle: "Pet-safe spot repair & odor control",
    price: 39.99,
    image: "/products/dog-urine-1gal.jpg",
    active: true,
    // sku: "NWS-128-DU", // optional manual override
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

/* ---------- SKU helpers ---------- */

/** Pull ounces from title or slug. Handles "32 oz", "1 gal"/"1gal" -> 128, etc. */
function extractOunces(p: ProductBase): number {
  // from title: "32 oz"
  const ozTitle = p.title.match(/(\d+(?:\.\d+)?)\s*oz/i);
  if (ozTitle) return Math.round(parseFloat(ozTitle[1]));

  // from slug: "...-32oz"
  const ozSlug = p.slug.match(/(\d+)\s*oz|(\d+)oz/i);
  if (ozSlug) return parseInt(ozSlug[1] || ozSlug[2], 10);

  // gallons in title: "1 gal" / "1 gallon"
  const galTitle = p.title.match(/(\d+(?:\.\d+)?)\s*(?:gal|gallon)s?/i);
  if (galTitle) return Math.round(parseFloat(galTitle[1]) * 128);

  // gallons in slug: "...-1gal"
  const galSlug = p.slug.match(/(\d+(?:\.\d+)?)\s*gal|(\d+(?:\.\d+)?)gal/i);
  if (galSlug) return Math.round(parseFloat(galSlug[1] || galSlug[2]) * 128);

  return 0; // unknown
}

/** Take first two words of the title, return their initials (e.g., "Liquid Kelp ..." -> "LK"). */
function firstTwoInitials(title: string): string {
  const words = title.split(/[^a-zA-Z]+/).filter(Boolean);
  const [w1, w2] = words;
  const letters = (w1 ? w1[0] : "") + (w2 ? w2[0] : "");
  return (letters || "XX").toUpperCase();
}

/** Your SKU pattern: NWS-<ounces>-<first-two-initials> */
function makeSku(p: ProductBase): string {
  if (p.sku && p.sku.trim()) return p.sku.trim(); // manual override

  const oz = extractOunces(p);
  const ozPart = oz > 0 ? String(oz) : "000";

  const initials = firstTwoInitials(p.title);

  return `NWS-${ozPart}-${initials}`;
}

/* ---------- Final export ---------- */

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p) => ({
  ...p,
  sku: makeSku(p),
}));

export const activeProducts = PRODUCTS.filter((p) => p.active);

export function getProduct(slug: string): Product | null {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export type { Product as DefaultProduct };
