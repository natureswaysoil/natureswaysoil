export type Product = {
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  active: boolean;
  sku?: string;
};

// Helper function to create slugs from SKU (if present), otherwise from title
function makeSlug(sku: string, title: string) {
  if (sku) return sku.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const PRODUCTS: Product[] = [
  // ... your full product list here ...
];

// Find product by SKU or slug
export function getProduct(identifier: string): Product | undefined {
  const id = identifier.toLowerCase();
  return PRODUCTS.find(
    p => (p.sku && p.sku.toLowerCase() === id) || p.slug === id
  );
}