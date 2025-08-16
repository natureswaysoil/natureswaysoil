export type Product = {
  slug: string;
  title: string;
  subtitle?: string;
  price: number;        // numbers only (no $)
  image: string;        // e.g. "/products/dog-urine-1gal.jpg"
  active?: boolean;
};

export const products: Product[] = [
  // ⚠️ Put the real prices you want live. Images must exist under /public/products/
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
    title: "Liquid Bone Meal Fertilizer",
    subtitle: "Fast phosphorus + calcium — 32 oz",
    price: 24.99,
    image: "/products/liquid-bone-meal-32oz.jpg",
    active: true,
  },
  {
    slug: "liquid-kelp-32oz",
    title: "Liquid Kelp Fertilizer",
    subtitle: "Natural hormones & micros — 32 oz",
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
  // add more active items as needed…
];

export function getProduct(slug: string) {
  return products.find(p => p.slug === slug && (p.active ?? true)) || null;
}


