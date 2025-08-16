// /components/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";

type Props = { product: Product };

export default function ProductCard({ product: p }: Props) {
  return (
    <li className="rounded-2xl border hover:shadow-sm">
      {/* Image block must be relative for Next/Image `fill` */}
      <div className="relative w-full h-48 bg-white rounded-t-2xl">
        <Image
          src={p.image}          // from /public/products/...
          alt={p.title}          // <- use title, not name
          fill
          sizes="(min-width:1024px) 300px, 45vw"
          className="object-contain"
          priority={false}
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold">{p.title}</h3>
        {p.subtitle && (
          <p className="mt-1 text-gray-600 text-sm">{p.subtitle}</p>
        )}
        <p className="mt-2 font-semibold">${p.price.toFixed(2)}</p>
        <Link
          href={`/products/${p.slug}`}
          className="mt-3 inline-block text-sm text-green-700"
        >
          View
        </Link>
      </div>
    </li>
  );
}
