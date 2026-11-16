'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import type { Area } from '../lib/areas';

export function AreaBrowser({ areas }: { areas: Area[] }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const visibleAreas = useMemo(
    () => areas.filter((area) => area.name.toLowerCase().includes(query.trim().toLowerCase())),
    [areas, query],
  );

  return (
    <section className="areas-section" id="areas" aria-labelledby="areas-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">LAGOS, NEIGHBOURHOOD BY NEIGHBOURHOOD</p>
          <h2 id="areas-title">Find your area.</h2>
          <p className="section-intro">We’re preparing coverage across Lagos. We’ll show an area as available only when local suppliers and fulfilment are confirmed.</p>
        </div>
        <span className="area-count"><MapPin size={15} /> {areas.length} LGAs listed</span>
      </div>
      <label className="area-search">
        <Search size={18} aria-hidden="true" />
        <span className="sr-only">Search Lagos local government areas</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your local government area" />
        {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">Clear</button>}
      </label>
      <div className="areas-grid" aria-live="polite">
        {visibleAreas.map((area) => (
          <button
            type="button"
            key={area.slug}
            className={`area-card${selected === area.slug ? ' area-card-selected' : ''}`}
            aria-pressed={selected === area.slug}
            onClick={() => setSelected(selected === area.slug ? null : area.slug)}
          >
            <span className="area-pin"><MapPin size={17} /></span>
            <span className="area-copy"><strong>{area.name}</strong><small>{area.note}</small></span>
            <span className={`area-state state-${area.launchState}`}><span />{area.launchState === 'active' ? 'Coverage confirmed' : area.launchState === 'paused' ? 'Temporarily paused' : 'Coming soon'}</span>
          </button>
        ))}
        {visibleAreas.length === 0 && (
          <div className="no-area"><strong>We couldn’t find that area.</strong><span>Try a different spelling or search by LGA name.</span><button type="button" onClick={() => setQuery('')}>Show all Lagos LGAs</button></div>
        )}
      </div>
      {selected && <p className="area-selection" role="status">{areas.find((area) => area.slug === selected)?.name} is on our coverage list. We’re not collecting contact details yet.</p>}
      <p className="areas-footnote">Area selection stays in this browser; it is not saved or sent anywhere.</p>
    </section>
  );
}
