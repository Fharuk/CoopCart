import { CalendarClock, MapPin, PackageCheck, ShieldCheck } from 'lucide-react';
import type { Area } from '../lib/areas';
import type { PublicOffer } from '../lib/offers';

function formatNaira(kobo: number): string {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(kobo / 100);
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return value;
  return new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Africa/Lagos' }).format(date);
}

export function OfferBoard({ offers, areas }: { offers: PublicOffer[]; areas: Area[] }) {
  const activeAreaNames = new Map(areas.flatMap((area) => area.id && area.launchState === 'active' ? [[area.id, area.name] as const] : []));
  const visibleOffers = offers.filter((offer) => activeAreaNames.has(offer.serviceAreaId));

  return (
    <section className="offers-section" id="offers" aria-labelledby="offers-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">NO GUESSWORK, JUST THE DETAILS</p>
          <h2 id="offers-title">Offers, when they’re ready.</h2>
          <p className="section-intro">We only list a supplier-confirmed offer in an area with confirmed coverage. No placeholder prices or made-up discounts.</p>
        </div>
        <span className="offers-live-count"><span /> {visibleOffers.length} verified {visibleOffers.length === 1 ? 'offer' : 'offers'}</span>
      </div>
      {visibleOffers.length === 0 ? (
        <div className="no-offers"><span className="no-offers-icon"><PackageCheck size={21} /></span><div><strong>No verified offers are live yet.</strong><p>We’re checking local supplier and fulfilment details before publishing anything. Check back soon.</p></div></div>
      ) : (
        <div className="offers-grid">{visibleOffers.map((offer) => {
          const areaName = activeAreaNames.get(offer.serviceAreaId)!;
          const showComparator = offer.comparatorPriceKobo !== null && offer.comparatorCheckedAt !== null && offer.comparatorDescription !== null && offer.comparatorEvidenceUrl !== null;
          return <article className="offer-card" key={offer.id}>
            <div className="offer-card-top"><span>{offer.category}</span><span><MapPin size={13}/>{areaName}</span></div>
            <h3>{offer.title}</h3>
            <p className="offer-description">{offer.description}</p>
            <div className="offer-spec"><strong>{offer.productSpecification}</strong><span>per {offer.unitLabel}</span></div>
            <div className="offer-price"><span>Supplier-confirmed price</span><strong>{formatNaira(offer.priceKobo)}</strong></div>
            {showComparator && <div className="offer-comparison"><span>Comparison noted: {formatNaira(offer.comparatorPriceKobo!)} at {offer.comparatorDescription} · checked {formatDate(offer.comparatorCheckedAt!)}</span><a href={offer.comparatorEvidenceUrl!} target="_blank" rel="noopener noreferrer">View evidence</a></div>}
            <div className="offer-facts"><span><ShieldCheck size={14}/>Seller: {offer.supplierDisplayName}</span>{offer.pickupDescription && <span><MapPin size={14}/>{offer.pickupDescription}</span>}{offer.fulfillmentDate && <span><CalendarClock size={14}/>Planned fulfilment {formatDate(offer.fulfillmentDate)}</span>}</div>
            <p className="offer-footer"><PackageCheck size={14}/> Review full details with the seller before any purchase.</p>
          </article>;
        })}</div>
      )}
    </section>
  );
}
