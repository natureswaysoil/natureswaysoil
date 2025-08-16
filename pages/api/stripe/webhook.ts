import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import getRawBody from "raw-body";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const sig = req.headers["stripe-signature"];
  if (!sig) return res.status(400).send("Missing Stripe signature");

  let event: Stripe.Event;
  try {
    const raw = await getRawBody(req);
    event = stripe.webhooks.constructEvent(
      raw,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;

    // 1) compute fee/net first
    let fee = 0, net = 0;
    try {
      if (pi.latest_charge) {
        const ch = await stripe.charges.retrieve(pi.latest_charge as string, {
          expand: ["balance_transaction"],
        });
        const bt = ch.balance_transaction as Stripe.BalanceTransaction | null;
        if (bt) {
          fee = (bt.fee ?? 0) / 100;
          net = (bt.net ?? 0) / 100;
        }
      }
    } catch { /* ignore fee lookup errors */ }

    // 2) now build the payload (fee/net are simple numbers)
    if (process.env.MAKE_WEBHOOK_URL) {
      await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "stripe_webhook",
          type: event.type,
          payment_intent: pi.id,
          amount: pi.amount / 100,
          currency: pi.currency,
          email: pi.receipt_email,
          shipping: pi.shipping,
          metadata: pi.metadata,
          fee,
          net,
        }),
      });
    }
  }

  return res.json({ received: true });
}
