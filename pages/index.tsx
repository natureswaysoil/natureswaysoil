import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nature’s Way Soil — Pet-Safe Lawn & Garden</title>
        <meta name="description" content="Premium organic soil & amendments. From our farm to your garden." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-white text-gray-900">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Premium Organic Soil & Amendments
          </h1>
          <p className="mt-3 text-gray-700">
            Sustainably sourced, biochar-enriched, and powered by worm castings & mycorrhizae.
          </p>
          <div className="mt-6">
            <Link
              href="/products"
              className="inline-block px-6 py-3 rounded-2xl bg-green-700 text-white"
            >
              Shop products
            </Link>
          </div>
        </section>

        {/* Simple policy banner */}
        <section className="border-t">
          <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-700">
            <strong>No-return refund:</strong> If you’re not happy, just ask for a refund—no need to return the product.
          </div>
        </section>
      </main>
    </>
  );
}
