// pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY || "";

// safest: omit apiVersion (or use "2023-10-16")
const stripe = new Stripe(secret);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!secret) return res.status(200).json({ url: "", error: "Stripe not configured" });

  try {
    const { lineItems } = (req.body || {}) as {
      lineItems?: { price: string; quantity: number }[];
    };

    const site = process.env.NEXT_PUBLIC_SITE_URL || "https://natureswaysoil.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems ?? [],
      allow_promotion_codes: true,
      success_url: `${site}/?success=1`,
      cancel_url: `${site}/?canceled=1`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("[checkout] error", err);
    return res.status(500).json({ error: err?.message || "Stripe error" });
  }
}
