import Link from "next/link";
import type { Product } from "@/data/products";

type Props = { product: Product };

export default function ProductCard({ product: p }: Props) {
  return (
    <li className="rounded-2xl border hover:shadow-sm">
      <img
        src={p.image}              // e.g. "/products/dog-urine-1gal.jpg"
        alt={p.title}
        className="w-full h-48 object-contain bg-white rounded-t-2xl"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-semibold">{p.title}</h3>
        {p.subtitle && <p className="mt-1 text-gray-600 text-sm">{p.subtitle}</p>}
        <p className="mt-2 font-semibold">${p.price.toFixed(2)}</p>
        <Link href={`/products/${p.slug}`} className="mt-3 inline-block text-sm text-green-700">
          View
        </Link>
      </div>
    </li>
  );
}

