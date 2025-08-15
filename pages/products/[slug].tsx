import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { Product } from "@/lib/products";
import { getProduct, products } from "@/lib/products";

type Props = { product: Product | null };

export default function ProductDetail({ product }: Props) {
  const router = useRouter();
  if (!product) return <main className="p-10">Product not found.</main>;

  // Optional qty picker (set to 1 if you don't want this)
  const [qty, setQty] = useState<number>(1);

  function handleBuy() {
    // you can add analytics or validation here before navigating
    router.push(`/checkout?slug=${product.slug}&qty=${qty}`);
  }

  return (
    <main className="min-h-screen px-6 py-16 max-w-7xl mx-auto">
      <Head>
        <title>{product.title} – Nature’s Way Soil</title>
      </Head>

      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="mt-2 text-2xl">${product.price.toFixed(2)}</p>

      <div className="mt-6 flex items-center gap-3">
        {/* Buy button uses router.push (client-side, fast) */}
        <button
          onClick={handleBuy}
          className="px-6 py-3 rounded-2xl bg-green-700 text-white"
        >
          Buy
        </button>

        {/* Qty picker (optional) */}
        <select
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="border rounded-xl px-2 py-1"
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <Link href="/products" className="ml-4 px-6 py-3 rounded-2xl border">
          Back
        </Link>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug || "");
  const product = getProduct(slug) || null;
  return { props: { product } };
};
