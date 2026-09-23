# LinkedIn — profile rewrite + 4-week posting calendar

## Day 0 profile changes (do before day 1 of outreach)

Anyone you cold-message will visit your profile within 30 seconds. Make it match the outreach.

### Headline (220 chars max — use them)

**Before** (whatever you have now that reads "senior engineer"):

**After** (pick one, A/B if needed):

- **Option A (direct):** Helping TS/Node teams ship AI-assisted code without breaking event contracts · 2-week fixed-price audits
- **Option B (problem-first):** Green tests, broken production: event-contract audits for TS/Node teams adopting AI coding agents
- **Option C (identity-first):** Distributed-systems architect · event-contract safety for AI-assisted delivery · 2-week audits

Recommend **A** for outreach conversions. It says exactly what you sell and how long it takes.

### About section (rewrite verbatim, edit specifics)

```text
I help engineering teams ship AI-assisted code without breaking their event
contracts.

Most teams adopting Cursor, Claude Code, or Copilot are shipping 2-4x more
pull requests. The review process didn't scale with it — and the failure
mode I keep seeing is the same: a schema or semantic change lands with
green tests, gets merged, and takes down a consumer service during rolling
deploy. Post-mortem says "we should have caught this."

I do 2-week fixed-price audits that give teams:
- A machine-readable inventory of every event contract in their stack
- The 5 dangerous PRs from their own recent history, replayed against a
  proposed CI gate
- A 30/60/90 remediation plan sized to their capacity

Then, if it makes sense, I build the working gate in a follow-on engagement.

15 years of TypeScript, DDD, CQRS, event-sourcing across fintech, insurance,
and B2B SaaS. I've been the on-call engineer when the wrong event shape
shipped. I've been the reviewer who missed it. I've been the architect
who wrote the runbook after.

Currently taking 2-3 audit engagements per quarter.

📩 lucian.lature@gmail.com
🗓 [Calendly link] — 20 min, no demo, no pitch
```

Tune the seniority framing to what you actually have. Keep the third paragraph specific — that's what makes it not sound like every other consulting profile.

### Featured section (3 items)

1. **Pinned post** — post #1 from the calendar below
2. **Landing page** — [`04-landing-page.md`](04-landing-page.md) once shipped
3. **A mock report** — the Kafka variant [`mock-reports/kafka.md`](mock-reports/kafka.md) as a Google Doc or Notion page (world-viewable)

### Services section (LinkedIn's Services offering — free feature)

Turn it on. Add:

- **Consulting** — Software Architecture, Backend Development
- **Location** — Remote worldwide
- **Rate** — Leave blank (never lead with rate on LinkedIn)

### Cover image

Simple: dark background, one sentence. "AI-assisted code needs event-aware review." Use Figma or Canva, 5 minutes.

## 4-week posting calendar

**Cadence:** one post per week, day 1 / 8 / 15 / 22. Each post is a real anti-pattern (anonymized from your interviews or your own past work). Ends with a soft CTA.

**Post structure** (works for all four):

1. Opening hook — a specific failure scenario
2. Why it happens
3. What tests/tools missed
4. The right way to catch it
5. Soft CTA

**Rules:**

- No emojis in the body (one in CTA at most)
- No "hot take:" openers
- No "🚀 excited to share"
- Post between 8-10 AM Bucharest (peaks with EU + US East morning)
- Reply to every comment within 4 hours on day of

---

### Post 1 — Day 1

**Hook:** "Green tests. Merged. Consumer service down 40 minutes later."

```
A payments team ran their event through 47 unit tests, 12 integration tests,
and a schema-registry compatibility check. Everything passed. They merged.

40 minutes into rolling deploy, the ledger service started dead-lettering
every event.

The change: rename `settlementReference` → `settlement_reference` for style
consistency. Schema-compatible under Avro. Semantically catastrophic — the
ledger consumer was still deployed with the old field name in its handler.

The gap: their gate checked "can the schema evolve" — not "can currently
deployed consumers still handle this in the rolling window."

Backwards compatibility is a property of the *change + the currently
deployed fleet*, not the change alone. If your consumer topology isn't
pinned to deployed versions in your review process, you don't have
a review process. You have a hope.

I'm doing 2-week fixed-price audits for TS/Node teams that want to close
this gap before it costs them a Sunday. Link in comments.
```

**First comment (from you, 2 min after posting):**

> Details on how the audit works: [link to landing page]. Booking calendar: [Calendly].

---

### Post 2 — Day 8

**Hook:** "Your AI coding agent doesn't know your event topology. That's fine — until it does."

```
Cursor and Claude Code are excellent at local code changes. They're
also excellent at confidently modifying an event handler without knowing
that three other services consume the event.

Last month I watched an agent refactor a "clean up unused fields" PR. Green
tests. Merged. The removed fields were required by two downstream services
that weren't visible in the agent's context window.

The failure isn't the agent. The failure is that we're grafting AI-scale
code production onto human-scale review, with no structural gate in between.

The fix isn't "give the agent more context." The fix is a CI gate that
computes consumer blast radius from the actual deployed topology, not from
whatever files the agent read.

I'm mapping this problem across 15 teams over the next two weeks. If you're
running event-driven TS services and adopting AI coding agents, DM me for
a 20-min call — I ask 6 questions, you get a short write-up of the pattern
I'm seeing.
```

---

### Post 3 — Day 15

**Hook:** "AsyncAPI validates your schema. It does not validate your deploy."

```
The event-contract tooling landscape today:

- Schema registries (Confluent, EventBridge, Apicurio) — check shape
- Buf — protobuf compatibility, breaking-change detection
- AsyncAPI validators — spec conformance
- OpenAPI / GraphQL — request/response contracts

Every one of these tools is good at its job. None of them answer the
question that actually matters at PR time:

  "Can the consumers currently running in production keep processing
   events after this PR merges and rolls out over the next 4 minutes?"

That's a policy question that combines: the change, the schema evolution
rules, the deployed consumer versions, the rolling-deploy window, the
retry/DLQ behavior, and the semantic compatibility of the change (not
just the syntactic one).

I've been building a policy engine that answers exactly this — first as a
CI gate for teams I'm auditing, then as an open-source project once 3 teams
are running it. If you want to shape it, I'm doing paid pilot engagements
this quarter — 2 slots left.
```

---

### Post 4 — Day 22

**Hook:** "The most expensive event-contract mistake I've seen: $340k, one field rename, six months to fully clean up."

```
Field rename in a payment-settlement event. Publisher shipped Thursday.
By Sunday, three downstream systems had partial data corruption. Nobody
noticed until Monday's reconciliation.

Fixing production was 6 hours. Cleaning up the ledger drift was six months.
Reconciling with banking partners was another quarter. The eng-time cost
alone was ~$340k in salary equivalent. The reputational cost with the
banking partners was worse.

The team had:
- 90%+ test coverage
- A schema registry
- A code-review process
- Green CI

None of it caught the deployed-consumer compatibility issue. Not because
the team was careless — because the tooling doesn't check for it.

If your team runs event-driven services in production and adopts AI coding
agents this year, your PR volume goes up 2-4x. Your review throughput
doesn't. Something has to close that gap.

I'm booking 2-week audits for December and January. Fixed price, one-page
SOW, delivers a working roadmap. DM if you want the details.
```

## Distribution mechanics (per post)

1. **Post at 8-9 AM Bucharest** (7-8 AM CET = 1-2 AM ET = still primetime for EU morning + US late-night decision makers who check phone)
2. **First comment** with links (LinkedIn deprioritizes posts with external links; putting the link in comment 1 recovers 30-50% of reach)
3. **Notify 5-8 people** you know will engage — DM them 10 min before posting: "Posted this morning if it's relevant, would love your take." Do NOT ask for likes.
4. **Reply to every comment** within 4 hours on day-of. LinkedIn's algo rewards conversation depth.
5. **Repost with a new comment 3 weeks later** if it got any traction — LinkedIn shows reposts to different segments.

## Substack / newsletter cross-post

If you have a Substack: cross-post each of these 24-48 hrs after LinkedIn, with 2-3 extra paragraphs of depth (a real code snippet, a policy YAML example). The audiences barely overlap.

## Comment-hunting (bonus channel)

Spend 20 min/day for the 10-day window replying substantively to posts by:

- EDA / DDD authors you already follow via `screech fetch substack`
- Kafka Summit speakers
- AsyncAPI / EventCatalog project maintainers
- CTOs at ~50-200 person AI-native shops

Your comment is a mini-post. If it's genuinely useful (not "great post!"), 5-15% of viewers will click your profile. Which now says "2-week fixed-price event-contract audits." That's the entire funnel.
