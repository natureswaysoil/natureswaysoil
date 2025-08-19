// /data/products.ts

export type Product = {
  slug: string;        // URL/key, e.g. "liquid-kelp-1gal"
  title: string;       // Display name
  description?: string;
  price: number;       // USD
  image: string;       // Can be remote (add domain to next.config.js images.domains)
  active: boolean;     // Hide/show in UI
  sku: string;         // For Stripe / your cart
};

// Minimal sample data. Replace/add as needed.
export const PRODUCTS: Product[] = [
  {
    slug: "organic-liquid-fertilizer-1gal",
    title: "Nature's Way Soil Organic Liquid Fertilizer — 1 Gallon",
    description: "Microbial-rich balanced fertilizer for gardens and lawns.",
    price: 20.99,
    image: "https://m.media-amazon.com/images/I/718tWBNNfkL._AC_UL320_.jpg",
    active: true,
    sku: "NWS-128-ORG"
  },
  {
    slug: "tomato-liquid-fertilizer-1gal",
    title: "Organic Tomato Liquid Fertilizer — 1 Gallon",
    description: "Tomato-focused nutrients with beneficial microbes.",
    price: 24.99,
    image: "https://m.media-amazon.com/images/I/71yKQHf6cGL._AC_UL320_.jpg",
    active: true,
    sku: "NWS-128-TOM"
  },
  {
    slug: "liquid-kelp-1gal",
    title: "Liquid Kelp Fertilizer — 1 Gallon",
    description: "Seaweed extract for root vigor and stress tolerance.",
    price: 29.99,
    image: "https://m.media-amazon.com/images/I/71J2xJtTAdL._AC_UL320_.jpg",
    active: true,
    sku: "NWS-128-KELP"
  }
];

// Returns the product with the given slug, or null if it doesn't exist.
export const getProduct = (slug: string): Product | null =>
  PRODUCTS.find((p) => p.slug === slug) ?? null;
