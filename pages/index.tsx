import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

export default function Home() {
  const featured = products.slice(0, 4); // first few items
  return (
    <>
      <Head>
        <title>Nature’s Way Soil — From our farm to your garden</title>
        <meta name="description" content="Premium, pet-safe lawn & garden inputs powered by worm castings and biochar." />
      </Head>

      <Header />

      <main className="bg-white text-gray-900">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl sm:text-5xl font-bold">
            Premium, Pet-Safe Lawn & Garden Inputs
          </h1>
          <p className="mt-4 text-gray-700 max-w-3xl">
            From our family farm to your garden — clean, effective inputs made with worm castings,
            activated biochar, and living microbes.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="/products" className="px-6 py-3 rounded-2xl bg-green-700 text-white">
              Shop products
            </Link>
            <Link href="/policy" className="px-6 py-3 rounded-2xl border border-gray-300">
              See refund
            </Link>
          </div>

          {/* One simple policy sentence (no more little boxes) */}
          <p className="mt-6 text-sm text-gray-700">
            No-return refund: If you’re not happy, we’ll refund you. No return label, no hassle.
          </p>
        </section>

        {/* Featured grid */}
        <section className="mx-auto max-w-6xl px-4 pb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Featured products</h2>
            <Link href="/products" className="text-sm text-green-700">View all</Link>
          </div>

          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(p => (
              <li key={p.slug} className="rounded-2xl border hover:shadow-sm">
                {/* images from /public/products/... */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-48 object-contain bg-white rounded-t-2xl"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-gray-600 text-sm">{p.subtitle}</p>
                  <p className="mt-2 font-semibold">${p.price.toFixed(2)}</p>
                  <Link
                    href={`/products/${p.slug}`}
                    className="mt-3 inline-block text-sm text-green-700"
                  >
                    View
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}
