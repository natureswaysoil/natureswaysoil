import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import HeaderCart from "@/components/HeaderCart";
import { products } from "@/lib/products";

export default function Home() {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "newsletter", ...data }),
      });
      if (r.ok) {
        setStatus("Thanks! You’re on the list.");
        (form as any).reset();
      } else {
        setStatus("Hmm, something went wrong. Please try again.");
      }
    } catch {
      setStatus("Hmm, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const featured = products.slice(0, 6); // show first 6 products

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>Nature’s Way Soil – Pet-Safe Lawn & Garden</title>
        <meta
          name="description"
          content="Family-crafted, microbe-rich lawn and garden products. Pet-safe, biochar boosted, and FBM-shipped fast."
        />
        <link rel="canonical" href="https://natureswaysoil.com/" />
        {process.env.NEXT_PUBLIC_ENV === "preview" && (
          <meta name="robots" content="noindex,nofollow" />
        )}
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-36 h-10">
              <Image
                src="/images/logo-with-tagline.png"
                alt="Nature’s Way Soil"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/products" className="hover:text-green-700">Products</Link>
            <Link href="/learn" className="hover:text-green-700">Learn</Link>
            <Link href="/about" className="hover:text-green-700">About</Link>
            <Link href="/contact" className="hover:text-green-700">Contact</Link>
            <HeaderCart />
          </nav>
          <div className="md:hidden">
            <HeaderCart />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Pet-safe products that bring tired lawns & gardens back to life.
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Microbe-rich blends with BM-1, worm castings, and activated biochar. If you’re not happy,
            we’ll refund you — <span className="font-semibold">no return required</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="px-6 py-3 rounded-2xl bg-green-700 text-white"
            >
              Shop products
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 rounded-2xl border"
            >
              Learn more
            </Link>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            FBM flat-rate shipping: 32oz $7 · 1 gal $10 · 2.5 gal $30
          </p>
        </div>
        <div className="rounded-2xl border p-4">
          {/* Drop your educational video link here */}
          <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Your educational video goes here</span>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Tip: end the video with “If you’d like to learn more, visit natureswaysoil.com.”
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        {[
          { t: "Family-crafted", d: "Small batches for quality and consistency." },
          { t: "Microbe-rich", d: "BM-1 microbes + castings to unlock nutrients." },
          { t: "Biochar boosted", d: "Activated biochar improves nutrient retention." },
        ].map((f, i) => (
          <div key={i} className="border rounded-2xl p-6">
            <h3 className="font-semibold">{f.t}</h3>
            <p className="mt-2 text-gray-700 text-sm">{f.d}</p>
          </div>
        ))}
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured products</h2>
          <Link href="/products" className="text-green-700">View all →</Link>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <div key={p.slug} className="border rounded-2xl p-5 hover:shadow-md">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-1 text-gray-700">${p.price.toFixed(2)}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => router.push(`/checkout?slug=${p.slug}&qty=1`)}
                  className="px-4 py-2 rounded-xl bg-green-700 text-white"
                >
                  Buy
                </button>
                <Link href={`/products/${p.slug}`} className="px-4 py-2 rounded-xl border">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / lead capture */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border p-6 md:p-8">
          <h3 className="text-xl font-semibold">Get tips & seasonal lawn care reminders</h3>
          <p className="mt-1 text-gray-700 text-sm">We’ll send occasional updates. Unsubscribe anytime.</p>
          <form onSubmit={onSubmit} className="mt-4 grid md:grid-cols-4 gap-3">
            <input name="name" placeholder="Your name" className="border rounded-xl px-3 py-2 md:col-span-1" />
            <input name="email" type="email" required placeholder="you@email.com" className="border rounded-xl px-3 py-2 md:col-span-2" />
            <button disabled={loading} className="px-5 py-2 rounded-2xl bg-green-700 text-white md:col-span-1">
              {loading ? "Submitting…" : "Subscribe"}
            </button>
          </form>
          {status && <p className="mt-3 text-green-700 text-sm">{status}</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="relative w-36 h-9">
              <Image src="/images/logo-with-tagline.png" alt="Nature’s Way Soil" fill className="object-contain" />
            </div>
            <p className="mt-3 text-gray-600">
              Safe for families, pets, and pollinators when used as directed.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-2 space-y-1">
              <li><Link href="/about" className="hover:text-green-700">About</Link></li>
              <li><Link href="/contact" className="hover:text-green-700">Contact</Link></li>
              <li><Link href="/products" className="hover:text-green-700">Products</Link></li>
              <li><Link href="/learn" className="hover:text-green-700">Learn</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Policies</h4>
            <ul className="mt-2 space-y-1">
              <li><Link href="/policies/shipping" classNa


