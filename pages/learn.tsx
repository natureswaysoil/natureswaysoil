import Head from "next/head";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Educational videos and blog content for Nature's Way Soil
 * 
 * To add real videos:
 * 1. Upload videos to YouTube or Vimeo
 * 2. Replace the placeholder IDs below with actual video IDs
 * 3. For YouTube: use the ID from youtube.com/watch?v=VIDEO_ID
 * 4. For Vimeo: use the ID from vimeo.com/VIDEO_ID
 */

const videos = [
  {
    key: "dog-urine-neutralizer",
    title: "How to Fix Dog Urine Spots on Your Lawn",
    description:
      "Learn why dog urine burns grass and how our enzyme-based neutralizer combined with beneficial soil microbes helps yellow spots recover naturally. Safe for pets and children.",
    source: "youtube" as const,
    id: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    productSlug: "nature-s-way-soil-dog-urine-neutralizer-lawn-revitalizer-32oz",
    uploadedAt: "2024-05-15",
    category: "Lawn Care",
  },
  {
    key: "liquid-kelp-benefits",
    title: "Liquid Kelp: Nature's Growth Booster",
    description:
      "Discover how cold-processed seaweed extract helps plants recover from drought and heat stress while providing essential micronutrients and natural growth hormones.",
    source: "youtube" as const,
    id: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    productSlug: "nature-s-way-soil-liquid-kelp-fertilizer-32oz",
    uploadedAt: "2024-06-01",
    category: "Fertilizers",
  },
  {
    key: "organic-tomato-fertilizer",
    title: "Growing Better Tomatoes Organically",
    description:
      "Learn how Vitamin B1 and aloe vera in our organic tomato fertilizer promote strong root development and help transplants establish quickly without chemical stress.",
    source: "youtube" as const,
    id: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    productSlug: "nature-s-way-soil-organic-tomato-liquid-fertilizer-1gal",
    uploadedAt: "2024-06-15",
    category: "Garden",
  },
  {
    key: "pasture-soil-health",
    title: "Improving Pasture & Hay Field Soil Health",
    description:
      "See how biochar and beneficial microbes improve forage vigor, nutrient uptake, and soil structure on pastures and hay fields. Pet-safe and environmentally friendly.",
    source: "youtube" as const,
    id: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    productSlug: "nature-s-way-soil-hay-pasture-lawn-fertilizer-2-5gal",
    uploadedAt: "2024-07-01",
    category: "Pasture",
  },
  {
    key: "biochar-benefits",
    title: "What is Biochar and Why It Matters",
    description:
      "Understanding biochar's role in soil health: improved aeration, water retention, nutrient storage, and creating habitat for beneficial microorganisms.",
    source: "youtube" as const,
    id: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    productSlug: "nature-s-way-soil-enhanced-living-compost",
    uploadedAt: "2024-07-20",
    category: "Soil Science",
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
  return "";
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
    return { 
      "@context": "https://schema.org", 
      "@type": "ItemList", 
      itemListElement: items 
    } as const;
  }, []);

  // When selecting in the playlist, update the URL (no full reload)
  function selectVideo(key: string) {
    setActiveKey(key);
    router.push({ pathname: "/learn", query: { video: key } }, undefined, { shallow: true });
  }

  // Group videos by category
  const categories = useMemo(() => {
    const cats = new Set(videos.map(v => v.category));
    return Array.from(cats);
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>Learn – Educational Videos & Resources | Nature's Way Soil</title>
        <meta 
          name="description" 
          content="Educational videos on organic lawn care, pet-safe fertilizers, soil health, and sustainable gardening from Nature's Way Soil family farm." 
        />
        <link rel="canonical" href="https://natureswaysoil.com/learn" />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f3d2e] to-[#1a5c42] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Learn with Nature's Way</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Short, practical videos from our family farm. We focus on education first, 
            with soft-sell product recommendations only when relevant.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <p className="text-gray-700">
              Watch our educational videos to learn about organic soil health, natural fertilizers, 
              and sustainable gardening practices. All our products are made on our family farm 
              and are safe for children, pets, and pollinators.
            </p>
          </div>
          <div className="flex gap-3">
            <Link 
              href="/shop" 
              className="px-5 py-3 rounded-lg border-2 border-gray-300 hover:border-[#0f3d2e] hover:text-[#0f3d2e] transition font-semibold"
            >
              Browse Products
            </Link>
            <Link 
              href="/contact" 
              className="px-5 py-3 rounded-lg bg-[#0f3d2e] text-white hover:bg-[#1a5c42] transition font-semibold"
            >
              Ask a Question
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="aspect-video w-full overflow-hidden rounded-2xl border-2 border-gray-200 bg-black shadow-lg">
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
                <div className="w-full h-full grid place-items-center text-gray-400 text-sm">
                  Select a video to begin
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="mt-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{active?.title}</h2>
                  {active?.category && (
                    <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                      {active.category}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-6">{active?.description}</p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {active?.productSlug && (
                  <Link
                    href={`/products/${active.productSlug}?utm_source=video&utm_medium=learn&utm_campaign=${active.key}`}
                    className="px-6 py-3 rounded-lg bg-[#0f3d2e] text-white font-semibold hover:bg-[#1a5c42] transition"
                  >
                    Shop Related Product
                  </Link>
                )}
                <Link 
                  href="/shop" 
                  className="px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-[#0f3d2e] transition font-semibold"
                >
                  All Products
                </Link>
                <button
                  onClick={() => {
                    const url = typeof window !== "undefined" 
                      ? `${window.location.origin}/learn?video=${active.key}` 
                      : "";
                    if (url && navigator.clipboard) {
                      navigator.clipboard.writeText(url);
                      alert("Link copied to clipboard!");
                    }
                  }}
                  className="px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition font-semibold"
                >
                  📋 Copy Link
                </button>
              </div>
            </div>
          </div>

          {/* Video Playlist */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4">
              <h3 className="text-xl font-bold mb-4">Video Library</h3>
              <div className="border-2 border-gray-200 rounded-2xl divide-y max-h-[600px] overflow-y-auto">
                {videos.map((v) => (
                  <button
                    key={v.key}
                    onClick={() => selectVideo(v.key)}
                    className={`w-full p-4 text-left flex gap-3 items-start hover:bg-gray-50 transition ${
                      activeKey === v.key ? "bg-green-50 border-l-4 border-[#0f3d2e]" : ""
                    }`}
                  >
                    <div className="w-28 h-20 rounded-lg overflow-hidden bg-gray-100 border shrink-0">
                      {thumbUrl(v) ? (
                        <img 
                          src={thumbUrl(v)} 
                          alt={v.title}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full grid place-items-center text-xs text-gray-500">
                          <span className="text-2xl">▶️</span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-sm mb-1 line-clamp-2">{v.title}</div>
                      <div className="text-xs text-gray-600 line-clamp-2">{v.description}</div>
                      {v.category && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                          {v.category}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 border-t pt-12">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                q: "How often should I apply these products?", 
                a: "For problem areas like dog urine spots, apply weekly until grass recovers. For maintenance, follow label directions—typically monthly during growing season." 
              },
              { 
                q: "Are these products safe for pets and children?", 
                a: "Yes! All our products are made with natural, organic ingredients and are safe when used as directed. Let treated areas dry before heavy pet or foot traffic." 
              },
              { 
                q: "What if I'm not satisfied with the results?", 
                a: "We stand behind our products. If you're not happy within 30 days, contact us for a full refund or replacement—no return shipping required." 
              },
              { 
                q: "Do you ship nationwide?", 
                a: "Yes, we ship to all 50 states. Most orders ship within 1-2 business days and arrive within 3-7 days depending on your location." 
              },
              { 
                q: "Can I use these products together?", 
                a: "Absolutely! Our products are designed to work together. For example, use liquid kelp with any fertilizer for enhanced results." 
              },
              { 
                q: "What makes your products different?", 
                a: "We make everything on our family farm using biochar, worm castings, and beneficial microbes—no synthetic chemicals. It's soil health, not just plant feeding." 
              },
            ].map((f, i) => (
              <div key={i} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-[#0f3d2e] transition">
                <div className="font-bold text-lg mb-3 text-gray-900">{f.q}</div>
                <div className="text-gray-700">{f.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-[#0f3d2e] to-[#1a5c42] rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Soil?</h2>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Browse our full catalog of organic soil amendments, fertilizers, and lawn care products.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/shop"
              className="px-8 py-4 rounded-lg bg-white text-[#0f3d2e] font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Shop All Products
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
