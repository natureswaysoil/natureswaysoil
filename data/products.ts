// data/products.ts
// Central product typing + list

export type ProductBase = {
  slug: string;
  title: string;
  subtitle: string;
  price: number;       // numeric only
  image: string;       // under /public, e.g. "/products/dog-urine-1gal.jpg"
  active: boolean;
  sku?: string;        // optional manual override
};

// App-wide product always has a SKU (manual or generated)
export type Product = ProductBase & { sku: string };

// “NWS-{ounces}-{two-letter code}” generator
function genSku(p: ProductBase): string {
  // extract ounces from title first number like "32", "128", etc.
  const ounceMatch = p.title.match(/(\d+)\s*(oz|ounce|ounces|gal)/i);
  let ounces = "NA";
  if (ounceMatch) {
    const raw = ounceMatch[1];
    // If it's gallons, convert 1 gal -> 128 oz (or leave raw if you wrote oz)
    if (/gal/i.test(ounceMatch[2] || "")) {
      const n = parseInt(raw, 10);
      ounces = String(n * 128);
    } else {
      ounces = raw;
    }
  }

  // two-letter code from title words (e.g. "Liquid Kelp" -> "LK")
  const words = p.title.split(/\s+/).filter(Boolean);
  const initials = (words[0]?.[0] || "") + (words[1]?.[0] || "");
  const code = initials.toUpperCase();

  return `NWS-${ounces}-${code || "XX"}`;
}

// Raw source list (use actual images placed in /public/products/*.jpg)
const RAW_PRODUCTS: ProductBase[] = [
  {
    slug: "dog-urine-1gal",
    title: "Dog Urine Neutralizer – 1 gal",
    subtitle: "Pet-safe spot repair & odor control",
    price: 39.99,
    image: "/products/dog-urine-1gal.jpg",
    active: true,
    // sku: "NWS-128-DU", // you can still override per product if you want
  },
  {
    slug: "liquid-bone-meal-32oz",
    title: "Liquid Bone Meal Fertilizer – 32 oz",
    subtitle: "Fast phosphorus + calcium",
    price: 24.99,
    image: "/products/liquid-bone-meal-32oz.jpg",
    active: true,
  },
  {
    slug: "liquid-kelp-32oz",
    title: "Liquid Kelp Fertilizer – 32 oz",
    subtitle: "Natural hormones & micros",
    price: 24.99,
    image: "/products/liquid-kelp-32oz.jpg",
    active: true,
  },
  {
    slug: "hay-pasture-1gal",
    title: "Hay & Pasture Liquid Fertilizer – 1 gal",
    subtitle: "Horse-safe pasture nutrition",
    price: 49.99,
    image: "/products/hay-pasture-1gal.jpg",
    active: true,
  },
];

// Export the final list with guaranteed SKU
export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p) => ({
  ...p,
  sku: p.sku ?? genSku(p),
}));

export function getProduct(slug: string): Product | null {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}
