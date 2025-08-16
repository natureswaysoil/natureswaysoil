import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { getProduct, products } from "@/lib/products";

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;

  // narrow slug to string and fetch
  const s = typeof slug === "string" ? slug : "";
  const product = s ? getProduct(s) : null;

  const [qty, setQty] = useState(1);

  function handleBuy() {
    if (!product) return; // <-- key fix so TS knows product isn't null
    router.push(`/checkout?slug=${encodeURIComponent(product.slug)}&qty=${qty}`);
  }

  if (!product) {
    // render something while fallback page resolves or if slug is bad
    return (
      <main className="min-h-screen p-6">
        <Head>
          <title>Product — Nature’s Way Soil</title>
        </Head>
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
    <main className="min-h-screen px-6 py-8 max-w-4xl mx-auto">
      <Head>
        <title>{product.title} — Nature’s Way Soil</title>
      </Head>

      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="mt-2 text-xl">${product.price.toFixed(2)}</p>

      {/* quantity picker */}
      <div className="mt-6 flex items-center gap-3">
        <label htmlFor="qty" className="text-sm text-gray-700">
          Quantity
        </label>
        <select
          id="qty"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="border rounded-lg px-2 py-1"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <button
          onClick={handleBuy}
          className="ml-4 px-6 py-2 rounded-2xl bg-green-700 text-white"
        >
          Buy
        </button>

        <Link href="/products" className="ml-4 text-green-700 underline">
          Back
        </Link>
      </div>
    </main>
  );
}

/** Static generation keeps your product pages fast */
export async function getStaticPaths() {
  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    fallback: true, // render "Product not found" block until hydrated
  };
}

export async function getStaticProps() {
  // no page-level props needed; data is read in component
  return { props: {} };
}
