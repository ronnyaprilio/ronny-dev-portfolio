// call from backend : https://[project].vercel.app/api/revalidate?secret=YOUR_SECRET

import { clearProfileCache } from '@/lib/profileCache';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  if (!process.env.REVALIDATE_ENABLE) {
    return res.status(401).json({ message: 'Revalidate Disabled' });
  }
  try {
    await res.revalidate('/');
    await res.revalidate('/projects');
    clearProfileCache();
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating' });
  }
}