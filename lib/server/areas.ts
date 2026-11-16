import 'server-only';
import { fallbackLagosAreas, normalizeAreaStatuses, type Area } from '../areas';

export async function getLagosAreas(): Promise<{ areas: Area[]; source: 'supabase' | 'local-preview' }> {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const publicKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publicKey) return { areas: fallbackLagosAreas, source: 'local-preview' };

  try {
    const response = await fetch(`${url}/rest/v1/service_areas?select=id,lga_name,launch_state&order=lga_name.asc`, {
      headers: { apikey: publicKey, Authorization: `Bearer ${publicKey}` },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) throw new Error(`Supabase area query failed (${response.status})`);

    const payload: unknown = await response.json();
    return { areas: normalizeAreaStatuses(payload), source: 'supabase' };
  } catch {
    console.warn('Public area status is unavailable; using the waitlist-only fallback.');
    return { areas: fallbackLagosAreas, source: 'local-preview' };
  }
}
