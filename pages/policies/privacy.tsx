
import Head from "next/head";

export default function Privacy(){
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      <Head><title>Privacy Policy – Nature’s Way Soil</title></Head>
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
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
        <li>Send marketing emails if you’ve opted in (unsubscribe anytime)</li>
      </ul>
      <p className="mt-6 text-gray-700 text-sm">
        For payment processing we use Stripe; their handling of your data is governed by their own policy.
      </p>
    </main>
  );
}
