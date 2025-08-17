import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Simple canned reply to avoid build-time dependency on OpenAI.
  // We can upgrade to real GPT later by checking process.env.OPENAI_API_KEY.
  return res.status(200).json({
    reply:
      "Thanks for reaching out! We’ll reply by email ASAP.",
  });
}
