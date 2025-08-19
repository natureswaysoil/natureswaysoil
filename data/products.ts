// /data/products.ts

export type Product = {
  id: string;          // Unique identifier for cart compatibility
  slug: string;        // URL/key, e.g. "liquid-kelp-1gal"
  title: string;       // Display name
  description?: string;
  price: number;       // USD
  image: string;       // Can be remote (add domain to next.config.js images.domains)
  active: boolean;     // Hide/show in UI
  sku: string;         // For Stripe / your cart
  featured?: boolean;  // For homepage display
};

// Comprehensive product catalog with accurate Amazon URLs where available
export const PRODUCTS: Product[] = [
  {
    id: "org-fert-1gal",
    slug: "organic-liquid-fertilizer-1gal",
    title: "Nature's Way Soil Organic Liquid Fertilizer — 1 Gallon",
    description: "Microbial-rich balanced fertilizer for gardens and lawns.",
    price: 20.99,
    image: "https://m.media-amazon.com/images/I/718tWBNNfkL._AC_UL320_.jpg",
    active: true,
    sku: "NWS-128-ORG",
    featured: true
  },
  {
    id: "tom-fert-1gal",
    slug: "tomato-liquid-fertilizer-1gal",
    title: "Organic Tomato Liquid Fertilizer — 1 Gallon",
    description: "Tomato-focused nutrients with beneficial microbes.",
    price: 24.99,
    image: "https://m.media-amazon.com/images/I/71yKQHf6cGL._AC_UL320_.jpg",
    active: true,
    sku: "NWS-128-TOM",
    featured: true
  },
  {
    id: "kelp-fert-1gal",
    slug: "liquid-kelp-1gal",
    title: "Liquid Kelp Fertilizer — 1 Gallon",
    description: "Seaweed extract for root vigor and stress tolerance.",
    price: 29.99,
    image: "https://m.media-amazon.com/images/I/71J2xJtTAdL._AC_UL320_.jpg",
    active: true,
    sku: "NWS-128-KELP",
    featured: true
  },
  {
    id: "bloom-boost-1gal",
    slug: "bloom-booster-1gal",
    title: "Bloom Booster Liquid Fertilizer — 1 Gallon",
    description: "High-phosphorus formula to promote flowering and fruiting.",
    price: 26.99,
    image: "/placeholder-product.png", // Fallback to placeholder if no Amazon image available
    active: true,
    sku: "NWS-128-BLOOM",
    featured: false
  },
  {
    id: "root-stimulator-1gal",
    slug: "root-stimulator-1gal",
    title: "Root Stimulator Liquid Fertilizer — 1 Gallon",
    description: "Promotes strong root development for transplants and new plantings.",
    price: 22.99,
    image: "/placeholder-product.png", // Fallback to placeholder if no Amazon image available
    active: true,
    sku: "NWS-128-ROOT",
    featured: false
  },
  {
    id: "lawn-liquid-fert-1gal",
    slug: "lawn-liquid-fertilizer-1gal",
    title: "Lawn Liquid Fertilizer — 1 Gallon",
    description: "Balanced nutrition for healthy, green lawns year-round.",
    price: 18.99,
    image: "/placeholder-product.png", // Fallback to placeholder if no Amazon image available
    active: true,
    sku: "NWS-128-LAWN",
    featured: false
  }
];

// Returns the product with the given slug, or null if it doesn't exist.
export const getProduct = (slug: string): Product | null =>
  PRODUCTS.find((p) => p.slug === slug) ?? null;

// Returns all active products
export const getActiveProducts = (): Product[] =>
  PRODUCTS.filter(p => p.active);

// Export products array for compatibility
export const products = PRODUCTS;
