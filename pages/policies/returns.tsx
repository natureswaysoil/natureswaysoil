
import Head from "next/head";

export default function Returns(){
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      <Head>
        <title>Refund Policy – Nature’s Way Soil</title>
        <meta name="description" content="No‑return refund policy. If you’re not happy, we’ll make it right—no need to ship product back." />
        <link rel="canonical" href="https://natureswaysoil.com/policies/returns" />
      </Head>
      <h1 className="text-3xl font-bold">Refund Policy (No Returns Required)</h1>
      <p className="mt-4 text-gray-700">
        We stand behind everything we make. If you’re not happy with your purchase for any reason,
        simply contact us within <strong>30 days of delivery</strong> and we’ll issue a refund or replacement—
        <strong>no need to return the product</strong>.
      </p>

      <h2 className="mt-8 text-xl font-semibold">How it works</h2>
      <ul className="mt-3 list-disc pl-6 text-gray-700 space-y-2">
        <li>Email us at <a className="text-green-700" href="mailto:natureswaysoil@gmail.com">natureswaysoil@gmail.com</a> with your order number and a brief note.</li>
        <li>We’ll process a refund to your original payment method or send a replacement.</li>
        <li>For damaged/leaking shipments, please include a quick photo so we can improve packaging.</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold">Fair use</h2>
      <p className="mt-3 text-gray-700">
        This policy is designed to be hassle‑free and fair. We reserve the right to decline refunds in cases of abuse
        (e.g., repeated claims). This policy applies to orders placed on <strong>natureswaysoil.com</strong>.
        Purchases through marketplaces (e.g., Amazon) follow that platform’s return/refund terms.
      </p>
    </main>
  );
}
