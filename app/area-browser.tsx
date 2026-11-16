'use client';

import { useMemo, useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import type { Area } from '../lib/areas';

function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

export function AreaBrowser({ areas, source }: { areas: Area[]; source: 'supabase' | 'local-preview' }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const normalizedQuery = normalizeSearch(query);
  const visibleAreas = useMemo(
    () => areas.filter((area) => normalizeSearch(area.name).includes(normalizedQuery)),
    [areas, normalizedQuery],
  );
  const selectedArea = visibleAreas.find((area) => area.slug === selected);

  return (
    <section className="areas-section" id="areas" aria-labelledby="areas-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">LAGOS, NEIGHBOURHOOD BY NEIGHBOURHOOD</p>
          <h2 id="areas-title">Find your area.</h2>
          <p className="section-intro">We’re preparing coverage across Lagos. An area will be marked available only after local supply and pickup arrangements are verified.</p>
        </div>
        <span className="area-count"><MapPin size={15} aria-hidden="true" /> {areas.length} Lagos LGAs</span>
      </div>
      {source === 'local-preview' && (
        <p className="area-data-notice" role="status">Live coverage data is unavailable. Showing the safe waitlist-only list; no area is confirmed as served.</p>
      )}
      <label className="area-search">
        <Search size={18} aria-hidden="true" />
        <span className="sr-only">Search Lagos local government areas</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search your local government area"
          autoComplete="off"
          type="search"
        />
        {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear area search">Clear</button>}
      </label>
      <p className="search-result-count" aria-live="polite" aria-atomic="true">
        {normalizedQuery ? `${visibleAreas.length} ${visibleAreas.length === 1 ? 'area' : 'areas'} found` : `All ${areas.length} Lagos LGAs`}
      </p>
      <div className="areas-grid">
        {visibleAreas.map((area) => (
          <button
            type="button"
            key={area.slug}
            className={`area-card${selected === area.slug ? ' area-card-selected' : ''}`}
            aria-pressed={selected === area.slug}
            onClick={() => setSelected(selected === area.slug ? null : area.slug)}
          >
            <span className="area-pin"><MapPin size={17} aria-hidden="true" /></span>
            <span className="area-copy"><strong>{area.name}</strong><small>{area.note}</small></span>
            <span className={`area-state state-${area.launchState}`}><span aria-hidden="true" />{area.launchState === 'active' ? 'Coverage confirmed' : area.launchState === 'paused' ? 'Temporarily paused' : 'Coming soon'}</span>
          </button>
        ))}
        {visibleAreas.length === 0 && (
          <div className="no-area">
            <strong>No matching LGA found.</strong>
            <span>Check the spelling or clear your search to see all Lagos LGAs.</span>
            <button type="button" onClick={() => setQuery('')}>Show all Lagos LGAs</button>
          </div>
        )}
      </div>
      {selectedArea && <p className="area-selection" role="status">{selectedArea.name}: {selectedArea.launchState === 'active' ? 'coverage is marked confirmed.' : 'we are not confirming service or collecting contact details here.'}</p>}
      <p className="areas-footnote">Choosing an area is temporary and stays in this browser. It is not saved or sent to CoopCart.</p>
    </section>
  );
}
