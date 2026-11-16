# CoopCart launch sequence plan

**Status:** pilot direction approved: dry-staple, pickup-only, no-payment. CAC registration is underway. Neighborhood and supplier are not yet confirmed. This remains planning/research only; no public release or cloud changes are authorized by this document.
**Recommendation:** prepare a public, read-only discovery experience and an offline concierge pilot. Do not begin with a transactional marketplace.

## Sequence 1 — Agree the launch model and confirm company status

### Recommended launch model

- **Public product:** a clear discovery page describing CoopCart and its pilot, with verified supplier/offer information only when evidence is approved for publication. No signup/waitlist form, account, reservation, order, payment, personal-data collection, or claim of service in an unverified area.
- **Pilot:** staff-led, no-payment validation in one selected Lagos neighborhood with one dry-staple basket, subject to owner confirmation and actual supplier availability. Conversations and observations are research, not orders or demand commitments.
- **Claims:** coverage, availability, price comparisons, savings, and supplier status must be evidence-backed, dated, and scoped. Until a location is operationally verified, label it waitlist/coming soon.
- **Money:** no CoopCart collection, holding, or transfer of customer funds. Keep the existing no-money-movement constraint unless the owner explicitly changes it after legal/provider review.

### Owner confirmations and dependencies

- CAC registration is underway; incorporation is not treated as complete until the owner confirms the certificate and final registered details. This plan does not file anything on the owner's behalf.
- The owner approved the dry-staple, pickup-only, no-payment pilot and answered “all” when asked which Lagos neighborhood has a supplier or operating contact. Treat this as the intended all-Lagos scope / an owner-reported lead, **not verified coverage**: no neighborhood, supplier, or pickup capability has yet been independently identified in project records. The pilot itself remains a one-location test. Do not mark any LGA active or advertise supplier availability until named suppliers, product/price/stock evidence, and pickup capacity are verified area by area. Select the first pilot location from the verified candidates.
- Confirm permission before making any public release. Existing Vercel resources and deployments remain untouched.

## Sequence 2 — Run a no-payment, concierge pilot

A blank 20-LGA sourcing/verification template is available at `pilot-validation-tracker.csv`. It contains no supplier or availability claims. Keep supplier evidence current and do not put private individuals' contact details or customer data in Git; the tracker is for business-level verification notes and public source references only.

### Before recruiting participants

1. Select one neighborhood only after confirming the team can actually operate there; identify a real supplier willing to participate.
2. Verify supplier identity and contact, product specifications, pack sizes, stock/quote expiry, pickup/delivery terms, fees, and who is responsible for fulfillment and remedies.
3. Record dated, like-for-like price evidence from relevant alternatives. Compare total cost including required fees; make no savings claim unless the evidence supports it.
4. Define a short interview script, consent language, data minimization and deletion approach, and incident/contact owner. Use synthetic data in software; do not put participant contact details into CoopCart or its analytics.
5. Agree operational stop conditions: supplier stock/price changes, missed fulfillment commitments, safety/quality concern, inaccurate price evidence, or unresolved complaint means pause and do not publish the offer.

### During the pilot

- Run manual, staff-supervised research; no online orders, reservations, payments, deposits, or customer data capture in the product.
- Ask households and suppliers about needs and feasibility without representing interest as a purchase commitment.
- Track only aggregate research outcomes (for example, interview counts and recurring needs), unless lawful collection and handling of identifiable data has been reviewed and approved.
- Do not label any LGA active based on interviews or expressions of interest. Activation requires verified supply and an operational fulfillment process.

### Exit criteria before expanding

- At least one supplier and the chosen product/terms have been independently verified and remain current.
- Pickup/delivery responsibilities, issue escalation, and consumer communications are documented and tested manually.
- Price comparisons are genuinely like-for-like and include all mandatory costs; unsupported savings claims are omitted.
- The team can meet stated service expectations in the pilot location, and any complaint or failure can be handled safely.
- The owner reviews findings and explicitly approves the next scope. No transaction, signup, or public production launch follows automatically from a successful pilot.

## Current implementation facts and boundary

The branch currently provides a prelaunch area-discovery experience. Supabase has 20 Lagos LGAs marked `waitlist`, no offers, and read-only public policies. Offers remain disabled. No auth, signup, reservation, checkout, or payment flow exists. The private Vercel preview and existing deployments are not changed by this plan. See `implementation-roadmap.md` for cloud status and `product-brief.md` for product context.
