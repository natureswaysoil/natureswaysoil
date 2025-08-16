import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { getProduct, products } from "@/data/products";

export default function ProductDetail() {
  const router = useRouter();
  const s = typeof router.query.slug === "string" ? router.query.slug : "";
  const product = s ? getProduct(s) : null;

  const [qty, setQty] = useState(1);

  function handleBuy() {
    if (!product) return; // TS narrowing + runtime safety
    router.push(`/checkout?slug=${encodeURIComponent(product.slug)}&qty=${qty}`);
  }

  if (!product) {
    return (
      <main className="min-h-screen p-6">
        <Head><title>Product — Nature’s Way Soil</title></Head>
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-gray-700">
          The product you're looking for isn't available.
        </p>
        <Link href="/products" className="mt-4 inline-block text-green-700 underline">
          Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-8 max-w-5xl mx-auto">
      <Head><title>{product.title} — Nature’s Way Soil</title></Head>

      <div className="grid gap-8 md:grid-cols-2">
        {/* IMAGE — note we use product.image, not slug */}
        <div className="relative w-full h-80 md:h-[28rem] rounded-2xl bg-white border">
          <Image
            src={product.image}               // ✅ e.g. "/products/dog-urine-1gal.jpg"
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-contain p-4"
            priority={false}
          />
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          {product.subtitle && (
            <p className="mt-2 text-gray-600">{product.subtitle}</p>
          )}

          <p className="mt-4 text-2xl font-semibold">
            ${product.price.toFixed(2)}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <label htmlFor="qty" className="text-sm text-gray-700">
              Quantity
            </label>
            <select
              id="qty"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border rounded-xl px-2 py-1"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>

            <button
              onClick={handleBuy}
              className="ml-2 px-6 py-3 rounded-2xl bg-green-700 text-white"
            >
              Buy
            </button>

            <Link href="/products" className="ml-2 text-green-700 underline">
              Back
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

/** Static generation */
export async function getStaticPaths() {
  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    fallback: true,
  };
}
export async function getStaticProps() {
  return { props: {} };
}

