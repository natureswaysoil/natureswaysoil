
import Head from "next/head";
import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductsPage(){
  return (
    <main className="min-h-screen px-6 py-16 max-w-7xl mx-auto">
      <Head><title>Products – Nature’s Way Soil</title></Head>
      <h1 className="text-3xl font-bold">Products</h1>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <Link key={p.slug} href={`/products/${p.slug}`} className="group border rounded-2xl p-5 hover:shadow-md">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="mt-1 text-gray-700">${"{p.price.toFixed(2)}"}</p>
            <div className="mt-3 text-green-700">View →</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
