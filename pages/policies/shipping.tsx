
import Head from "next/head";

export default function Shipping(){
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      <Head><title>Shipping Policy – Nature’s Way Soil</title></Head>
      <h1 className="text-3xl font-bold">Shipping Policy</h1>
      <p className="mt-4 text-gray-700">We ship from our farm within 1–2 business days.</p>
      <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">
        <li>Typical transit time: <strong>3–5 business days</strong> (continental US)</li>
        <li>Flat‑rate FBM shipping by size: <strong>32 oz $7</strong>, <strong>1 gal $10</strong>, <strong>2.5 gal $30</strong></li>
        <li>Tracking is provided by email when your order ships.</li>
        <li>If a package arrives damaged or leaking, email a quick photo and we’ll replace it.</li>
      </ul>
    </main>
  );
}
