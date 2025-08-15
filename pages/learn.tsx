import Head from "next/head";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Add/edit videos here.
 * - source: "youtube" | "vimeo"
 * - id: video ID only (not the full URL)
 * - productSlug: optional; if set, the CTA goes to /products/<slug>
 * - thumb: (optional) custom thumbnail URL — useful for Vimeo
 */
const videos = [
  {
    key: "dog-urine",
    title: "Dog Urine Spots: Fix & Prevent (pet-safe)",
    description:
      "Why dog urine burns grass and how our neutralizer + soil microbes help spots recover.",
    source: "youtube" as const,
    id: "YOUR_YOUTUBE_ID_1",
    productSlug: "dog-urine-neutralizer",
    uploadedAt: "2024-05-15",
  },
  {
    key: "kelp",
    title: "Liquid Kelp: Stress Recovery & Root Growth",
    description:
      "Kelp extracts for drought/heat stress with micronutrients and natural hormones.",
    source: "youtube" as const,
    id: "YOUR_YOUTUBE_ID_2",
    productSlug: "liquid-kelp",
    uploadedAt: "2024-06-01",
  },
  {
    key: "pasture",
    title: "Hay & Pasture: Soil Booster Basics",
    description:
      "How biochar + microbes improve forage vigor and nutrient use on pasture.",
    source: "vimeo" as const,
    id: "YOUR_VIMEO_ID_3",
    productSlug: "hay-pasture-soil-booster",
    uploadedAt: "2024-06-20",
    // Vimeo thumb example (paste your own image URL)
    thumb: "https://images.unsplash.com/photo-1559087867-ce4c91325525?q=80&w=1200&auto=format",
  },
];

type Vid = typeof videos[number];

function embedUrl(v: Vid) {
  if (v.source === "youtube") return `https://www.youtube.com/embed/${v.id}?rel=0`;
  if (v.source === "vimeo") return `https://player.vimeo.com/video/${v.id}`;
  return "";
}

function thumbUrl(v: Vid) {
  if ("thumb" in v && v.thumb) return v.thumb as string;
  if (v.source === "youtube") return `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;
  return ""; // Vimeo: provide v.thumb above for a nice preview
}

export default function LearnPage() {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<string>(videos[0]?.key || "");
  const active = useMemo(() => videos.find((x) => x.key === activeKey) || videos[0], [activeKey]);

  // Deep link: auto-select /learn?video=<key>
  useEffect(() => {
    const qp = router.query.video;
    if (typeof qp === "string") {
      const found = videos.find((v) => v.key === qp);
      if (found) setActiveKey(found.key);
    }
  }, [router.query.video]);

  // JSON-LD for SEO
  const jsonLd = useMemo(() => {
    const items = videos.map((v) => ({
      "@type": "VideoObject",
      name: v.title,
      description: v.description,
      uploadDate: v.uploadedAt || undefined,
      thumbnailUrl: thumbUrl(v) || undefined,
      embedUrl: embedUrl(v),
    }));
    return { "@context": "https://schema.org", "@type": "ItemList", itemListElement: items } as const;
  }, []);

  // When selecting in the playlist, update the URL (no full reload)
  function selectVideo(key: string) {
    setActiveKey(key);
    router.push({ pathname: "/learn", query: { video: key } }, undefined, { shallow: true });
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>Learn – Nature’s Way Soil</title>
        <meta name="description" content="Educational videos on pet-safe lawn repair, liquid kelp, soil boosters, and more." />
        <link rel="canonical" href="https://natureswaysoil.com/learn" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">Learn</h1>
            <p className="mt-2 text-gray-700">Short, practical videos from our family farm. Soft sell only—learn first.</p>
          </div>
          <Link href="/products" className="hidden md:inline-block px-5 py-3 rounded-2xl border">Browse products</Link>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          {/* Player */}
          <div className="lg:col-span-2">
            <div className="aspect-video w-full overflow-hidden rounded-2xl border bg-black">
              {active?.id ? (
                <iframe
                  src={embedUrl(active)}
                  title={active?.title || "Video"}
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-gray-400 text-sm">Add a video ID to begin</div>
              )}
            </div>

            {/* Title + CTA */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{active?.title}</h2>
              <p className="mt-1 text-gray-700 text-sm">{active?.description}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={active?.productSlug ? `/products/${active.productSlug}?utm_source=video&utm_medium=learn&utm_campaign=${active.key}` : "/products"}
                  className="px-5 py-2 rounded-2xl bg-green-700 text-white"
                >
                  Shop related product
                </Link>
                <Link href="/products" className="px-5 py-2 rounded-2xl border">All products</Link>
                <Link href="/contact" className="px-5 py-2 rounded-2xl border">Ask a question</Link>
                <button
                  onClick={() => {
                    const url = typeof window !== "undefined" ? `${window.location.origin}/learn?video=${active.key}` : "";
                    if (url) navigator.clipboard?.writeText(url);
                  }}
                  className="px-5 py-2 rounded-2xl border"
                >
                  Copy link
                </button>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <aside className="lg:col-span-1">
            <div className="border rounded-2xl divide-y">
              {videos.map((v) => (
                <button
                  key={v.key}
                  onClick={() => selectVideo(v.key)}
                  className={`w-full p-3 text-left flex gap-3 items-start hover:bg-gray-50 ${activeKey === v.key ? "bg-green-50" : ""}`}
                >
                  <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-100 border shrink-0">
                    {thumbUrl(v) ? (
                      <img src={thumbUrl(v)} alt="thumb" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-xs text-gray-500">No thumb</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{v.title}</div>
                    <div className="text-xs text-gray-600 line-clamp-2">{v.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </div>

        {/* FAQ */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { q: "How often should I apply?", a: "For problem spots, weekly until green returns; for maintenance, monthly or as label directs." },
            { q: "Is it safe for pets?", a: "Yes—when used as directed. Let areas dry before heavy pet traffic." },
            { q: "What if I’m not happy?", a: "Email us within 30 days—we’ll refund or replace with no return required." },
          ].map((f, i) => (
            <div key={i} className="border rounded-2xl p-6">
              <div className="font-semibold">{f.q}</div>
              <div className="mt-2 text-sm text-gray-700">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
