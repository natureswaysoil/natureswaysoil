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

// pages/components/CheckoutForm.tsx
// Before:
// import { getProduct, type Product } from '../lib/products';

// After:
import { getProduct, type Product } from '../../data/products'; // <-- fixed path to match components folder
import { readCart, clearCart } from '@/lib/cart-store';
import { calculate } from '@/lib/cart';

// ---------------- Stripe init ----------------
const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string | undefined;
const stripePromise = pk ? loadStripe(pk) : null;

// ---------------- Local helpers ----------------
type LineItem = { slug: string; title: string; unitAmountCents: number; qty: number };
type IntentResponse = { clientSecret?: string; error?: string };

function toCents(v: number) {
  return Math.round((v ?? 0) * 100);
}

// Accepts Cart | CartItem[] | null | unknown and returns a Cart-like object
function normalizeToCart(val: any): any /* Cart-like */ {
  if (!val) return { items: [] };
  if (Array.isArray(val)) return { items: val }; // it was CartItem[]
  if (typeof val === 'object' && Array.isArray(val.items)) return val; // already Cart-like
  return { items: [] };
}

// Build a one-item cart from ?slug and ?qty
function buildCartFromQuery(router: ReturnType<typeof useRouter>): any /* Cart-like */ | null {
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

function cartToItems(cart: any): LineItem[] {
  const items = Array.isArray(cart?.items) ? cart.items : [];
  return items.map((it: any) => ({
    slug: String(it.slug),
    title: String(it.title ?? it.slug),
    unitAmountCents: toCents(Number(it.price || 0)),
    qty: Number(it.qty || 0),
  }));
}

// ---------------- Inner Stripe form ----------------
function InnerCheckout({
  onSuccess,
  emailHint,
}: {
  onSuccess: (piId?: string) => void;
  emailHint?: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function pay() {
    if (!stripe || !elements) return;
    setBusy(true);
    setErr(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { receipt_email: emailHint },
      redirect: 'if_required',
    });

    if (error) {
      // Provide more actionable error messages based on error type
      let errorMessage = error.message || 'Payment failed.';
      
      if (error.code === 'card_declined') {
        errorMessage = 'Your card was declined. Please try a different payment method or contact your bank.';
      } else if (error.code === 'insufficient_funds') {
        errorMessage = 'Insufficient funds. Please try a different payment method.';
      } else if (error.code === 'invalid_number') {
        errorMessage = 'Invalid card number. Please check your card details.';
      } else if (error.code === 'invalid_expiry_month' || error.code === 'invalid_expiry_year') {
        errorMessage = 'Invalid expiry date. Please check your card details.';
      } else if (error.code === 'invalid_cvc') {
        errorMessage = 'Invalid security code. Please check your card details.';
      } else if (error.code === 'processing_error') {
        errorMessage = 'Payment processing error. Please try again or contact support.';
      } else if (error.code === 'rate_limit') {
        errorMessage = 'Too many attempts. Please wait a moment and try again.';
      }
      
      setErr(errorMessage);
      setBusy(false);
      return;
    }
    if (paymentIntent?.status === 'succeeded' || paymentIntent?.status === 'processing') {
      onSuccess(paymentIntent?.id);
    } else {
      setErr('Payment not completed.');
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <AddressElement options={{ mode: 'shipping', allowedCountries: ['US'] }} />
      <PaymentElement />
      {err && <p className="text-sm text-red-600">{err}</p>}
      <button
        type="button"
        onClick={pay}
        disabled={busy || !stripe || !elements}
        className="w-full px-5 py-3 rounded-2xl bg-green-700 text-white disabled:opacity-60"
      >
        {busy ? 'Processing…' : 'Pay securely'}
      </button>
      <p className="text-xs text-gray-500">
        Not happy? Just ask for a refund — no return required.
      </p>
    </div>
  );
}

// ---------------- Main component ----------------
export default function CheckoutForm() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // Cart source: URL (?slug&qty) first, then local cart-store
  const cart: any = useMemo(() => {
    const fromSlug = buildCartFromQuery(router);
    if (fromSlug) return fromSlug;
    return normalizeToCart(readCart());
  }, [router.query]);

  // Totals and items (cast to any when calling calculate to avoid strict type coupling)
  const totals = useMemo(() => {
    try {
      return calculate(cart as any) || { subtotal: 0, shipping: 0, total: 0 };
    } catch {
      return { subtotal: 0, shipping: 0, total: 0 };
    }
  }, [cart]);

  const items = useMemo(() => cartToItems(cart), [cart]);
  const amountCents = toCents(
    Number((totals as any).total ?? (totals as any).subtotal ?? 0)
  );

  // Create PaymentIntent whenever amount/items change
  useEffect(() => {
    if (!stripePromise || !pk) return;
    if (!items.length || amountCents <= 0) return;

    let cancelled = false;

    async function createIntent() {
      setCreating(true);
      setStatus(null);
      try {
        const r = await fetch('/api/stripe/create-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amountCents,
            items, // for records—server can ignore
            meta: { source: 'web_checkout' },
          }),
        });
        const j: IntentResponse = await r.json();
        if (!r.ok || !j.clientSecret) throw new Error(j.error || 'Unable to start checkout.');
        if (!cancelled) setClientSecret(j.clientSecret);
      } catch (e: any) {
        if (!cancelled) setStatus(e?.message || 'Could not start checkout.');
      } finally {
        if (!cancelled) setCreating(false);
      }
    }

    createIntent();
    return () => {
      cancelled = true;
    };
  }, [amountCents, JSON.stringify(items)]); // eslint-disable-line react-hooks/exhaustive-deps

  function onSuccess(_piId?: string) {
    try { clearCart(); } catch {}
    setStatus('Thanks! Your order has been received.');
    // Optionally: router.push(`/thank-you?pi=${_piId}`);
  }

  // ---------- UI ----------
  if (!pk || !stripePromise) {
    return (
      <div className="rounded-2xl border p-6">
        <h2 className="font-semibold text-lg">Checkout unavailable</h2>
        <p className="mt-2 text-sm text-gray-700">
          Missing <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>. Add it in Vercel →
          Project Settings → Environment Variables (Production), then redeploy.
        </p>
      </div>
    );
  }

  if (!items.length || amountCents <= 0) {
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
              <span>{it.title} × {it.qty}</span>
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
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
          <InnerCheckout onSuccess={onSuccess} />
        </Elements>
      )}
    </div>
  );
}
