import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return res.status(200).json({ url: "", error: "Stripe not configured" });

  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });
  const { lineItems, promotionCode } = req.body as { lineItems?: { price: string; quantity: number }[]; promotionCode?: string };

  try {
    if (!lineItems?.length) return res.status(400).json({ error: "No items" });

    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
    if (promotionCode) {
      try {
        const found = await stripe.promotionCodes.list({ code: promotionCode, active: true, limit: 1 });
        if (found.data[0]?.id) discounts = [{ promotion_code: found.data[0].id }];
      } catch {}
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      allow_promotion_codes: true,
      discounts,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://natureswaysoil.com"}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://natureswaysoil.com"}?canceled=1`
    });

    return res.status(200).json({ sessionId: session.id });
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
}
