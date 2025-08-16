import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: "Missing OPENAI_API_KEY" });

  const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
  const userMessages = Array.isArray(body.messages) ? body.messages : [];

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",            // or "gpt-4o"
        temperature: 0.6,
        messages: [
          { role: "system", content: "You are a helpful, concise assistant for Nature’s Way Soil. Be friendly; avoid medical/chemical claims; for orders send people to the Contact page." },
          ...userMessages.slice(-20),
        ],
      }),
    });

    const data = await r.json();
    const text = data?.choices?.[0]?.message?.content ?? "Sorry—no response.";
    return res.json({ text });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "OpenAI error" });
  }
}
