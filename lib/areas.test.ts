import { describe, expect, it } from 'vitest';
import { fallbackLagosAreas, normalizeAreaStatuses } from './areas';

describe('Lagos area availability', () => {
  it('includes all 20 Lagos LGAs in the fail-closed waitlist fallback', () => {
    expect(fallbackLagosAreas).toHaveLength(20);
    expect(fallbackLagosAreas.every((area) => area.launchState === 'waitlist')).toBe(true);
    expect(new Set(fallbackLagosAreas.map((area) => area.slug)).size).toBe(20);
  });

  it('maps known database statuses without changing the Lagos area catalogue', () => {
    const areas = normalizeAreaStatuses([
      { id: 'ikeja-row', lga_name: 'Ikeja', launch_state: 'active' },
      { id: 'epe-row', lga_name: 'Epe', launch_state: 'paused' },
    ]);

    expect(areas).toHaveLength(20);
    expect(areas.find((area) => area.name === 'Ikeja')).toMatchObject({ id: 'ikeja-row', launchState: 'active' });
    expect(areas.find((area) => area.name === 'Epe')).toMatchObject({ id: 'epe-row', launchState: 'paused' });
    expect(areas.find((area) => area.name === 'Agege')).toMatchObject({ id: null, launchState: 'waitlist' });
  });

  it('fails closed for malformed, unknown, or unrecognized database rows', () => {
    const areas = normalizeAreaStatuses([
      { id: 'bad-state', lga_name: 'Agege', launch_state: 'open' },
      { id: 'unknown-lga', lga_name: 'Fake Lagos', launch_state: 'active' },
      { lga_name: 'Ikeja', launch_state: 'active' },
      null,
    ]);

    expect(areas.every((area) => area.launchState === 'waitlist')).toBe(true);
    expect(areas.find((area) => area.name === 'Agege')?.id).toBeNull();
    expect(areas.find((area) => area.name === 'Ikeja')?.id).toBeNull();
  });

  it('fails closed if the database response is not a list', () => {
    expect(normalizeAreaStatuses({ data: [] })).toEqual(fallbackLagosAreas);
  });
});
