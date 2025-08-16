// pages/api/stripe/create-intent.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { calculate } from "@/lib/cart";

const secret = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(secret, { apiVersion: "2024-04-10" });



export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!secret) return res.status(500).json({ error: "Stripe not configured" });

  try{
    const { cart } = req.body || {};
    if (!cart || !cart.items || !cart.items.length) return res.status(400).json({ error: "Cart is empty" });
    const computed = calculate(cart);
    const amount = Math.round(computed.total * 100);

    const intent = await stripe.paymentIntents.create({
      amount, currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { source: "nws_site", items: JSON.stringify(cart.items), shipping_flat: String(computed.shipping) }
    });

    res.json({ clientSecret: intent.client_secret });
  } catch(err:any){
    res.status(500).json({ error: err.message || "Stripe error" });
  }
}

