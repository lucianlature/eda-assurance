# Event-Contract Audit — validation + revenue play

**Goal:** close 1–2 paid audits. The engine stays private. OSS is not the GTM.

> **Why this wedge?** See [`00-strategy.md`](00-strategy.md) — full origin story, moat argument, kill signals, alternatives-on-the-shelf, and screech-v2 asset inventory. Read before touching tactical files if you're picking this up cold.

## Hypothesis

> Within 30 days, ≥1 signed audit SOW. The Action and Cursor plugin exist as delivery tools for that engagement — not as a public install target.

## Kill criteria (day 10, no rationalizing)

| Signal at day 10 | Decision |
| --- | --- |
| ≥5 people describe a recent event-contract incident they'd have wanted caught, AND ≥1 will pay | Sell the audit. Engine stays private. |
| ≥5 have the pain but 0 will pay | Reprice or kill. Do not open the repo to "get users." |
| <5 have the pain OR they solve it with tools they trust | Kill the wedge. Repick |
| ≥2 offer to pay $5-15k to consult *this month* | Take the money. |

## Files in this folder

| File | What it is | When to touch it |
| --- | --- | --- |
| [`00-strategy.md`](00-strategy.md) | Origin, wedge choice, moat argument, kill signals, alternatives, screech-v2 reuse map | Read first if picking this up cold; revisit at day-10 decision |
| [`05-review.md`](05-review.md) · [`_review-market.md`](_review-market.md) · [`_review-challenge.md`](_review-challenge.md) | Screech-dogfooded review of this plan. **SpecShield finding changes positioning.** Read before day-1 outreach. | Before touching anything else — reposition first |
| [`01-sow.md`](01-sow.md) | Statement of Work for the Tier 1 audit | Send within 4 hrs of every call that lit up |
| [`02-interview-tracker.md`](02-interview-tracker.md) | Interview log + scoring + auto go/no-go | Update after every call |
| [`03-linkedin-plan.md`](03-linkedin-plan.md) | Profile rewrite + 4 posts | Day 0: profile change. Post day 1, 8, 15, 22 |
| [`04-landing-page.md`](04-landing-page.md) | One-page landing copy | Ship as Framer/Astro/plain HTML before day 1 |
| [`mock-reports/kafka.md`](mock-reports/kafka.md) | Failing-PR mock for Kafka teams | Send in call recap when they use Kafka |
| [`mock-reports/eventbridge.md`](mock-reports/eventbridge.md) | Failing-PR mock for AWS EventBridge | Send when they run on AWS serverless |
| [`mock-reports/sns-sqs.md`](mock-reports/sns-sqs.md) | Failing-PR mock for SNS/SQS fanout | Send when they run classic AWS async |
| [`06-demo-scenario.md`](06-demo-scenario.md) | 90-second Cursor wow + `preflight_change` return shape + v0 plugin stop-line | Build the plugin against this; if it is not filmable, do not write code |
| [`07-article-outline.md`](07-article-outline.md) | First distribution article (headline, hook snippet, 3 sections) | Write only after the fixture + plugin make the demo true |

## ICP filter (all four must be true)

1. Stack: TS/Node primary with async messaging (Kafka, SNS/SQS, EventBridge, NATS, RabbitMQ, Redis Streams)
2. Team shape: 20-200 engineers, ≥3 services communicating via events
3. Buying authority: Staff/Principal, Platform Lead, Head of Eng, or CTO at ≤200-person shop
4. Bonus 2x: piloting Cursor/Claude Code/Copilot OR recent post-mortem mentioning schema/contract break

## Outreach channels (ranked by response rate for you)

| Source | Realistic responses | Method |
| --- | --- | --- |
| LinkedIn 1st-degree (ICP-fit staff+ engineers) | 6-10 | Use `screech fetch linkedin` + manual filter for ICP |
| Substack authors you read on EDA/DDD | 1-3 | Reply to recent post with a specific observation, DM for 20 min |
| AsyncAPI / DDD community Slacks + Discord | 2-4 | Post the mock report as discussion, not pitch |
| Local (Bucharest/EU) meetups + ex-colleagues | 2-3 | Fastest to pilot commit — trust already exists |
| Reddit r/softwarearchitecture, r/microservices | 1-2 | Bright Data hand-raisers skill fits |

Target: **20 outreach → 12-15 conversations → 3-5 pilot commits → 1 paid design partner + 1-2 paid audits.**

## Outreach template (verbatim)

```
Subject: 20 min — event-contract breakage question

Hi [name],

I'm researching a specific failure mode: teams running event-driven TS services
who ship a schema/semantic change that breaks a downstream consumer despite
green tests. I saw [specific reference — their post/repo/talk] and think
you've probably lived this.

Not selling anything. Not a demo. 20 min call, I ask 6 questions, you get a
short write-up of the pattern I'm seeing across teams.

If yes: [Calendly link]

— Lucian
```

## Interview script (behavioral, 20 min)

1. "Walk me through the last event-contract or schema breakage that took real time to fix. What happened, how did you find it, and who owned the deploy decision?" *(if they can't answer in 3 min → no pain, thank + end early)*
2. "What tooling flagged it before or after merge? Buf, AsyncAPI, custom scripts, code review, nothing?"
3. "How do you decide today whether a schema change is safe to deploy in a rolling release?"
4. "If a GitHub check had said 'this PR breaks consumer X on the current deployed version,' what would you have done differently?"
5. "Who in your org owns that gate — you, platform, security, service owner? Who can authorize spending money to solve it centrally?"
6. *(NOW show the mock report)* "If a v0.1 of this existed in 3 weeks, would you pilot it on one repo? What would it need to include for you to trust it in CI?"

**Also ask, don't lead with:**

- "What would a fair price be for a team your size to have this in CI?"
- "Would you or a team lead pay me to audit your event-contract review process this quarter?"

**End of Q4 audit pitch (verbatim):**

> "Look — regardless of whether I ever ship the tool I mentioned, I could give you a concrete audit and a working CI gate in a couple of weeks. Fixed scope, fixed price under $10k. I'm going to be researching this problem across 15 teams anyway — I might as well help you close it. Want me to send a one-pager?"

Do NOT send during the call. Send [`01-sow.md`](01-sow.md) as PDF within 4 hours.

## 10-day schedule

| Day | Action |
| --- | --- |
| **0** | LinkedIn profile change ([`03-linkedin-plan.md`](03-linkedin-plan.md)). Landing page live. Shortlist 30 targets. Draft calls list. |
| **1** | 15 outreach messages sent. First LinkedIn post. |
| **2** | 5 more outreach. First 2-3 calls. |
| **3-4** | Peak call days. 3-4/day. Log every one in [`02-interview-tracker.md`](02-interview-tracker.md). |
| **5** | Mid-check: <3 "real incident" answers on Q1 → broaden ICP (add Java/Go). |
| **6-8** | Remaining calls. Push pilot ask on strongest 5. Send audit SOW to hot leads. |
| **9** | Synthesize tracker. Draft go/no-go memo. |
| **10** | Decide against kill matrix above. If GO: schedule weeks 2-4 build. If audit-only: close first engagement. |

## Fast-revenue math

- Month 1: 20 outreach → 12-15 conversations → **1-2 audits close** = **$6-18k**
- Month 2: 1 Tier 2 (case study + design partner) = **+$15-22k**
- Month 3: first Tier 3 or 2nd Tier 2 = **+$15-40k**

**By month 3: $10k+/mo consulting run-rate. Engine still closed.**
