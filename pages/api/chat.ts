
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== "POST") return res.status(405).json({error:"Method not allowed"});
  const { messages } = req.body || {};
  const last = (messages && messages.length) ? messages[messages.length-1].content : "";
  // swap with OpenAI call on server if you want real AI
  res.json({ reply: `Thanks! We received: "${last}"` });
}
