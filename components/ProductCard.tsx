// /components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Product } from "../data/products";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white">
        <Image
          src={p.image}
          alt={p.name}
          fill
          className="object-contain group-hover:scale-[1.02] transition-transform"
          sizes="(min-width:1024px) 300px, 45vw"
          priority={false}
        />
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{p.name}</h3>
        {p.tagline && <p className="text-sm text-gray-600">{p.tagline}</p>}
        <div className="mt-2 flex items-center justify-between">
          <div className="text-base font-medium">
            ${p.price.toFixed(2)}{" "}
            <span className="text-gray-500 text-sm">· {p.size}</span>
          </div>
          <Link
            href={`/products/${p.slug}`}
            className="rounded-xl border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
