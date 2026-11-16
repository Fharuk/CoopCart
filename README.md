# CoopCart

A mobile-first neighborhood bulk-buying platform in prelaunch development for Lagos, Nigeria. See [`docs/product-brief.md`](docs/product-brief.md) for the Drive planning-pack summary, payment-safety boundary, and product scope.

## Run the prototype

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js. The landing/discovery UI reads public area-status records from the dedicated Supabase project when reachable (otherwise it fails closed to waitlist status). It currently shows no offers, collects no personal data, and has no accounts or checkout.

## Project guidance

The supplied design references, skill sources and review plan are cataloged in [`docs/skill-source-catalog.md`](docs/skill-source-catalog.md). No broad skill repositories have been copied into this project; apply relevant upstream skills selectively as implementation work calls for them.

## Safety / scope

The agreed direction is a production-ready prelaunch, with Lagos-wide access and no live payment. Treat every area as waitlist-only until supplier, captain, fulfillment, and support coverage are validated. A dedicated Supabase prelaunch project has the migration applied; it seeds all Lagos LGAs as waitlist and exposes only published offers in active areas. See [`docs/implementation-roadmap.md`](docs/implementation-roadmap.md) for release gates and environment status.

The planning pack contains conflicting payment designs. The later viability and payment-model docs caution against CoopCart holding conditional buyer funds. Do not implement or market escrow, payment, or refund functionality until the exact seller/payment model is approved by the payment provider and Nigerian counsel.
