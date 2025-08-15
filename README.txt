
Minimal On‑Site Stripe (Elements) — Tiny Bundle
-----------------------------------------------
Files:
- components/CheckoutForm.tsx
- pages/checkout.tsx
- pages/api/stripe/create-intent.ts
- pages/api/stripe/webhook.ts
- lib/cart.ts

ENV (Vercel):
- STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_WEBHOOK_SECRET
- MAKE_WEBHOOK_URL

Link Buy buttons to: `/checkout?slug=<slug>&qty=1`
