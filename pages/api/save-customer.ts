import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, order_id } = req.body;
    const { error } = await supabase.from('customers').insert([{ name, email, order_id }]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: 'Saved!' });
  }
  res.status(405).end();
}
