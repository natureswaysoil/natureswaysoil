// /data/products.ts
export type Product = {
  id: string;         // Stripe Price ID if you have it; temporary strings are fine
  name: string;
  subtitle?: string;
  price: number;      // cents
  image: string;      // url or /public/ path
};

export const PRODUCTS: Product[] = [
  {
    id: "price_premium_soil",
    name: "Premium Organic Soil (1 cu ft)",
    subtitle: "Biochar + Compost + Worm Castings + Mycorrhizae",
    price: 1999,
    image: "/soil-bag.jpg", // or use a full URL if you prefer
  },
  {
    id: "price_tomato_mix",
    name: "Tomato Booster Mix",
    subtitle: "Bigger yields for heavy feeders",
    price: 1799,
    image: "/soil-bag.jpg",
  },
  {
    id: "price_orchid_mix",
    name: "Orchid & Indoor Mix",
    subtitle: "Airy blend for roots + moisture balance",
    price: 1699,
    image: "/soil-bag.jpg",
  },
];

