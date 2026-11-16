# CoopCart

A mobile-first neighborhood bulk-buying platform in prelaunch development for Lagos, Nigeria. See [`docs/product-brief.md`](docs/product-brief.md) for the Drive planning-pack summary, payment-safety boundary, and product scope.

## Run locally

```bash
npm ci
npm run dev
```

Open the local URL printed by Next.js. The landing/discovery UI reads public area-status records from the dedicated Supabase project when reachable. If the database is unavailable, it explicitly shows the waitlist-only fallback. Search and area selection stay in the browser. Offers remain disabled by default; there is no signup, personal-data capture, account, reservation, order, checkout, or payment flow.

## Verify changes

```bash
npm test
npm run lint
npm run build
npm audit --audit-level=high
```

GitHub Actions runs the same checks on pushes and pull requests. See [`docs/launch-sequence-plan.md`](docs/launch-sequence-plan.md) and [`docs/pilot-validation-tracker.csv`](docs/pilot-validation-tracker.csv) for the approved no-payment, dry-staple/pickup pilot preparation and LGA-by-LGA evidence checklist.

## Project guidance

The supplied design references, skill sources and review plan are cataloged in [`docs/skill-source-catalog.md`](docs/skill-source-catalog.md). No broad skill repositories have been copied into this project; apply relevant upstream skills selectively as implementation work calls for them.

## Safety / scope

The agreed direction is a production-ready prelaunch, with Lagos-wide access and no live payment. Treat every area as waitlist-only until supplier, captain, fulfillment, and support coverage are validated. A dedicated Supabase prelaunch project has the migration applied; it seeds all Lagos LGAs as waitlist and exposes only published offers in active areas. See [`docs/implementation-roadmap.md`](docs/implementation-roadmap.md) for release gates and environment status.

The planning pack contains conflicting payment designs. The later viability and payment-model docs caution against CoopCart holding conditional buyer funds. Do not implement or market escrow, payment, or refund functionality until the exact seller/payment model is approved by the payment provider and Nigerian counsel.
