import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { PRODUCTS as products } from "@/data/products";
import { addToCart, cartCount } from "@/lib/cart-store";

export default function ProductsPage() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen px-6 py-16 max-w-7xl mx-auto">
      <Head><title>Products – Nature’s Way Soil</title></Head>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => router.push("/checkout")}
          className="text-sm px-3 py-2 rounded-xl border"
          aria-label="Go to checkout"
        >
          Cart: {count || cartCount()} →
        </button>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.slug} className="group border rounded-2xl p-5 hover:shadow-md">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="mt-1 text-gray-700">${p.price.toFixed(2)}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => router.push(`/checkout?slug=${p.slug}&qty=1`)}
                className="px-4 py-2 rounded-xl bg-green-700 text-white"
              >
                Buy
              </button>
              <button
                onClick={() => {
                  addToCart({ slug: p.slug, title: p.title, price: p.price, qty: 1, sku: p.sku });
                  setCount((c) => c + 1);
                }}
                className="px-4 py-2 rounded-xl border"
              >
                Add to cart
              </button>
              <a href={`/products/${p.slug}`} className="ml-auto text-green-700">
                View →
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

