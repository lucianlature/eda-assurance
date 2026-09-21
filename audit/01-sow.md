# Event-Contract Safety Audit — Statement of Work

**Client:** [Company]
**Consultant:** Lucian Lature
**Start:** [Date]  ·  **Duration:** 2 weeks  ·  **Fee:** $[6,000–9,000] USD
**Payment:** 50% upon signature (wire), 50% upon delivery of final report

---

## Outcome

At the end of two weeks, [Company] will have:

1. A written assessment of current event-contract change safety practices
2. A prioritized list of the top 5 risks with concrete remediation cost estimates
3. A machine-readable inventory of every event contract in scope (schemas + semantic contracts)
4. A consumer topology diagram showing deployed-version dependencies
5. 5 replayed "dangerous PR" scenarios from [Company]'s own recent history, with expected outcomes under a proposed gate
6. A 30/60/90-day remediation roadmap sized to available engineering capacity

## Scope

**In scope**

- Up to 3 repositories agreed at kickoff
- Kafka / SNS / SQS / EventBridge / RabbitMQ / NATS / Redis Streams (whichever apply)
- Async event contracts (schemas + semantic contracts)
- Existing CI pipeline review for one representative repo

**Out of scope (available as a follow-on Tier 2 engagement)**

- Implementing the CI gate in your pipelines
- Writing custom policy code beyond the roadmap
- Ongoing rule maintenance

## Method

**Week 1 · Discovery**

- Kickoff: 60 min. Agree scope + access.
- 4-6 engineer interviews (staff eng, platform lead, on-call SRE) — 45 min each
- Static analysis of repos: schema files, consumer bindings, deployment configs
- Extract deployed versions from k8s / ECS / Lambda alias / deployment history

**Week 2 · Synthesis**

- Draft report + topology diagram
- Replay top 5 recent PRs against proposed gates
- 90-min findings review with the team
- One written revision after findings review

## Deliverables

1. `event-contract-audit.pdf` — the written report (10-15 pages)
2. `topology.yaml` — machine-readable inventory of event contracts + consumers
3. `topology.svg` — consumer topology diagram with deployed-version pinning
4. `scenarios/*.md` — 5 replayed PRs with detection outcomes and required evidence
5. `roadmap.md` — 30/60/90-day plan keyed to available capacity
6. 90-min findings review (recorded if requested)

## Access needed from [Company]

- Read access to 3 repos + CI configs
- 4-6 engineer interviews (~45 min each), scheduled by end of week 1 day 2
- Access to deployment history / prod version manifest (read-only)
- A shared Slack channel or equivalent for questions during weeks 1-2

## Constraints and assumptions

- Consultant works remotely from EU timezone (CET/EET). Meetings scheduled to overlap.
- Delivery timeline assumes all access is granted within 3 business days of signature.
- Extending scope beyond 3 repos or 6 interviews may extend duration or require a scope change note.

## Confidentiality

Standard mutual NDA (attached separately, or [Company] template accepted). Consultant may reference [Company] as a client and publish a *redacted* case study only with explicit written approval. All source code and internal artifacts remain the property of [Company].

## Payment terms

- 50% ($[3,000–4,500]) upon signature — wire transfer, invoiced day 0
- 50% ($[3,000–4,500]) upon delivery of the final report — invoiced day 14
- Net 14 on both invoices
- Payment in USD. EUR accepted for EU-registered entities at prevailing rate at invoice date.

---

**[Consultant]** Lucian Lature
Email: [email]
Signed: _______________________________     Date: _____________

**[Client]** [Name, Title]
Signed: _______________________________     Date: _____________

---

## Notes for you (not for the client — strip before sending)

**Discount clause for first 3 engagements (optional, add above signature):**

> First-of-three: [Company] receives a 25% discount on the fee in exchange for granting Consultant public use of the [Company] logo on marketing materials and permission to publish a redacted findings summary (subject to [Company] review) within 90 days of delivery.

Effective price becomes **$4,500–6,750 USD** — even easier under discretionary spend, and buys you a case study.

**Converting to PDF:**

```bash
# Simplest — macOS
open 01-sow.md          # opens in default markdown app, print → save as PDF

# Or with pandoc (brew install pandoc basictex)
pandoc 01-sow.md -o sow-companyname-2026-09-20.pdf --pdf-engine=xelatex \
  -V geometry:margin=1in -V fontsize=11pt

# Or the browser trick — open the rendered markdown, cmd+P → save as PDF
```

**Send email template (paste under the PDF attachment):**

```
Subject: Event-contract audit — one-pager as promised

Hi [name],

Attached is the SOW I mentioned. Two weeks, fixed price, everything spelled out.

The scenarios section is the part that matters — I replay your own recent PRs
against the proposed gate so you see exactly what would/wouldn't have been caught.

If it makes sense, sign and send back. If it doesn't, no worries — the
questions we discussed helped me either way.

— Lucian
```

**Objection playbook** (see [`README.md`](README.md) if you need the answers).

1. "How is this different from Buf/AsyncAPI?"
2. "Why can't we do this in-house?"
3. "Do you have references?"
4. "Our events aren't well documented."
5. "We already use Confluent / EventBridge Schema Registry."
