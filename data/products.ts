// /data/products.ts

export type Product = {
  slug: string;
  title: string;
  subtitle?: string;
  price: number;        // <-- numeric only (no $)
  image: string;        // <-- path under /public
  active?: boolean;     // set false to hide without deleting
};

export const products: Product[] = [
  {
    slug: "dog-urine-1gal",
    title: "Dog Urine Neutralizer — 1 gal",
    subtitle: "Pet-safe spot repair & odor control",
    price: 39.99,
    image: "/products/dog-urine-1gal.jpg",
    active: true,
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

// --- helpers ---
export const activeProducts = products.filter(p => p.active !== false);

export function getProduct(slug: string) {
  return activeProducts.find(p => p.slug === slug) ?? null;
}



