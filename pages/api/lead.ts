
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== "POST") return res.status(405).json({error:"Method not allowed"});
  try{
    const url = process.env.MAKE_WEBHOOK_URL;
    if(!url) return res.status(500).json({error:"Missing MAKE_WEBHOOK_URL"});
    const r = await fetch(url, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(req.body || {}) });
    const txt = await r.text();
    res.json({ ok: true, response: txt });
  }catch(err:any){
    res.status(500).json({ error: err.message || "Webhook error" });
  }
}
