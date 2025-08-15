import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export const config = { api: { bodyParser: false } };

const secret = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(secret, { apiVersion: "2024-04-10" }); // or just: new Stripe(secret)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers["stripe-signature"] as string;
  const buf = await buffer(req);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
    const url = process.env.MAKE_WEBHOOK_URL;
    if (url) {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "stripe_webhook",
          payment_intent: pi.id,
          amount: pi.amount,
          currency: pi.currency,
          email: pi.receipt_email,
          metadata: pi.metadata
        })
      });
    }
  }

  res.json({ received: true });
}

async function buffer(req: any) {
  const chunks: any[] = [];
  for await (const c of req) chunks.push(typeof c === "string" ? Buffer.from(c) : c);
  return Buffer.concat(chunks);
}
