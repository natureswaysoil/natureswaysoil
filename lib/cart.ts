export type CartItem = {
  slug: string;
  title: string;
  price: number;
  qty: number;
  sku?: string;
};

export type Cart = {
  items: CartItem[];
  shipping: number;
  tax: number;
  subtotal: number;
  total: number;
};

export function calculate(cart: Cart): Cart {
  const subtotal = cart.items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const shipping = subtotal > 50 ? 0 : 7.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  return { ...cart, subtotal, shipping, tax, total };
}
import productsData from '@/data/products.json';

export type Product = {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  active: boolean;
  sku: string;
  images?: string[];
  featured?: boolean;
  image?: string;
  variations?: { name: string; price: number }[];
};

const products = productsData as Product[];

export function listProducts(): Product[] {
  return products.filter((p) => p.active);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug && p.active);
}