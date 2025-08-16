import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: "Missing OPENAI_API_KEY" });

  const body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) || {};
  const userMessages = Array.isArray(body.messages) ? body.messages : [];
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",              // fast & inexpensive, great for site chat
      temperature: 0.6,
      messages: [
        { role: "system", content: "You are a helpful, concise assistant for Nature’s Way Soil. If asked about orders, direct users to Contact; avoid medical/chemical claims; keep answers friendly." },
        ...userMessages.slice(-20)       // keep context short/cost-efficient
      ],
    });
    const text = completion.choices[0]?.message?.content ?? "";
    res.json({ text });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "OpenAI error" });
  }
}

