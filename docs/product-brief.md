# CoopCart — working product brief

**Source:** [Google Drive planning pack](https://drive.google.com/drive/folders/1VjrRepasUB70arhda9xlq-VNH0f1GwIv), retrieved 16 November 2026. The Drive folder contains 20 files: an index, product/business, design, technical, legal/operations documents, plus a viability assessment and payment-model simulation. The documents are working drafts; CoopCart is explicitly a working name.

## Product in one paragraph

A mobile-first web product for neighborhood bulk purchasing in Nigeria, starting with dense Lagos neighborhoods. Households discover/request/join group offers; trusted local organizers (“captains”) help a pool reach a viable volume; vetted suppliers confirm exact stock, price, and fulfillment; the group reviews the final offer and arranges pickup or delivery. The product should make the true all-in saving and the responsible seller clear before checkout. WhatsApp can support sharing, but the app remains the source of truth.

## People and initial workflow

- **Buyer/household:** discover nearby pools, compare itemized prices, express interest/reserve, see a supplier-confirmed offer, then choose whether to buy.
- **Captain/organizer:** form a local group, share offers, and help coordinate pickup. Do not make the captain personally responsible for customer money.
- **Supplier:** provide a genuine quote, confirm stock/terms, fulfill the order, and take responsibility for the sale and applicable customer remedies.
- **Operations:** curate pools, verify suppliers and price comparisons, resolve fulfillment issues, and support the pilot.

Suggested narrow experiment: one dry-staple basket in one selected neighborhood; test concierge operations before automating. The planning pack suggests two manual pools, real buyer/captain/supplier interviews, and dated same-spec competitor/local price checks. These are proposed validation activities, not completed research.

## Design direction from the supplied guide

Warm, clear, financially serious, neighborly. Deep green `#0F5132` / `#145B3D` for trust, amber `#F2A900` for savings, blue for information, soft neutral backgrounds. Use readable sans-serif typography, roomy cards, short everyday copy, mobile-first 44px+ controls, labeled form fields, visible focus, and status text/icons rather than color alone. Respect reduced motion and low-bandwidth Android use. Never use unverified testimonial, savings, rating, or transaction counts as proof.

## Important discrepancy / hard product boundary

Earlier planning documents describe a CoopCart-controlled escrow-like hold/release/refund engine. The later viability assessment and payment-model addendum explicitly recommend **not** collecting or conditionally holding buyers’ money in CoopCart’s account, and warn that a standard PSP split is not escrow. They propose a no-charge reservation followed by a supplier-confirmed offer, buyer-accepted standard checkout to the actual seller, and seller-owned fulfillment/refund obligations. This changes core product states and conflicts with the earlier PRD, architecture, database and API plans.

Treat the later assessment as a serious risk flag, not legal advice or final approval. Do not implement payments, escrow, wallet balances, refunds, payout logic, or claims of “escrow protection” without written provider approval and Nigerian counsel sign-off for the exact merchant/fund flow. Product copy must not promise guaranteed savings/refunds unsupported by that approved arrangement. The current interface reads area statuses from a dedicated Supabase project (all 20 LGAs are waitlist-only), provides local-only area search/selection, and shows no offer amounts because the database has none. It is still a prelaunch preview: no signup, orders, checkout, or personal data collection.

## Current implementation in this branch

The current `/` experience is a prelaunch, read-only area discovery page. It loads public LGA status from the dedicated Supabase project when reachable and fails closed to waitlist states. The database currently has 20 LGAs marked `waitlist`, no offers, and no customer data. Offer display is disabled by default; there is no account, signup, order, reservation, checkout, or payment flow. Do not describe the interface as showing live supplier availability. See `implementation-roadmap.md` for deployment details and `launch-sequence-plan.md` for the recommended non-transactional pilot sequence.

## Next decisions / gates

1. Confirm name, pilot neighborhood, first basket/category, pickup model, target buyer and actual supplier.
2. Validate with real interviews and a concierge transaction; independently verify same-spec prices and net savings after fees/delivery.
3. Get written provider approval and Nigerian counsel’s opinion on seller/merchant of record, payment, refunds, consumer rights, and data protection. Resolve the PRD-versus-payment-model conflict before schema/API design.
4. Choose only the skills relevant to the agreed implementation stack (likely Next.js, Supabase/Postgres, design/accessibility, security, and end-to-end testing); review upstream instructions and licenses before adopting files.
5. After the gates, build a narrow, testable vertical slice. Add money movement only after its policy and legal requirements are resolved.

## Planning-pack source map

- Product vision: [01](https://docs.google.com/document/d/1jN-G2jcQN6zm9ecXoAsKB-jgIaYd_jTm9oh4Pp6oDgE/edit)
- PRD/user stories: [02](https://docs.google.com/document/d/1AZiIrFo1rWblK1-hjDpmuOuKUayE6_kHMhMBK_yETT0/edit)
- Brand/UI guide: [07](https://docs.google.com/document/d/1c_szqtOmeD3fu5ETandoEciZd9K3nEAyLAyJOYYM4uk/edit)
- Architecture: [09](https://docs.google.com/document/d/1NeGmIR2vBInADyQT5qlfWfL0vBW3BGjKwOlyQnhtzT0/edit)
- Database/schema: [10](https://docs.google.com/document/d/1SZOYRMq6VohkwDQ1HrmaSZZasnS3P710f3grex0iLq4/edit)
- API/integrations: [11](https://docs.google.com/document/d/1-m4i_x3-So71WqCRHHli62wxOJORmN213r1vhEG7ooo/edit)
- Security/compliance plan: [12](https://docs.google.com/document/d/16DOEfSkXTK5AMM3KDcYd9Xtr8EwrbLacRyZ3e8V7vX0/edit)
- QA/launch checklist: [17](https://docs.google.com/document/d/1LTjOVF44-G053Cyho__Ij1av-U5Hcz0qedx7g8ytVSo/edit)
- Viability assessment: [18](https://docs.google.com/document/d/1KuYfRR1ApNxSIqJkk24WBMb1soAEUFEbJ_5663RohnM/edit)
- Interview simulation/payment model: [19](https://docs.google.com/document/d/1sOq4by9mqKNtHCYyWMjs8hkD6wZfE9GFKmpVIB03L9g/edit)

The other product/pricing/roadmap, wireframe/flow/copy, and draft legal/operations documents remain in the Drive pack. Legal drafts are not legal advice and require qualified Nigerian counsel.
