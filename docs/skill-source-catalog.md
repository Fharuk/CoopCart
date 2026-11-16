# Skill and inspiration source catalog

**Status:** source inventory and review plan; not an installation or a claim that every file in every repository has been read.

The user has now provided a Google Drive planning pack for CoopCart, a neighborhood bulk-buying product for Nigeria. A working product brief is in [`product-brief.md`](product-brief.md). Relevant skills can now be prioritized (design/accessibility, Next.js, backend/data, security, and testing), but the broad upstream repositories have not been cloned or exhaustively reviewed. The initial UI is a prototype based on the supplied brand guide. Keep third-party skill files out of the repository unless explicitly selected; link to upstream sources and retain their licenses/attribution if any material is later copied.

## Visual / interaction references

These are implementation or inspiration repositories, not necessarily agent-skill collections:

- [shadergradient](https://github.com/ruucm/shadergradient) — shader-based gradient visuals.
- [liquid-logo (collidingScopes)](https://github.com/collidingScopes/liquid-logo) — liquid logo effect.
- [liquid-logo (paper-design)](https://github.com/paper-design/liquid-logo) — separate project with the same name; do not conflate it with the previous repository.
- [scroll-world](https://github.com/oso95/scroll-world) — scroll-driven world/scene experience.
- [liquid-glass-js](https://github.com/dashersw/liquid-glass-js) — liquid-glass effect.
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) — React renderer for Three.js.

## Agent workflow / general product skills

- [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace)
- [TechyMT/claude-code-superpowers](https://github.com/TechyMT/claude-code-superpowers)
- [Anthropic skills](https://github.com/anthropics/skills/tree/main/skills)
- [Vercel agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills) (listed more than once; deduplicated)
- [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/main/.claude/skills)
- [shadcn/ui skills](https://github.com/shadcn-ui/ui/tree/main/skills)
- [antfu/skills](https://github.com/antfu/skills)
- [TanStack agent skills](https://github.com/DeckardGer/tanstack-agent-skills)
- [Astro agent skills](https://github.com/astrolicious/agent-skills)
- [Emil Kowalski skills](https://github.com/emilkowalski/skills)
- [Remotion skills](https://github.com/remotion-dev/skills)
- [Microsoft Playwright CLI](https://github.com/microsoft/playwright-cli)
- [Impeccable](https://github.com/pbakaus/impeccable)
- [Taste skill](https://github.com/leonxlnx/taste-skill)
- [Chrome modern web guidance](https://github.com/googlechrome/modern-web-guidance)

## Framework, frontend, and testing

- [Next.js skills (canary)](https://github.com/vercel/next.js/tree/canary/skills) (listed twice; deduplicated)
- [Vitest skill](https://github.com/antfu/skills/tree/main/skills/vitest)
- [Clerk testing skill](https://github.com/clerk/skills/tree/main/skills/clerk-testing)
- [Clerk skills](https://github.com/clerk/skills/tree/main/skills)
- [E2E testing patterns](https://github.com/wshobson/agents/tree/main/plugins/developer-essentials/skills/e2e-testing-patterns)
- [Break UI](https://github.com/emilkowalski/skills/tree/main/skills/break-ui) (listed twice; deduplicated)
- [Callstack agent skills](https://github.com/callstackincubator/agent-skills/tree/main/skills)
- [Expo skills](https://github.com/expo/skills/tree/main/plugins/expo/skills)
- [Svelte AI tool skills](https://github.com/sveltejs/ai-tools/tree/main/tools/skills)
- [Vercel agent-browser](https://github.com/vercel-labs/agent-browser)
- [Browserbase skills](https://github.com/browserbase/skills/tree/main/skills)

## Backend, data, infrastructure, and security

- [Kubernetes skill](https://github.com/LukasNiessen/kubernetes-skill)
- [Docker skills](https://github.com/docker/skills/tree/main/skills)
- [Backend development skills](https://github.com/wshobson/agents/tree/main/plugins/backend-development/skills)
- [PostgreSQL table design](https://github.com/wshobson/agents/tree/main/plugins/database-design/skills/postgresql-table-design)
- [Neon agent skills](https://github.com/neondatabase/agent-skills/tree/main/skills)
- [Supabase agent skills](https://github.com/supabase/agent-skills/tree/main/skills)
- [Firebase agent skills](https://github.com/firebase/agent-skills/tree/main/skills)
- [Firebase Auth basics](https://github.com/firebase/agent-skills/tree/main/skills/firebase-auth-basics)
- [MongoDB agent skills](https://github.com/mongodb/agent-skills/tree/main/skills)
- [Convex agent skills](https://github.com/convex/agent-skills/tree/main/skills)
- [Redis agent skills](https://github.com/redis/agent-skills/tree/main/skills)
- [Trail of Bits skills](https://github.com/trailofbits/skills)
- [Modern Python skill](https://github.com/trailofbits/skills/tree/main/plugins/modern-python/skills/modern-python)
- [Python development skills](https://github.com/wshobson/agents/tree/main/plugins/python-development/skills)
- [Sentry skills](https://github.com/getsentry/skills/tree/main/skills)
- [Hugging Face skills](https://github.com/huggingface/skills/tree/main/skills)
- [OpenRouter skills](https://github.com/OpenRouterTeam/skills/tree/main/skills)

## Payments, communications, growth, and analytics

- [Stripe skills](https://github.com/stripe/ai/tree/main/skills) (the `stripe-best-practices` subpath was also listed; included here)
- [Dodo Payments skills](https://github.com/dodopayments/skills)
- [Polar agent toolkit](https://github.com/polarsource/agent-toolkit)
- [Twilio AI skills](https://github.com/twilio/ai/tree/main/skills)
- [Resend skills](https://github.com/resend/resend-skills/tree/main/skills)
- [PostHog skills](https://github.com/PostHog/skills)
- [Marketing skills](https://github.com/coreyhaines31/marketingskills/tree/main/skills)

## Initial targeted review (16 November 2026)

For the first CoopCart UI slice, I inspected the current upstream skill files for [Vercel React Best Practices](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md), [Vercel Web Design Guidelines](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md), [Anthropic Frontend Design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [Anthropic Webapp Testing](https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md), [UI/UX Pro Max Design System](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/design-system/SKILL.md), and [Emil Kowalski Break UI](https://github.com/emilkowalski/skills/blob/main/skills/break-ui/SKILL.md). Applied selectively: product-grounded art direction and no generic metrics hero; semantic design token foundation; client-side filtering for the static demo; honest prototype/demo labeling; and explicit accessibility/responsive requirements in the supplied product guide. The full web-design audit and Playwright testing skill workflow have not yet been run. Skills are versioned upstream instructions, not model training; revisit the current upstream text when a task calls for them.

## Review plan

1. **Define the product first.** Capture users, core workflow, target platforms, constraints, and preferred stack. No project idea was included with the source list.
2. **Resolve source scope.** Check current upstream structure, relevant skill names, license, maintenance, and compatibility. The broad directory URLs are moving targets; the exact skills in them must be enumerated at review time.
3. **Select, don't bulk-import.** Map project needs to a short list (for example: UI/design, framework, data/auth, security, testing, deployment). Skip unrelated specialties and avoid duplicate sources.
4. **Read the primary materials.** Review each selected `SKILL.md`, linked references, and relevant examples. Treat repository code as reference—not as permission to copy wholesale.
5. **Apply and document.** Translate the useful practices into project architecture, implementation, and tests. If retaining skill files is useful, add only selected files with upstream URL, revision/date, and license/attribution.
6. **Verify.** Run the project's checks and review the result against accessibility, security, performance, and user requirements. Revisit source versions as needed.

## Scope note

This document catalogs the distinct links supplied in the request (with obvious repeated entries deduplicated). It does **not** install tools, clone the repositories, or assert that all contents have been audited. Some entries are entire repositories or large skill directories containing many individual skills; exhaustive review should be scoped after the project brief is known.
