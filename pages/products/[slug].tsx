import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { getProduct, PRODUCTS } from "@/data/products";

export default function ProductDetail() {
  const router = useRouter();
  const s = typeof router.query.slug === "string" ? router.query.slug : "";
  const product = s ? getProduct(s) : null;
  const [qty, setQty] = useState(1);

  function handleBuy() {
    if (!product) return;
    router.push(`/checkout?slug=${encodeURIComponent(product.slug)}&qty=${qty}`);
  }

  if (!product) {
    return (
      <main className="min-h-screen p-6">
        <Head><title>Product — Nature’s Way Soil</title></Head>
        <h1 className="text-2xl font-bold">Product not found</h1>
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
        <div className="w-full rounded-2xl bg-white border flex items-center justify-center">
          <img
            src={product.image}     // e.g. "/products/dog-urine-1gal.jpg"
            alt={product.title}
            className="max-h-[28rem] object-contain p-4"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/placeholder-product.png";
            }}
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          {product.description && <p className="mt-2 text-gray-600">{product.description}</p>}
          <p className="mt-4 text-2xl font-semibold">${product.price.toFixed(2)}</p>

          <div className="mt-6 flex items-center gap-3">
            <label htmlFor="qty" className="text-sm text-gray-700">Quantity</label>
            <select
              id="qty"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border rounded-xl px-2 py-1"
            >
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>

            <button onClick={handleBuy} className="ml-2 px-6 py-3 rounded-2xl bg-green-700 text-white">
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

export async function getStaticPaths() {
  return { paths: PRODUCTS.map((p: any) => ({ params: { slug: p.slug } })), fallback: true };
}
export async function getStaticProps() { return { props: {} }; }

