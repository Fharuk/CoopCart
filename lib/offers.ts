export type PublicOffer = {
  id: string;
  serviceAreaId: string;
  title: string;
  description: string;
  category: string;
  productSpecification: string;
  unitLabel: string;
  priceKobo: number;
  comparatorPriceKobo: number | null;
  comparatorDescription: string | null;
  comparatorCheckedAt: string | null;
  comparatorEvidenceUrl: string | null;
  supplierDisplayName: string;
  pickupDescription: string | null;
  fulfillmentDate: string | null;
  offerExpiresAt: string | null;
};
