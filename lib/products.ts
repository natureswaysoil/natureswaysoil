// /lib/products.ts

export type Product = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  price: number;         // numeric only
  image: string;         // path under /public
  featured?: boolean;
  active?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "dog-urine-1gal",
    title: "Dog Urine Neutralizer – 1 gal",
    subtitle: "Pet-safe spot repair & odor control",
    price: 39.99,
    image: "/products/dog-urine-1gal.jpg",
    featured: true,
    active: true,
  },
  {
    id: 2,
    slug: "liquid-bone-meal-32oz",
    title: "Liquid Bone Meal Fertilizer – 32 oz",
    subtitle: "Fast phosphorus + calcium",
    price: 24.99,
    image: "/products/liquid-bone-meal-32oz.jpg",
    active: true,
  },
  {
    id: 3,
    slug: "liquid-kelp-32oz",
    title: "Liquid Kelp Fertilizer – 32 oz",
    subtitle: "Natural hormones & micros",
    price: 24.99,
    image: "/products/liquid-kelp-32oz.jpg",
    active: true,
  },
  {
    id: 4,
    slug: "hay-pasture-1gal",
    title: "Hay & Pasture Liquid Fertilizer – 1 gal",
    subtitle: "Horse-safe pasture nutrition",
    price: 49.99,
    image: "/products/hay-pasture-1gal.jpg",
    active: true,
  },
];

// helpers
export function getActiveProducts() {
  return PRODUCTS.filter(p => p.active !== false);
}

export function getProduct(slug: string) {
  return PRODUCTS.find(p => p.slug === slug) ?? null;
}
