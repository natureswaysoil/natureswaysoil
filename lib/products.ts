// /lib/products.ts

export type Product = {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  price: number;     // numeric only
  image: string;     // path under /public or remote (configure next.config.js)
  featured?: boolean;
  active?: boolean;
  sku?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "organic-liquid-fertilizer-1gal",
    title: "Nature's Way Soil Organic Liquid Fertilizer — 1 Gallon",
    subtitle: "Microbial-rich balanced fertilizer for gardens and lawns",
    price: 20.99,
    image: "/products/organic-liquid-1gal.jpg",
    active: true,
    sku: "NWS-128-ORG"
  },
  {
    id: 2,
    slug: "tomato-liquid-fertilizer-1gal",
    title: "Organic Tomato Liquid Fertilizer — 1 Gallon",
    subtitle: "Tomato-focused nutrients with beneficial microbes",
    price: 24.99,
    image: "/products/tomato-1gal.jpg",
    active: true,
    sku: "NWS-128-TOM"
  },
  {
    id: 3,
    slug: "liquid-kelp-1gal",
    title: "Liquid Kelp Fertilizer — 1 Gallon",
    subtitle: "Seaweed extract for root vigor and stress tolerance",
    price: 29.99,
    image: "/products/kelp-1gal.jpg",
    active: true,
    sku: "NWS-128-KELP"
  }
];

export function getActiveProducts() {
  return PRODUCTS.filter(p => p.active !== false);
}

export function getProduct(slug: string): Product | null {
  return PRODUCTS.find(p => p.slug === slug) ?? null;
}
