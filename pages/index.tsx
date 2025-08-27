import Link from 'next/link';
import { listProducts } from '@/lib/cart';
import { addToCart, removeFromCart } from '@/lib/cart-store';
import { useState } from 'react';
function Navigation() {
  return (
    <nav className="bg-green-900 text-white px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Nature's Way Soil" width={40} height={40} className="rounded-full" />
        <span className="font-bold text-lg">Nature's Way Soil</span>
      </div>
      <ul className="flex gap-6 text-sm">
        <li><Link href="/shop" className="hover:underline">Shop</Link></li>
        <li><Link href="/about" className="hover:underline">About</Link></li>
        <li><Link href="/contact" className="hover:underline">Contact</Link></li>
        <li><Link href="/cart" className="hover:underline">Cart</Link></li>
      </ul>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="bg-green-50 py-10 px-4 text-center flex flex-col items-center">
      <img src="/logo.png" alt="Nature's Way Soil logo" width={120} height={120} className="mb-4" />
      <h1 className="text-3xl font-bold mb-2">Bring Life Back to Your Soil</h1>
      <p className="max-w-xl mb-4 text-gray-700">
        Premium organic soil blends, fertilizers, and amendments made with biochar, worm castings, and living microbes. Safe for children, pets, and pollinators.
      </p>
      <Link href="/shop" className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-800">Shop Now</Link>
    </section>
  );
}

function PolicyLinks() {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-8 text-xs text-gray-600">
      <Link href="/policies/privacy" className="hover:text-green-700">Privacy Policy</Link>
      <Link href="/policies/terms" className="hover:text-green-700">Terms of Service</Link>
      <Link href="/policies/shipping" className="hover:text-green-700">Shipping Policy</Link>
      <Link href="/policies/returns" className="hover:text-green-700">Refund Policy</Link>
    </div>
  );
}

export default function Home() {
  const products = listProducts().filter((p) => p.featured);
  const [cartItems, setCartItems] = useState<string[]>([]);

  function handleAddToCart(product: { slug: string }) {
    const prod = listProducts().find((p) => p.slug === product.slug);
    if (!prod) return;
    addToCart({ slug: prod.slug, title: prod.title, price: prod.price, qty: 1 });
    setCartItems([...cartItems, prod.slug]);
  }

  function handleRemoveFromCart(product: { slug: string }) {
    removeFromCart(product.slug);
    setCartItems(cartItems.filter((slug) => slug !== product.slug));
  }

  async function handleBuy(product: { slug: string }) {
    // Redirect to Stripe checkout API
    const res = await fetch('/api/stripe/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart: [{ slug: product.slug, qty: 1 }] })
    });
    const { url } = await res.json();
    window.location.href = url;
  }

  // Cart summary logic
  const cartSummary = cartItems.length > 0 ? (
    <aside className="mb-8 p-4 border rounded-xl bg-gray-50">
      <h3 className="font-bold mb-2">Cart Summary</h3>
      <ul className="mb-2">
        {cartItems.map((slug) => {
          const prod = products.find((p) => p.slug === slug);
          if (!prod) return null;
          return (
            <li key={slug} className="flex justify-between items-center mb-2">
              <span>{prod.title}</span>
              <button
                onClick={() => handleRemoveFromCart(prod)}
                className="ml-2 px-2 py-1 rounded bg-red-600 text-white text-xs"
              >Remove</button>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => window.location.href = '/checkout'}
        className="px-4 py-2 rounded bg-green-700 text-white font-semibold"
      >Go to Checkout</button>
    </aside>
  ) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <HeroSection />
      <main className="flex-1 p-8">
        {cartSummary}
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="border rounded-2xl p-4 flex flex-col bg-white shadow hover:shadow-lg transition">
              <div className="relative w-full h-60 rounded-xl bg-gray-50 mb-2">
                <img
                  src={p.image ? p.image : '/placeholder-product.svg'}
                  alt={p.title}
                  style={{objectFit: 'contain', borderRadius: '0.75rem', width: '100%', height: '240px', background: '#f8fafc'}}
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{p.subtitle || p.description}</p>
              <div className="font-bold text-green-700 mb-2">${p.price.toFixed(2)}</div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleAddToCart(p)}
                  className="px-3 py-2 rounded-xl bg-green-700 text-white hover:bg-green-800"
                  aria-label={`Add ${p.title} to cart`}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => { handleAddToCart(p); window.location.href = '/checkout'; }}
                  className="px-3 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
                  aria-label={`Buy ${p.title}`}
                >
                  Buy Now
                </button>
              </div>
              <Link
                href={`/products/${p.slug}`}
                className="mt-2 px-3 py-2 rounded-xl border bg-green-50 hover:bg-green-100 text-green-900 font-semibold text-center"
                aria-label={`View details for ${p.title}`}
              >
                Details
              </Link>
            </div>
          ))}
        </div>
        <PolicyLinks />
      </main>
      <footer className="border-t bg-white mt-8">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Nature’s Way Soil</p>
          <PolicyLinks />
        </div>
      </footer>
    </div>
  );
}
