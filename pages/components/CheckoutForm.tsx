'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import {
  Elements,
  PaymentElement,
  AddressElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { getProduct } from '@/lib/products';
import { readCart, clearCart } from '@/lib/cart-store';
import { calculate, Cart } from '@/lib/cart';

// ---- Stripe init ----
const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string | undefined;
const stripePromise = pk ? loadStripe(pk) : null;

// ---- Types ----
type LineItem = { slug: string; title: string; unitAmountCents: number; qty: number };

type IntentResponse = {
  clientSecret?: string;
  error?: string;
};

// ---- Helpers ----
function toCents(v: number) {
  return Math.round((v ?? 0) * 100);
}

function buildCartFromQuery(router: ReturnType<typeof useRouter>): Cart | null {
  const { slug, qty } = router.query;
  if (!slug) return null;

  const s = Array.isArray(slug) ? slug[0] : slug;
  const q = Math.max(1, Number(Array.isArray(qty) ? qty[0] : qty) || 1);

  const p = getProduct(s);
  if (!p) return null;

  return {
    items: [{ slug: p.slug, title: p.title, price: p.price, qty: q }],
  };
}

function cartToItems(cart: Cart): LineItem[] {
  return (cart.items || []).map((it) => ({
    slug: it.slug,
    title: it.title ?? it.slug,
    unitAmountCents: toCents(it.price || 0),
    qty: it.qty || 0,
  }));
}

// =======================
// Inner Stripe checkout
// =======================
function InnerCheckout({
  clientSecret,
  onSuccess,
  emailHint,
}: {
  clientSecret: string;
  onSuccess: (piId?: string) => void;
  emailHint?: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pay() {
    if (!stripe || !elements) return;
    setBusy(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // If you collect email in AddressElement, Stripe will use it.
        receipt_email: emailHint,
      },
      redirect: 'if_required',
    });

    if (error) {
      setError(error.message || 'Payment failed.');
      setBusy(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded' || paymentIntent?.status === 'processing') {
      onSuccess(paymentIntent?.id);
    } else {
      setError('Payment not completed.');
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <AddressElement options={{ mode: 'shipping', allowedCountries: ['US'] }} />
      <PaymentElement />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="button"
        onClick={pay}
        disabled={busy || !stripe || !elements}
        className="w-full px-5 py-3 rounded-2xl bg-green-700 text-white disabled:opacity-60"
      >
        {busy ? 'Processing…' : 'Pay securely'}
      </button>
      <p className="text-xs text-gray-500">
        If you’re not happy with the product, just ask for a refund—no return required.
      </p>
    </div>
  );
}

// =======================
// Main component
// =======================
export default function CheckoutForm() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [emailHint, setEmailHint] = useState<string | undefined>(undefined);
  const [creating, setCreating] = useState(false);

  // Build a cart either from ?slug=… or from cart-store
  const cart: Cart | null = useMemo(() => {
    const fromSlug = buildCartFromQuery(router);
    if (fromSlug) return fromSlug;
    return readCart() || { items: [] };
  }, [router.query]);

  const totals = useMemo(() => (cart ? calculate(cart) : { subtotal: 0, shipping: 0, total: 0 }), [cart]);
  const items = useMemo(() => (cart ? cartToItems(cart) : []), [cart]);
  const amountCents = toCents(totals.total || totals.subtotal || 0);

  // Create a PaymentIntent when the cart changes
  useEffect(() => {
    if (!stripePromise || !pk) return; // no key configured
    if (!cart || !items.length || amountCents <= 0) return;

    async function createIntent() {
      setCreating(true);
      setStatus(null);
      try {
        const r = await fetch('/api/stripe/create-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amountCents,
            items, // server may ignore; included for records
            // Optional metadata examples:
            meta: { source: 'web_checkout' },
          }),
        });
        const j: IntentResponse = await r.json();
        if (!r.ok || !j.clientSecret) {
          throw new Error(j.error || 'Unable to start checkout.');
        }
        setClientSecret(j.clientSecret);
      } catch (err: any) {
        setStatus(err?.message || 'Could not start checkout.');
      } finally {
        setCreating(false);
      }
    }

    createIntent();
  }, [amountCents, JSON.stringify(items)]); // eslint-disable-line react-hooks/exhaustive-deps

  function onSuccess(piId?: string) {
    clearCart(); // clear only after success
    setStatus('Thanks! Your order has been received.');
    // Optional: router.push(`/thank-you?pi=${piId}`);
  }

  if (!pk || !stripePromise) {
    return (
      <div className="rounded-2xl border p-6">
        <h2 className="font-semibold text-lg">Checkout unavailable</h2>
        <p className="mt-2 text-sm text-gray-700">
          Missing <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>. Add it in Vercel → Project →
          Settings → Environment Variables (Production), then redeploy.
        </p>
      </div>
    );
  }

  if (!cart || !items.length || amountCents <= 0) {
    return (
      <div className="rounded-2xl border p-6">
        <h2 className="font-semibold text-lg">Your cart is empty</h2>
        <p className="mt-2 text-sm text-gray-700">Add a product and try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto rounded-2xl border p-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <div className="mt-4 mb-6 text-sm text-gray-700">
        <ul className="space-y-1">
          {items.map((it) => (
            <li key={it.slug} className="flex justify-between">
              <span>
                {it.title} × {it.qty}
              </span>
              <span>${((it.unitAmountCents * it.qty) / 100).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span>${(amountCents / 100).toFixed(2)}</span>
        </div>
      </div>

      {status && <div className="mb-4 text-green-700 text-sm">{status}</div>}

      {creating && <div className="text-sm text-gray-600">Starting secure checkout…</div>}

      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: { theme: 'stripe' },
          }}
        >
          <InnerCheckout clientSecret={clientSecret} onSuccess={onSuccess} emailHint={emailHint} />
        </Elements>
      )}
    </div>
  );
}


