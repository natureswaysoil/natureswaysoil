import Image from "next/image";
import Link from "next/link";
import type { Product } from "../lib/products";

type Props = { product: Product; onAdd?: (p: Product) => void };

export default function ProductCard({ product, onAdd }: Props) {
  const price = `$${product.price.toFixed(2)}`;
  const img = product.image || "/logo-with-tagline.png";

  return (
    <div className="rounded-2xl border p-4 shadow-sm bg-white">
      <div className="relative w-full h-60 rounded-xl bg-white">
        <Image
          src={img}
          alt={product.title}
          fill
          sizes="(min-width:1024px) 300px, 45vw"
          className="object-contain rounded-xl"
          priority={false}
        />
      </div>

      <h3 className="mt-3 font-semibold">{product.title}</h3>
      <p className="text-sm text-gray-600">{product.subtitle}</p>

      <div className="mt-2 font-bold">{price}</div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onAdd?.(product)}
          className="px-3 py-2 rounded-xl bg-green-700 text-white hover:bg-green-800"
        >
          Add to Cart
        </button>
        <Link
          href={`/products/${product.slug}`}
          className="px-3 py-2 rounded-xl border hover:bg-gray-50"
        >
          Details
        </Link>
      </div>
    </div>
  );
}


