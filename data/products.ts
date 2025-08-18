// /data/products.ts
// (only the image fields changed here)

export type Product = {
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;   // can be remote (https://...) now
  active: boolean;
  sku?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "dog-urine-1gal",
    title: "Dog Urine Neutralizer – 1 gal",
    subtitle: "Pet-safe spot repair & odor control",
    price: 39.99,
    image: "https://m.media-amazon.com/images/I/61ll2EiLAJL._AC_UL320_.jpg",
    active: true,
    sku: "NWS-128-DU"
  },
  {
    slug: "liquid-bone-meal-32oz",
    title: "Liquid Bone Meal Fertilizer — 32 oz",
    subtitle: "Fast phosphorus + calcium",
    price: 24.99,
    image: "https://m.media-amazon.com/images/I/615mJs9XccL._AC_UL320_.jpg",
    active: true,
    sku: "NWS-32-LBM"
  },
  {
    slug: "liquid-kelp-32oz",
    title: "Liquid Kelp Fertilizer — 32 oz",
    subtitle: "Natural hormones & micros",
    price: 24.99,
    image: "https://m.media-amazon.com/images/I/510ui3CBLbL._AC_UL320_.jpg",
    active: true,
    sku: "NWS-32-LK"
  },
  {
    slug: "hay-pasture-1gal",
    title: "Hay & Pasture Liquid Fertilizer — 1 gal",
    subtitle: "Horse-safe pasture nutrition",
    price: 49.99,
    image: "https://m.media-amazon.com/images/I/718tWBNNfkL._AC_UL320_.jpg",
    active: true,
    sku: "NWS-128-HP"
  }
];

