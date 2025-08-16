// /pages/index.tsx
import Image from "next/image";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { featured } from "../data/products";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {/* HERO */}
      <section className="rounded-3xl bg-gradient-to-br from-green-50 to-emerald-100 p-8 md:p-12 shadow-sm">
        <div className="grid gap-8 md:grid-cols-[1fr,340px] items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Premium, Pet-Safe Lawn & Garden Inputs
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              From our family farm to your garden — clean, effective inputs made
              with worm castings, activated biochar, and living microbials.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/products"
                className="rounded-2xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700"
              >
                Shop products
              </Link>
              <a
                href="#featured"
                className="rounded-2xl border border-emerald-600 px-5 py-3 font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                See featured
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              <span className="font-semibold">No-return refund:</span> If you’re
              not happy, we’ll refund you. No return label, no hassle.
            </p>
          </div>

          <div className="relative h-[200px] md:h-[260px]">
            <Image
              src="/brand/logo-with-tagline.png"
              alt="Nature's Way Soil"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["OMRI-minded formulations", "Clean inputs and clear labeling"],
          ["Made on a family farm", "Small batches, quality-checked"],
          ["Fast support", "Real humans, real help"],
        ].map(([title, copy]) => (
          <div key={title} className="rounded-2xl border p-5">
            <div className="text-base font-semibold">{title}</div>
            <div className="text-sm text-gray-600 mt-1">{copy}</div>
          </div>
        ))}
      </section>

      {/* FEATURED */}
      <section id="featured" className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Featured products</h2>
          <Link href="/products" className="text-emerald-700 hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
