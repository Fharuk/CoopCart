# CoopCart implementation roadmap

**Agreed direction (16 Nov 2026):** production-ready prelaunch, no live money movement, Lagos-wide access. Where there is no verified local supplier/fulfillment, communicate waitlist/coming-soon—not a live pool. Initial stack: Next.js, Supabase, Vercel, GitHub.

## Release shape

### 0 — Foundation / internal preview
- Responsive, low-bandwidth public experience; deploy only to a protected preview.
- Real Lagos LGA coverage/status model; no invented active zones or supplier claims.
- Public offers must be supplier-verified, time-bound, and show same-spec price evidence and all-in price. Until then, use clearly labeled demo fixtures only in non-production.
- Supabase schema and RLS migrations committed in Git; isolated CoopCart Supabase environment only.
- CI: formatting/lint, typecheck, unit/integration tests, dependency audit, E2E/accessibility smoke tests.

### 1 — Non-transactional public release (candidate)
- Read-only, verified offer discovery and neighborhood availability / waitlist page.
- No account, payment, reservation, order, wallet, captain earning, or refund functionality.
- Add a real opt-in signup only when the privacy notice, lawful basis, retention/deletion process, processor/DPA, and hosting/data-transfer review are approved. Until that gate, no personal data is collected or sent to a third party.
- Admin publishing must require authenticated, authorized operators; no client-side service-role credentials.

### 2 — Operations workflow
- Supplier/captain onboarding and evidence review, offer approval, price comparison record, inventory/expiry and fulfillment statuses, support/dispute process.
- Establish support ownership, escalation, customer communications, and verified supplier/area coverage before enabling an area.
- Keep all money movement off. Test workflow with staff and suppliers using non-customer synthetic records.

### 3 — Paid marketplace (separate authorization gate)
- Do not start until the written payment-provider approval, Nigerian counsel opinion, seller/merchant-of-record contracts, consumer remedy/refund process, tax treatment, and reconciliation procedures are settled.
- Then specify and threat-model the approved model; implement provider sandbox tests and independent security review before any live payments.

## Deployment prerequisites / current access check

- GitHub remote is `Fharuk/CoopCart`; this work stays on the active Arena branch. Changes are not pushed or released without an explicit deployment/release decision.
- A dedicated Supabase project, **CoopCart Prelaunch**, now exists in `eu-west-1`. The `lagos_discovery` migration (`20261116154807`) is applied; its 20 areas are all `waitlist`, there are zero offers, and anonymous/authenticated roles have SELECT-only RLS policies. The project contains no customer data. Its EU region and any later personal-data processing still require privacy/data-transfer review.
- A dedicated Vercel project, `coopcart-prelaunch`, is connected to the GitHub repository. The approved informational-only public prelaunch is live at [coopcart-prelaunch.vercel.app](https://coopcart-prelaunch.vercel.app), deployed from commit `46ff96c` (`dpl_8DvMEMt7pVAMd6JwwCzd61Z8L9bq`, READY/PROMOTED). The public homepage and `/api/health` were checked after deployment. It is a discovery/prelaunch page only—not a marketplace launch. Offers, signups, orders, and checkout remain disabled. The project uses Vercel's default `iad1` region while Supabase is in `eu-west-1`; revisit regional placement if plan/settings permit.
- The local environment uses a publishable Supabase key stored in ignored `.env.local`; the code reads only public area statuses and is RLS constrained. Do not commit `.env.local` or expose a service-role key. The informational site is public; it captures no personal data, and no payment capability is active.

## Current truth

The existing `/` page is an explicitly labeled early preview. It reads public area status server-side from the dedicated Supabase project when reachable, fails closed to all 20 waitlist areas, shows no fabricated offer data, has no signup form, and offers no live service. The PRD, older architecture, and later viability/payment addendum disagree about payment custody; until the legal/provider gate is resolved, all payment/escrow states remain out of scope.
