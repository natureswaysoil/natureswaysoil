// /data/products.ts
import productsData from './products.json';

export type Product = {
  id?: number;         // For backward compatibility with cart system
  slug: string;        // URL/key, e.g. "liquid-kelp-1gal"
  title: string;       // Display name
  subtitle?: string;   // Short description for card display
  description?: string; // Full description for detail page
  price: number;       // USD
  image: string;       // Can be remote (add domain to next.config.js images.domains)
  active: boolean;     // Hide/show in UI
  featured?: boolean;  // Show in featured section on home page
  sku: string;         // For Stripe / your cart
};

// Load products from generated JSON (from CSV)
export const PRODUCTS: Product[] = productsData;

// Returns the product with the given slug, or null if it doesn't exist.
export const getProduct = (slug: string): Product | null =>
  PRODUCTS.find((p) => p.slug === slug) ?? null;

// Returns only active products (for backward compatibility)
export const getActiveProducts = () =>
  PRODUCTS.filter(p => p.active !== false);
