import productsData from '@/data/products.json';

export type Product = {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  active: boolean;
  sku: string;
  images: string[];
  variations?: { name: string; price: number }[];
};

const products = productsData as Product[];

export function listProducts(): Product[] {
  return products.filter((p) => p.active);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug && p.active);
}