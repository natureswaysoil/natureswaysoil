export default function PolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Refund Policy</h1>
      <p className="mt-4">
        We don’t require returns. If you’re not happy with a product, just contact us
        and we’ll refund you — no return label, no hassle.
      </p>
      <h2 className="mt-8 text-xl font-semibold">How to request a refund</h2>
      <ol className="list-decimal pl-6 mt-3 space-y-1">
        <li>Reply to your order email (or use the contact form on our site).</li>
        <li>Tell us your order number and what went wrong.</li>
        <li>We’ll process a refund right away.</li>
      </ol>
      <p className="mt-6 text-gray-600">
        Questions? We’re real humans — happy to help.
      </p>
    </main>
  );
}

