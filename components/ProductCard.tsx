// components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Product } from "../data/products";
import { money } from "../data/products";
import { addToCart } from "../lib/cart-store";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const p = product;

  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      <Link href={`/products/${p.slug}`} className="block group">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-white">
          <Image
            src={p.image}
            alt={p.title}
            width={800}
            height={800}
            sizes="(min-width:1024px) 300px, 45vw"
            className="h-full w-full object-contain transition-transform group-hover:scale-[1.02]"
            priority={false}
          />
        </div>

        <h3 className="mt-3 font-semibold">{p.title}</h3>
        <p className="text-sm text-gray-600">{p.subtitle}</p>
        <p className="mt-1 font-semibold">{money(p.price)}</p>
      </Link>

      <button
        onClick={() => addToCart(p.slug, 1)}
        className="mt-3 w-full rounded-xl bg-green-700 px-4 py-2 text-white hover:bg-green-800"
      >
        Add to Cart
      </button>
    </div>
  );
}
