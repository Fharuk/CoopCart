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
