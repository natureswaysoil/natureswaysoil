// /data/products.ts
export type Product = {
  slug: string;
  name: string;
  price: number;
  size: string;
  image: string;   // e.g. "/products/liquid-kelp-32oz.jpg"
  tagline?: string;
};

export const featured: Product[] = [
  {
    slug: "dog-urine-neutralizer-1gal",
    name: "Dog Urine Neutralizer & Lawn Reviver",
    price: 39.99,
    size: "1 gal",
    image: "/products/dog-urine-1gal.jpg",
    tagline: "Pet-safe spot repair & odor control",
  },
  {
    slug: "liquid-bone-meal-32oz",
    name: "Liquid Bone Meal Fertilizer",
    price: 24.99,
    size: "32 oz",
    image: "/products/liquid-bone-meal-32oz.jpg",
    tagline: "Fast phosphorus + calcium",
  },
  {
    slug: "liquid-kelp-32oz",
    name: "Liquid Kelp Fertilizer",
    price: 24.99,
    size: "32 oz",
    image: "/products/liquid-kelp-32oz.jpg",
    tagline: "Natural hormones & micros",
  },
  {
    slug: "hay-pasture-1gal",
    name: "Hay & Pasture Liquid Fertilizer",
    price: 49.99,
    size: "1 gal",
    image: "/products/hay-pasture-1gal.jpg",
    tagline: "Horse-safe pasture nutrition",
  },
];


