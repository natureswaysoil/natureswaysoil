
import Head from "next/head";
import Image from "next/image";

export default function About(){
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>About – Nature’s Way Soil</title>
        <meta name="description" content="Our family farm story and the science behind Nature’s Way Soil." />
        <link rel="canonical" href="https://natureswaysoil.com/about" />
      </Head>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-start gap-6">
          <div className="relative w-20 h-20 shrink-0">
            <Image src="/images/logo-with-tagline.png" alt="Nature’s Way Soil" fill className="object-contain" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">From our farm to your garden</h1>
            <p className="mt-4 text-lg text-gray-700">
              We’re a small family farm crafting pet‑safe lawn and garden products that actually work.
              Our blends combine living microbes (BM‑1), worm castings, activated biochar, sea minerals,
              and natural inputs to revive soil health and plant vigor.
            </p>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            {title: "Family‑Owned", body: "We hand‑batch in small runs for quality and consistency."},
            {title: "Microbial‑Rich", body: "BM‑1 microbes + worm castings help unlock nutrients and root growth."},
            {title: "Biochar Boosted", body: "Activated biochar increases nutrient retention and microbial habitat."},
          ].map((f, i) => (
            <div key={i} className="border rounded-2xl p-6 bg-white">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold">Our promise</h2>
          <p className="mt-3 text-gray-700">
            Safe for families, pets, and pollinators when used as directed. If you’re not happy, just contact us—
            we’ll make it right.
          </p>
        </div>
      </section>
    </main>
  );
}
