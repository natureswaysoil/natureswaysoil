// /data/products.ts

// /components/ProductCard.tsx
import React from "react";
import type { Product } from "../data/products";

function formatUSD(cents: number) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

type Props = {
  p: Product;
  onAdd?: (p: Product) => void;
};

export default function ProductCard({ p, onAdd }: Props) {
  const img =
    p.image && p.image.trim() !== "" ? p.image : "/images/placeholder.png";

  return (
    <div className="rounded-xl border shadow-sm overflow-hidden bg-white">
      <img
        src={img}
        alt={p.name}               {/* <-- use name instead of title */}
        className="w-full h-48 object-contain bg-white rounded-t-2xl"
        loading="lazy"
      />
      <div className="p-3 space-y-1">
        <h3 className="font-semibold leading-tight">{p.name}</h3>
        {p.subtitle && (
          <p className="text-sm text-gray-500">{p.subtitle}</p>
        )}
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold">{formatUSD(p.price)}</span>
          <button
            type="button"
            onClick={() => onAdd?.(p)}
            className="px-3 py-1 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}



