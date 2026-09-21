# Landing page — copy

One page. No scroll-jacking. No animated hero. Ships in Framer, Astro, plain HTML, or a Notion public page in under 2 hours.

Use `[bracketed]` fields as placeholders — replace before publishing.

---

## SECTION 1 — Hero

**H1:**
Ship AI-assisted code without breaking event contracts.

**Subhead:**
Two-week fixed-price audits for TS/Node teams running event-driven services and adopting Cursor, Claude Code, or Copilot.

**Primary CTA button:**
Book a 20-min call → [Calendly URL]

**Secondary link (small text below button):**
Or email lucian.lature@gmail.com

---

## SECTION 2 — The problem

**H2:**
Green tests. Merged. Consumer down 40 minutes later.

**Body (2 short paragraphs):**

Your team has schema registries, protobuf compatibility checks, and 90%+ test coverage. Then one PR renames a field, passes every check, and takes down a downstream service during rolling deploy. Post-mortem says "we should have caught this."

AI coding agents make this worse. Cursor and Claude Code ship 2-4x more PRs. Your reviewers didn't scale. Your event-compatibility checks were never designed for the version-skew window that rolling deploys create.

---

## SECTION 3 — What's missing

**H2:**
The gap nobody's tools check.

**Body:**

Existing tools answer *"can the schema evolve?"* — a static property of the change.

Nobody checks *"can the consumers currently running in production keep processing events during this deploy?"* — a dynamic property of `change + deployed fleet + rolling window`.

That's the gate this audit designs.

**Three-column comparison** (side by side, minimal styling):

| Schema registries | Contract testing | The gap I close |
| --- | --- | --- |
| ✓ Shape compatibility | ✓ Producer/consumer agreement | ✓ Deployed-version compatibility |
| ✓ Version storage | ✓ Contract snapshots | ✓ Rolling-deploy window analysis |
| ✗ Deployed version awareness | ✗ Semantic changes | ✓ Semantic diff, not just syntactic |
| ✗ Rolling-deploy window | ✗ Multi-consumer blast radius | ✓ CI gate at PR-time |

---

## SECTION 4 — What you get

**H2:**
Two weeks. Six deliverables. Fixed price.

**Body:**

Six things land in your Google Drive by the end of week 2:

1. **Event-contract inventory** — every schema and semantic contract across up to 3 repos, machine-readable
2. **Consumer topology diagram** — who publishes, who consumes, what version is deployed where
3. **5 replayed PRs** — dangerous changes from your own recent history, replayed against the proposed CI gate, showing exactly what would/wouldn't be caught
4. **Top 5 risks** — prioritized, with remediation cost estimates
5. **30/60/90 roadmap** — sized to your engineering capacity, not a wishlist
6. **90-min findings review** — with the team, recorded if you want

**Price:** $6,000 – $9,000 USD depending on repo count and event volume. First 3 engagements at 25% off in exchange for a redacted case study.

**CTA:**
See the SOW → [Link to SOW PDF]

---

## SECTION 5 — Who this is for

**H2:**
This is for you if…

**Bulleted list (no icons — pure text):**

- Your team runs TS/Node services with async messaging (Kafka, SNS/SQS, EventBridge, NATS, RabbitMQ)
- You have 3+ services communicating via events
- You've adopted or you're piloting Cursor, Claude Code, or Copilot
- You've had at least one event-contract incident in the last 12 months — or you're worried about the next one
- You're a Staff/Principal Engineer, Platform Lead, Head of Engineering, or CTO at a ≤200-person shop

**Not for you if:**

- Your event traffic is a single producer + single consumer
- You don't ship async messaging at all
- You want a demo before you'll commit to a call

---

## SECTION 6 — About

**H2:**
Who's doing the work

**Body (3 short paragraphs, with a photo):**

I'm Lucian. 15 years in TypeScript, distributed systems, DDD, CQRS, and event-sourcing across fintech, insurance, and B2B SaaS.

I've been the on-call engineer when the wrong event shape shipped. I've been the reviewer who missed it. I've been the architect who wrote the runbook after. The audit is the thing I'd want handed to me by someone who's already been through it.

Based in Bucharest. Working with teams across EU, UK, and US East. Currently taking 2-3 engagements per quarter.

**Small link:**
[LinkedIn] · [GitHub]

---

## SECTION 7 — FAQ

**H2:**
Common questions

**Accordion (5 items):**

**How is this different from Buf or AsyncAPI?**
Those check schema shape and spec conformance — great tools. They don't check whether the version currently running in your prod fleet can process events during your rolling-deploy window. That's the failure mode I focus on.

**Can't we do this in-house?**
You can. It'll take ~2 engineer-quarters to design the policy properly and another quarter to wire it into CI. That's roughly $150k of engineering time. I ship it in two weeks for a fraction of that, and you keep the artifacts.

**Do you have references?**
The first three engagements are running now under a case-study clause — happy to share redacted findings once they publish. Direct references available by call [X] weeks after the third completes.

**What if our events aren't well documented?**
Week 1 IS discovery. If your topology is undocumented, we find that in three days and you get the inventory even if we stopped there. That inventory alone is usually worth the fee.

**Do you build the CI gate too?**
Not in the audit. A follow-on Tier 2 engagement builds the working gate wired into your pipeline, using the policy pack designed during the audit. Ask on the call.

---

## SECTION 8 — Final CTA

**H2:**
Book the 20-min call

**Body (one line):**
I ask six questions. You get a short write-up of what I'm seeing across teams. No demo, no pitch, no follow-up sequence.

**Button:**
Grab a slot → [Calendly URL]

**Below button (small):**
Or email: lucian.lature@gmail.com · Response within 24 hrs.

---

## Footer

Minimal. `© [Year] Lucian Lature` · LinkedIn · GitHub · Email. Skip legal pages until you actually have contracts flowing.

---

# Implementation notes

**Stack recommendation:** Framer or Astro. Both let you ship a real page in 90 min.

- **Framer:** Free tier is fine for a single page. Import an existing template, replace copy above. Custom domain via `audit.lucianlature.com` or similar.
- **Astro + Tailwind:** If you want it in your own repo. `pnpm create astro@latest` → single index page → deploy to Cloudflare Pages.
- **Notion public page:** Fastest — 20 min. Looks less polished but perfectly acceptable for a validation-phase landing page. Use `Notion.site` domain then upgrade later.

**Domain:**
- If you own `lucianlature.com`: use `audit.lucianlature.com` or `/event-contracts`
- Alternative: register `eventcontracts.dev` or `ec-audit.com` — cheap, memorable, ownable
- Don't wait for the perfect domain. Ship on a subdomain today.

**Analytics:**
Plausible or PostHog (self-hosted or cloud). Track: hero CTA click, SOW download, Calendly bookings. Nothing else.

**A/B test worth running:**
Hero H1 variant A: "Ship AI-assisted code without breaking event contracts."
Hero H1 variant B: "Green tests. Broken production. The event-contract gap AI coding is making worse."

Run for 100 visitors each, pick the higher CTA conversion, delete the other.

**What to NOT do:**
- Don't add a chatbot
- Don't add a newsletter signup as the primary CTA
- Don't add customer logos you don't have yet
- Don't add "Trusted by 500+ teams" numbers you don't have
- Don't add a pricing table beyond what's in Section 4 (removes optionality on final quote)
