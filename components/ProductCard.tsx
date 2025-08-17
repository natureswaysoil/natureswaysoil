// components/ProductCard.tsx
import Link from "next/link";
import type { Product } from "@/data/products";

type Props = { product: Product };

function formatCents(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function ProductCard({ product: p }: Props) {
  const href = `/products/${p.slug ?? p.id}`;

  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <img
        src={p.image || "/products/missing.jpg"}
        alt={p.title ?? p.name}
        className="w-full h-48 object-contain bg-white rounded-t"
        loading="lazy"
      />

      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2">
          {p.title ?? p.name}
        </h3>

        {p.subtitle && (
          <p className="mt-1 text-gray-600 text-sm">{p.subtitle}</p>
        )}

        <p className="mt-2 font-semibold">{formatCents(p.price)}</p>

        <div className="mt-3">
          <Link
            href={href}
            className="inline-block text-sm text-green-700 hover:text-green-800"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
