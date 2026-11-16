export type Area = {
  id: string | null;
  slug: string;
  name: string;
  launchState: 'waitlist' | 'active' | 'paused';
  note: string;
};

// Conservative fallback for local preview and deployments without environment
// configuration. Never label a zone as served based on a fixture.
export const fallbackLagosAreas: Area[] = [
  'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
  'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja',
  'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo',
  'Oshodi-Isolo', 'Shomolu', 'Surulere',
].map((name) => ({
  id: null,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  name,
  launchState: 'waitlist',
  note: 'Local availability is not confirmed yet.',
}));

const allowedStates = new Set<Area['launchState']>(['waitlist', 'active', 'paused']);

export function normalizeAreaStatuses(rows: unknown): Area[] {
  if (!Array.isArray(rows)) return fallbackLagosAreas;
  const knownNames = new Set(fallbackLagosAreas.map((area) => area.name.toLowerCase()));
  const statusByName = new Map<string, { id: string; launchState: Area['launchState'] }>();

  for (const row of rows) {
    if (!row || typeof row !== 'object') continue;
    const record = row as Record<string, unknown>;
    if (typeof record.id !== 'string' || typeof record.lga_name !== 'string' || typeof record.launch_state !== 'string') continue;
    const normalizedName = record.lga_name.toLowerCase();
    if (!knownNames.has(normalizedName) || !allowedStates.has(record.launch_state as Area['launchState'])) continue;
    statusByName.set(normalizedName, { id: record.id, launchState: record.launch_state as Area['launchState'] });
  }

  return fallbackLagosAreas.map((area) => {
    const storedArea = statusByName.get(area.name.toLowerCase());
    const launchState = storedArea?.launchState ?? 'waitlist';
    const note = launchState === 'active'
      ? 'Local coverage is confirmed; offers are listed separately when available.'
      : launchState === 'paused'
        ? 'Local service is temporarily paused.'
        : 'Local availability is not confirmed yet.';
    return { ...area, id: storedArea?.id ?? null, launchState, note };
  });
}
