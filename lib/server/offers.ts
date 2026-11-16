import 'server-only';
import type { PublicOffer } from '../offers';

type OfferRow = Record<string, unknown>;

function safeText(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  return text.length > 0 && text.length <= max ? text : null;
}

function safeMoney(value: unknown): number | null {
  const amount = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
  return Number.isSafeInteger(amount) && amount > 0 ? amount : null;
}

function safeHttpsUrl(value: unknown): string | null {
  if (typeof value !== 'string' || value.length > 2048) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function getPublishedOffers(): Promise<PublicOffer[]> {
  if (process.env.LIVE_OFFERS_ENABLED !== 'true') return [];
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const publicKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publicKey) return [];

  const select = [
    'id', 'service_area_id', 'title', 'description', 'category', 'product_specification',
    'unit_label', 'price_kobo', 'comparator_price_kobo', 'comparator_description',
    'comparator_checked_at', 'comparator_evidence_url', 'supplier_display_name', 'pickup_description',
    'fulfillment_date', 'offer_expires_at',
  ].join(',');

  try {
    const response = await fetch(
      `${url}/rest/v1/public_offers?select=${select}&publication_state=eq.published&order=created_at.desc`,
      {
        headers: { apikey: publicKey, Authorization: `Bearer ${publicKey}` },
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(4000),
      },
    );
    if (!response.ok) throw new Error(`Supabase offers query failed (${response.status})`);
    const rows: unknown = await response.json();
    if (!Array.isArray(rows)) throw new Error('Supabase returned an invalid offer list');

    return (rows as OfferRow[]).flatMap((row): PublicOffer[] => {
      const id = safeText(row.id, 80);
      const serviceAreaId = safeText(row.service_area_id, 80);
      const title = safeText(row.title, 100);
      const description = safeText(row.description, 1000);
      const category = safeText(row.category, 50);
      const productSpecification = safeText(row.product_specification, 300);
      const unitLabel = safeText(row.unit_label, 50);
      const supplierDisplayName = safeText(row.supplier_display_name, 100);
      const priceKobo = safeMoney(row.price_kobo);
      if (!id || !serviceAreaId || !title || !description || !category || !productSpecification || !unitLabel || !supplierDisplayName || !priceKobo) return [];

      const comparatorValue = row.comparator_price_kobo;
      const comparatorPriceKobo = comparatorValue == null ? null : safeMoney(comparatorValue);
      const comparatorCheckedAt = safeText(row.comparator_checked_at, 80);
      const comparatorDescription = safeText(row.comparator_description, 300);
      return [{
        id, serviceAreaId, title, description, category, productSpecification, unitLabel,
        priceKobo, comparatorPriceKobo, comparatorDescription,
        comparatorCheckedAt,
        comparatorEvidenceUrl: safeHttpsUrl(row.comparator_evidence_url),
        supplierDisplayName,
        pickupDescription: safeText(row.pickup_description, 300),
        fulfillmentDate: safeText(row.fulfillment_date, 30),
        offerExpiresAt: safeText(row.offer_expires_at, 80),
      }];
    });
  } catch {
    console.warn('Verified offers are unavailable; showing no offers.');
    return [];
  }
}
