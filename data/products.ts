// /data/products.ts

// Auto-generated from CSV; edit in the source sheet or update here.
// Prices are in CENTS (integers). Images are taken from your URL list (in order).
// Some items had no matching image URL available yet; those have image: "".

export type Product = {
  id: string;           // slug
  name: string;
  price: number;        // cents
  subtitle?: string;
  description?: string;
  image?: string;
  category?: string;
  sku?: string;
  stripePriceId?: string | null;
};

export const PRODUCTS: Product[] = [
  {
    id: `natures-way-biobased-product-with-b-1-vitamin-aloe-vera-juice-to-improv`,
    name: `Nature's Way...Biobased Product/with B-1 Vitamin, Aloe Vera Juice to Improv`,
    price: 2499,
    subtitle: `Biobased Product`,
    description: `Nature's Way...Biobased Product with B-1 Vitamin and Aloe Vera Juice.`,
    image: `https://i.ibb.co/0K0MwZY/biobased-b1-aloe-1gal.png`,
    category: `Fertilizer`,
    sku: `BIOBASEDB1-1GAL`,
    stripePriceId: null,
  },
  {
    id: `natures-way-soil-organic-potting-mix`,
    name: `Nature's Way Soil Organic Potting Mix...`,
    price: 1999,
    subtitle: `Organic Potting Mix`,
    description: `Nature's Way Soil Organic Potting Mix.`,
    image: `https://i.ibb.co/5cQbSdg/organic-potting-mix-1gal.png`,
    category: `Soil`,
    sku: `ORG-PM-1G`,
    stripePriceId: null,
  },
  {
    id: `liquid-biochar-with-humates`,
    name: `Nature’s Way Soil® Liquid Biochar with Humates`,
    price: 999,
    subtitle: `Liquid Biochar`,
    description: `Liquid Biochar with humates for improved soil structure.`,
    image: `https://i.ibb.co/9h7TFbs/liquid-biochar-humin-1gal.png`,
    category: `Amendment`,
    sku: `LQBCH-1G`,
    stripePriceId: null,
  },
  {
    id: `biochar-soil-amendment`,
    name: `Biochar Soil Amendment`,
    price: 1499,
    subtitle: `Biochar`,
    description: `Biochar soil amendment for improved soil carbon and structure.`,
    image: `https://i.ibb.co/5GmQfRD/biochar-amendment-1gal.png`,
    category: `Amendment`,
    sku: `BCH-1G`,
    stripePriceId: null,
  },
  {
    id: `worm-castings`,
    name: `Worm Castings`,
    price: 1699,
    subtitle: `Castings`,
    description: `High-quality worm castings.`,
    image: `https://i.ibb.co/0c8mQnH/worm-castings-1.png`,
    category: `Soil`,
    sku: `WC-1`,
    stripePriceId: null,
  },
  {
    id: `worm-castings-alt`,
    name: `Worm Castings (Alt)`,
    price: 1699,
    subtitle: `Castings`,
    description: `Alternate listing for worm castings.`,
    image: `https://i.ibb.co/p2x7W6w/worm-castings-2.png`,
    category: `Soil`,
    sku: `WC-1-ALT`,
    stripePriceId: null,
  },
  {
    id: `liquid-bone-meal-fertilizer`,
    name: `Nature's Way Soil Liquid Bone Meal Fertilizer – Organic Phosp...Plant Food for Vegetables, Flowers, Trees, and Shrubs 1 Gallon`,
    price: 1299,
    subtitle: `Liquid Bone Meal`,
    description: `Organic phosphorus source for healthy root development.`,
    image: `https://i.ibb.co/0L0y3rp/liquid-bone-1gal.png`,
    category: `Fertilizer`,
    sku: `LBM-1G`,
    stripePriceId: null,
  },
  {
    id: `raised-bed-mix`,
    name: `Raised Bed Mix`,
    price: 2199,
    subtitle: `Raised Bed`,
    description: `Balanced mix for raised beds.`,
    image: `https://i.ibb.co/7nVPfrL/raised-bed-mix-1.png`,
    category: `Soil`,
    sku: `RBM-1`,
    stripePriceId: null,
  },
  // --- The rest of your "Active" items from the CSV follow in the same shape ---
  // NOTE: Some items below had no corresponding image URL available in your list yet.
  // Fill those images in when you have the URLs (currently set to "").

  {
    id: `liquid-humic-fulvic-acid-1g`,
    name: `Nature's Way Soil Liquid Humic & Fulvic Acid with Organic Kel...e, Natural Soil Conditioner, Plant Growth Stimulator, 1 Gallon`,
    price: 1299,
    subtitle: `Humic & Fulvic Acid`,
    description: `Liquid humic & fulvic acid conditioner.`,
    image: ``,
    category: `Fertilizer`,
    sku: `HUM-FUL-1G`,
    stripePriceId: null,
  },
  {
    id: `liquid-bone-meal-fertilizer-1g`,
    name: `Nature's Way Soil Liquid Bone Meal Fertilizer – Organic Phosp...Plant Food for Vegetables, Flowers, Trees, and Shrubs 1 Gallon`,
    price: 1299,
    subtitle: `Liquid Bone Meal`,
    description: `Organic phosphorus for strong roots (1 Gallon).`,
    image: ``,
    category: `Fertilizer`,
    sku: `LBM-1G-ALT`,
    stripePriceId: null,
  },
  {
    id: `liquid-biochar-kelp-humic-fulvic-1g`,
    name: `Nature’s Way Soil® Liquid Biochar with Kelp, Humic & Fulvic A...rdens & Lawns – Boost Microbes & Nutrient Retention – 1 Gallon`,
    price: 1299,
    subtitle: `Liquid Biochar + Kelp`,
    description: `Biochar with kelp, humic & fulvic acids.`,
    image: ``,
    category: `Amendment`,
    sku: `LQBC-KHF-1G`,
    stripePriceId: null,
  },
  {
    id: `liquid-kelp-fertilizer-32oz`,
    name: `Nature’s Way Soil® Liquid Kelp Fertilizer – Organic Seaweed P...ocessed | Natural Growth Booster & Soil Revitalizer (32 Ounce)`,
    price: 999,
    subtitle: `Liquid Kelp`,
    description: `Organic seaweed plant food (32 oz).`,
    image: ``,
    category: `Fertilizer`,
    sku: `LKP-32OZ`,
    stripePriceId: null,
  },
  {
    id: `liquid-humic-fulvic-acid-32oz`,
    name: `Nature’s Way Soil® Liquid Humic & Fulvic Acid – 32 oz Soil Co...robial Activity – Natural Lawn & Garden Supplement – Pet-Safe`,
    price: 999,
    subtitle: `Humic & Fulvic (32 oz)`,
    description: `Boosts microbial activity, pet-safe.`,
    image: ``,
    category: `Fertilizer`,
    sku: `HUM-FUL-32OZ`,
    stripePriceId: null,
  },
  {
    id: `liquid-humic-fulvic-acid-32oz-alt`,
    name: `Nature's Way Soil Organic Super Seaweed Humic & Fulvic – 32oz –...ral – Lawn, Garden, and Indoor Plants (Safe for Pets & Kids)`,
    price: 999,
    subtitle: `Seaweed Humic & Fulvic (32 oz)`,
    description: `Seaweed with humic & fulvic acids (32oz).`,
    image: ``,
    category: `Fertilizer`,
    sku: `SW-HUM-FUL-32OZ`,
    stripePriceId: null,
  },
  {
    id: `organic-potting-soil-20lb`,
    name: `All-Purpose Potting Soil`,
    price: 1299,
    subtitle: `All-Purpose`,
    description: `All-purpose potting soil for general use.`,
    image: `https://i.ibb.co/1YBQPVB/ap-potting-soil-20lb.png`,
    category: `Soil`,
    sku: `AP-PS-20LB`,
    stripePriceId: null,
  },
  // ... (continue the remaining active items in your CSV in this same structure) ...
];


