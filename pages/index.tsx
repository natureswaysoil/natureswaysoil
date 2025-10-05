
// /pages/index.tsx
import React, { useMemo, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

// IMPORTANT: keep these paths exactly as shown
import { PRODUCTS, type Product } from "@/data/products";
import Cart, { type CartItem } from "@/components/Cart";
import ChatWidget from "@/components/ChatWidget";
import { addToCart as addToCartStore, readCart, onCartChange } from "@/lib/cart-store";

function dollars(cents: number) {
  return (cents / 100).toFixed(2);
}

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  // Sync with shared cart store
  useEffect(() => {
    const cartItems = readCart();
    // Map cart-store items to Cart component format
    const mappedItems = cartItems.map(item => ({
      id: item.slug,
      name: item.title,
      price: item.price,
      qty: item.qty
    }));
    setItems(mappedItems);
    
    const unsub = onCartChange(() => {
      const cartItems = readCart();
      const mappedItems = cartItems.map(item => ({
        id: item.slug,
        name: item.title,
        price: item.price,
        qty: item.qty
      }));
      setItems(mappedItems);
    });
    return unsub;
  }, []);

  // --- Featured selection rules:
  // 1) show products with featured === true & active === true
  // 2) if none are flagged, fallback to the first 3 active products
  const featured: Product[] = useMemo(() => {
    const active = PRODUCTS.filter(p => p.active);
    const flagged = active.filter(p => p.featured);
    return (flagged.length ? flagged : active).slice(0, 3);
  }, []);

  function addToCart(p: Product) {
    // Use shared cart store instead of local state
    addToCartStore({
      slug: p.slug,
      title: p.title,
      price: p.price,
      qty: 1,
      sku: p.sku
    });
    setCartOpen(true);
  }

  function updateQty(slug: string, qty: number) {
    // This will be handled by the Cart component using cart-store functions
    const items = readCart();
    const item = items.find(i => i.slug === slug);
    if (item) {
      const { setQuantity } = require("@/lib/cart-store");
      setQuantity(slug, qty);
    }
  }

  function remove(slug: string) {
    const { removeFromCart } = require("@/lib/cart-store");
    removeFromCart(slug);
  }

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  return (
    <>
      <Head>
        <title>Nature's Way Soil — From our farm to your garden</title>
        <meta
          name="description"
          content="Premium organic soil blends enriched with biochar, worm castings & mycorrhizae — made in the USA."
        />
      </Head>

      {/* HERO SECTION - Enhanced with better styling */}
      <header className="w-full bg-gradient-to-br from-[#0f3d2e] to-[#1a5c42] text-white relative overflow-hidden">
        {/* Hero Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            style={{ pointerEvents: 'none' }}
          >
            <source src="https://video.pictory.ai/20251005232653546b1d31054cfaf4b53a5bcd69b75790ef2/20251005234145374VOVQHL5UUwmevS4" type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-16 grid gap-8 md:grid-cols-2 items-center relative z-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nature's Way Soil
            </h1>
            <p className="text-xl mb-2 text-white/90">
              Bring Life Back to Your Soil
            </p>
            <p className="text-lg text-white/80 mb-6">
              Premium organic soil blends, fertilizers, and amendments made with biochar, 
              worm castings, and living microbes. Safe for children, pets, and pollinators.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="#featured"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-[#0f3d2e] font-semibold shadow-lg hover:shadow-xl transition"
              >
                View Featured Products
              </a>
              <Link
                href="/shop"
                className="inline-flex items-center rounded-lg border-2 border-white/60 px-6 py-3 font-semibold hover:bg-white/10 transition"
              >
                Shop All Products
              </Link>
            </div>
            <ul className="grid gap-2 text-white/90">
              <li className="flex items-start gap-2">
                <span className="text-green-300">✓</span>
                <span>Biochar for aeration & nutrient retention</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300">✓</span>
                <span>Worm castings for living biology</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300">✓</span>
                <span>Mycorrhizae to supercharge roots</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300">✓</span>
                <span>Made in the USA on our family farm</span>
              </li>
            </ul>
          </div>
          <div className="justify-self-center">
            <img
              src="/logo.png"
              alt="Nature's Way Soil"
              className="w-full max-w-sm rounded-lg shadow-2xl"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
              }}
            />
          </div>
        </div>
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </header>

      {/* FEATURED PRODUCTS */}
      <main className="mx-auto max-w-6xl px-4">
        <section id="featured" className="py-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600 mt-2">Our most popular organic soil solutions</p>
            </div>
            <Link href="/shop" className="text-[#0f3d2e] hover:underline font-semibold">
              View all →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <article
                key={p.slug}
                className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-gray-50">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-contain p-4"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/placeholder-product.svg";
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
                  {!!p.description && (
                    <p 
                      className="text-sm text-gray-600 mb-4"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {p.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#0f3d2e]">
                      ${p.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(p)}
                      className="rounded-lg bg-[#0f3d2e] px-4 py-2 text-white font-semibold hover:bg-[#1a5c42] transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold hover:border-[#0f3d2e] hover:text-[#0f3d2e] transition"
            >
              Browse Full Catalog →
            </Link>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-12 border-t">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Nature's Way Soil?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">100% Organic</h3>
              <p className="text-gray-600">
                No synthetic chemicals. Just pure, natural ingredients that work with nature.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🐾</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Pet & Kid Safe</h3>
              <p className="text-gray-600">
                Safe for your family, pets, and pollinators when used as directed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚜</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Family Farm</h3>
              <p className="text-gray-600">
                Made in the USA on our family farm with care and expertise.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-gray-50 mt-12">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-3">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/shop" className="hover:text-[#0f3d2e]">All Products</Link></li>
                <li><Link href="/shop" className="hover:text-[#0f3d2e]">Featured</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Learn</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/learn" className="hover:text-[#0f3d2e]">Educational Videos</Link></li>
                <li><Link href="/about" className="hover:text-[#0f3d2e]">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/contact" className="hover:text-[#0f3d2e]">Contact Us</Link></li>
                <li><Link href="/policies/shipping" className="hover:text-[#0f3d2e]">Shipping</Link></li>
                <li><Link href="/policies/returns" className="hover:text-[#0f3d2e]">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/policies/privacy" className="hover:text-[#0f3d2e]">Privacy Policy</Link></li>
                <li><Link href="/policies/terms" className="hover:text-[#0f3d2e]">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} Nature's Way Soil. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* CART + CHAT */}
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onUpdateQty={updateQty}
        onRemove={remove}
        onCheckout={() => window.location.href = '/checkout'}
      />
      <ChatWidget />
    </>
  );
}
