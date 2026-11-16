import 'server-only';
import { fallbackLagosAreas, type Area } from '../areas';

type AreaRow = { id?: unknown; lga_name?: unknown; launch_state?: unknown };

const allowedStates = new Set(['waitlist', 'active', 'paused']);

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
    if (!Array.isArray(payload)) throw new Error('Supabase returned an invalid area list');
    const rows = payload as AreaRow[];
    const statusByName = new Map<string, { id: string; launchState: Area['launchState'] }>();
    for (const row of rows) {
      if (typeof row.id !== 'string' || typeof row.lga_name !== 'string' || typeof row.launch_state !== 'string') continue;
      if (!allowedStates.has(row.launch_state)) continue;
      statusByName.set(row.lga_name.toLowerCase(), { id: row.id, launchState: row.launch_state as Area['launchState'] });
    }

    const areas = fallbackLagosAreas.map((area) => {
      const storedArea = statusByName.get(area.name.toLowerCase());
      const launchState = storedArea?.launchState ?? 'waitlist';
      const note = launchState === 'active'
        ? 'Local coverage is confirmed; offers are listed separately when available.'
        : launchState === 'paused'
          ? 'Local service is temporarily paused.'
          : 'Local availability is not confirmed yet.';
      return { ...area, id: storedArea?.id ?? null, launchState, note };
    });
    return { areas, source: 'supabase' };
  } catch {
    console.warn('Public area status is unavailable; using the waitlist-only fallback.');
    return { areas: fallbackLagosAreas, source: 'local-preview' };
  }
}
