import Head from "next/head";

export default function Policy() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      <Head><title>Policies – Nature's Way Soil</title></Head>
      
      {/* Privacy Policy Section */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="mt-4 text-gray-700">
          We collect the minimum necessary information to process orders and support customers.
          We never sell personal data.
        </p>
        <h2 className="mt-8 text-xl font-semibold">What we collect</h2>
        <ul className="mt-3 list-disc pl-6 text-gray-700 space-y-2">
          <li>Order info (name, email, shipping address)</li>
          <li>Payment tokens via Stripe (we never store full card numbers)</li>
          <li>Support messages and opt‑in newsletter info</li>
        </ul>
        <h2 className="mt-8 text-xl font-semibold">How we use it</h2>
        <ul className="mt-3 list-disc pl-6 text-gray-700 space-y-2">
          <li>Fulfill orders and provide support</li>
          <li>Send transactional emails (order updates, receipts)</li>
          <li>Send marketing emails if you've opted in (unsubscribe anytime)</li>
        </ul>
        <p className="mt-6 text-gray-700 text-sm">
          For payment processing we use Stripe; their handling of your data is governed by their own policy.
        </p>
      </section>

      {/* Terms of Service Section */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <p className="mt-4 text-gray-700">
          By using this website and placing an order, you agree to our policies, including shipping and refunds.
        </p>
        <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">
          <li>Products are for intended horticultural use; always follow label instructions.</li>
          <li>We may update site content and pricing at any time.</li>
          <li>All trademarks are property of their respective owners.</li>
        </ul>
      </section>

      {/* Refund Policy Section */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-green-800 mb-3">No Risk Guarantee</h2>
          <p className="text-green-700">
            If you are not happy with your product, no need to return it. Just contact us and ask for a refund—we will process it, no questions asked.
          </p>
        </div>
        <p className="mt-4 text-gray-700">
          We don't require returns. If you're not happy with a product, just contact us
          and we'll refund you — no return label, no hassle.
        </p>
        <h2 className="mt-8 text-xl font-semibold">How to request a refund</h2>
        <ol className="list-decimal pl-6 mt-3 space-y-1 text-gray-700">
          <li>Reply to your order email (or use the contact form on our site).</li>
          <li>Tell us your order number and what went wrong.</li>
          <li>We'll process a refund right away.</li>
        </ol>
        <p className="mt-6 text-gray-600">
          Questions? We're real humans — happy to help.
        </p>
      </section>
    </main>
  );
}