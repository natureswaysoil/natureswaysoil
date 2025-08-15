
import Head from "next/head";

export default function Terms(){
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      <Head><title>Terms of Service – Nature’s Way Soil</title></Head>
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="mt-4 text-gray-700">
        By using this website and placing an order, you agree to our policies, including shipping and refunds.
      </p>
      <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">
        <li>Products are for intended horticultural use; always follow label instructions.</li>
        <li>We may update site content and pricing at any time.</li>
        <li>All trademarks are property of their respective owners.</li>
      </ul>
    </main>
  );
}
