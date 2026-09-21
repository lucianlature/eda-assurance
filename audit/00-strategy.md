# Strategy — how we landed on event-contract audits

Context capture. Written 2026-09-20 after a strategy exchange with Perplexity ([search 1](https://www.perplexity.ai/search/e005fde6-f9c0-4544-956d-9272a767b870) → [search 2](https://www.perplexity.ai/search/25aa1fd0-43f5-4540-9548-028b8408b1a8) → [search 3](https://www.perplexity.ai/search/17bfdac7-be06-44ec-9e32-883b63540fa3)) and a follow-up critique. This doc exists so future-Lucian (or a subagent) can reconstruct the thinking without me.

## Origin

- **3 failed business attempts** — LoopBudget was the most recent; shipped to zero signups. Failure mode was distribution, not product quality.
- **Revenue goal:** stable $10-15k/mo.
- **Timeline:** urgent — 3-6 months.
- **The pivot proposition:** instead of a fourth "build privately, launch broadly" SaaS attempt, ship an open-source project first. If adoption grows, monetize the operational burden around it.

## The idea generation (Perplexity round 1)

Working name: **ForgeTrace / AI Change Intelligence.**

> An open-source, local-first AI-agent change ledger for repositories and CI. Captures an agent's plan, tool calls, file changes, test evidence, policy decisions, and human approvals — then produces a compact, reviewable "change dossier" for each task or pull request.

The thesis: engineering teams adopting Cursor / Claude Code / Codex ship 2-4x more PRs. Review throughput doesn't scale. The gap is *auditable, reproducible evidence* of what changed, why, and whether it's safe.

Business ladder proposed:

| Layer | Buyer | Value |
| --- | --- | --- |
| OSS CLI + GitHub Action | Individual devs | Visibility, trust, adoption |
| Hosted team control plane | Engineering teams | Search, retention, policy management, PR analytics |
| Enterprise edition | Regulated orgs | SSO, audit retention, RBAC, self-hosting, compliance evidence |
| Consulting | Companies adopting agents | Agent-safe SDLC design, policy setup |
| Integrations | Platform/tool vendors | GitLab, Linear, Backstage, IDEs |

Perplexity's runner-up alternative: **event-contract compatibility suite** — "an open-source compatibility and migration simulator for asynchronous APIs." Flagged as less trendy but more durable and technically native to my expertise.

## The graphs/ontology deep-dive (Perplexity round 2)

Reframed as: **an ontology-backed engineering knowledge graph that helps humans and coding agents make safe changes to complex systems.** Three-part graph:

1. **Architecture graph** — modules, bounded contexts, services, APIs, events, schemas, data stores, owners.
2. **Change graph** — commits, PRs, migrations, test runs, deployments, agent tasks, tool calls.
3. **Evidence graph** — tests, approvals, policies, ADRs, CI artifacts, runtime telemetry, exceptions.

A PR becomes a graph transformation: `G_before → G_after`. The engine evaluates `ΔG` and produces conclusions like:
- "This change reaches two other bounded contexts."
- "This event has three consumers; one is incompatible."
- "The PR introduces a direct dependency violating the architecture contract."
- "A migration affects an entity used in five business capabilities."

Key discipline surfaced: **every graph concept must earn its existence by answering a real pre-merge or pre-change question.** Ontologies are seductive; unused ontologies kill projects. Start with typed TS + repo-local YAML; introduce RDF/SHACL/OWL only when a specific capability requires it.

## The moat argument (Perplexity round 3)

The killer insight: a graph, a MCP server, or a PR-review summary is **not a moat** — all are reproducible in weeks. Perplexity proposed:

> An open standard plus reference implementation for **architecture-aware, evidence-backed attestations for AI-assisted changes.**

Name: **Architecture Change Passport (ACP)** or **Engineering Change Passport.**

Distinct from:

| Layer | Insufficient because |
| --- | --- |
| Agent observability ("what did the agent do?") | Tool-call logs don't prove architectural safety |
| Code intelligence ("what depends on what?") | Topology ≠ intent or approval |
| Linting / SAST | No business context or change evidence |
| CI ("did checks pass?") | Passing checks don't establish relevance or sufficiency |
| Supply-chain security (SLSA) | Doesn't say whether the change was semantically safe |
| **The passport layer** | **Connects intent, impact, evidence, accountability** |

Moat components proposed:

1. Semantic data model (versioned ontology for architecture/change/evidence)
2. Evidence graph with provenance
3. Opinionated policy packs (DDD, EDA, CQRS, TS, Postgres, agent safety)
4. Public benchmark corpus of dangerous PR fixtures
5. Portable signed Change Passport format
6. Per-tenant historical causal graph (decisions → changes → incidents → outcomes)
7. Trust & governance layer (signatures, versioning, retention, RBAC)

The commercial moat = the **private, continuously accruing change-and-outcome graph** per customer. OSS builds adoption and format ecosystem; hosted product learns from each org's engineering history. Compounds only through use.

## My critique — where Perplexity was right, where it wasn't

### Right

- **Event-contract assurance is the sharpest wedge.** Not trendy, but real, expensive, and underserved. Buf/AsyncAPI/schema-registries are point solutions; nobody owns CI orchestration + policy + evidence. Especially true for consumer-blast-radius vs shape-only compat.
- **Rejection of generic MCP gateway / agent framework / RAG toolkit** — crowded, no defensibility.
- **Change Passport framing is legitimate** as a standardization vector, even if premature at v0.
- **DDD/EDA expertise is a genuine differentiator** vs the wave of generic "AI code graph" founders.

### Wrong / handwaving

1. **The moat argument is aspirational.** "Accumulated outcome graph" is Datadog's moat — not a startup's. Doesn't help acquire the first 10 customers. Real early moats: distribution, taste, and a policy pack nobody else can write.
2. **The revenue timeline contradicts the $10-15k/mo goal.** OSS → community → SaaS is 2-4 years minimum. Perplexity glossed this.
3. **"Ontology" and "attestation" at v0 are luxury features.** SLSA-style attestations matter when a downstream verifier cares. None do yet. Ship the CI action that blocks a real breaking change; sign it after 3 customers ask.
4. **LoopBudget failed for distribution, not product.** OSS doesn't fix distribution — it changes the surface. GitHub stars ≠ revenue.

### Better moats to actually bet on (v0)

- **A curated corpus of dangerous event-contract PR fixtures** with reproducible detection benchmarks. Boring to build, hard to fake, requires real distributed-systems scars.
- **The EDA policy pack itself** — 30-50 opinionated, battle-tested rules (idempotency, saga compensation, replay safety, poison-message handling, rolling-deploy compat).
- **The reviewer artifact** — the pasted-into-PR failing report becomes the shareable object. Creates organic distribution.

## Decisions made

Recorded via `AskQuestion` prompts, 2026-09-19:

| Question | Answer |
| --- | --- |
| Urgency | **Urgent** — need revenue within 3-6 months |
| Wedge | **Event-contract assurance for TS/Node EDA** — sharpest fit for expertise |
| Next action | **Validate first** — design the 10-day validation plan |

Implied strategic choices:

- **Dual track, not OSS-only.** Consulting (Tier 1 audit) generates revenue in weeks and funds v0.1 of the OSS via Tier 2 design-partner engagements. OSS alone is too slow for the runway.
- **Deterministic first, LLM-assisted second.** Product must run with zero LLM calls. LLMs can classify semantics, explain findings, scaffold policies — never authoritative for release-blocking claims. Every mock report ends: *"No LLM was consulted for any release-blocking claim."*
- **Ship one gate, not a platform.** Event-contract deployed-version compatibility is the wedge. Not "ontology engine," not "attestation standard." Just the gate.
- **Distribution is the actual problem, not architecture.** 15 conversations before code. Kill signal is real (see below).

## Kill signals + alternatives-on-the-shelf

Reproduced from [`02-interview-tracker.md`](02-interview-tracker.md) so this doc is self-contained:

| Day-10 signal | Action |
| --- | --- |
| ≥5 real incidents + ≥3 pilot commits | **Build v0.1** weeks 2-4, 1 design partner paid |
| ≥5 pain + 0 pilots | **Audit-only** — ship consulting, park OSS |
| <5 pain OR trusted existing tooling | **Kill the wedge** |
| ≥2 paid-audit interest + revenue-urgent | **Consulting first** — take the money, OSS = marketing |

**If kill fires, alternatives to consider (in order):**

1. **Architecture consulting for AI-assisted delivery** — no OSS, pure services. Same expertise. Fastest path to $10k/mo. Downside: no compounding asset.
2. **Broader "AI change intelligence" / Change Passport** — wider surface, wider competition. Requires more capital and patience.
3. **Something new** — sit with the interview data for a week before deciding. Don't sunk-cost.

## What screech-v2 already has that would map

If the OSS wedge goes forward, ~40-60% of the plumbing is already sitting in this repo. Rough inventory:

| Component | In screech-v2 | Maps to OSS project as |
| --- | --- | --- |
| Knowledge graph with provenance | `packages/memory` — SurrealDB schema + entities + relations | Architecture graph store, provenance/valid_to model |
| Run traces + evidence records | `packages/loop` — recorded run outcomes | Change graph event source |
| Policy/skill pack pattern | `screech/skills/`, `.screech/skills/` overlay | Policy pack distribution model |
| Wiki as institutional memory | `.screech/wiki/`, `SUPERSEDES`/aspects | Evidence graph — ADR/incident/exception links |
| MCP surface | Cursor Surreal MCP, loop tools | Agent context source for coding agents |
| TS ESM monorepo shape | `pnpm -r`, strict TS | Native for the OSS project (same stack) |
| Retrieval/eval harness | `screech eval retrieval / answer / web` | Benchmark corpus infrastructure for the fixture library |
| CLI ergonomics | `screech <verb> <object>`, cheatsheet, `doctor` | Direct template for the OSS CLI (`eventcontracts <verb>`) |

The pivot isn't "build ForgeTrace from scratch." It's: **extract the change-assurance slice as a standalone OSS repo, keep screech-v2 as the private brain.** Screech stays the personal-knowledge / thinking partner; the OSS project becomes the public artifact.

## What NOT to build

Recorded to prevent scope drift:

- Generic multi-agent framework
- Another MCP gateway, registry, or proxy
- Agent memory / RAG framework
- Broad "AI business copilot"
- Local LLM desktop wrapper
- Generalized observability platform
- "AI app builder" / SaaS reverse-engineering tool
- Cross-tenant benchmarking in v1 (comes later, opt-in only, with a real EU data-governance story)
- Graph visualizer as v1 feature (reports first — visuals only after we know which questions users ask)

## What "success" looks like at each horizon

**Day 10:** 12-15 conversations logged. Go/no-go decision made against the tracker matrix. If GO: 3 verbal pilot commits + 1 signed audit SOW.

**Day 30:** First paid audit delivered ($6-9k banked). v0.1 of the OSS CI action exists as a private artifact — running against one design partner's repo. LinkedIn profile driving 5+ inbound DMs/week.

**Day 90:** OSS repo public. 2-3 paid audits completed ($15-25k banked). One Tier 2 engagement signed ($15-22k). Consulting run-rate approaching $10k/mo.

**Day 180:** OSS at 500+ stars OR 10+ install signals from serious teams. First hosted control plane conversations. Revenue $10-15k/mo from consulting stack. Decision point on whether to double down on hosted product or stay consulting-native.

## Open questions parked for later

Recorded so they don't clutter the tactical execution:

1. **Naming.** "ForgeTrace" is Perplexity's placeholder. "EventContracts" is descriptive but generic. "eda-assurance" is the policy-pack name I've used in mocks. Decide by day 30 — after the pattern has more clarity from real interviews.
2. **License.** Apache-2.0 vs MIT vs BUSL. Apache-2.0 for maximum enterprise adoption; BUSL if we're serious about hosted revenue defense. Revisit before OSS public launch.
3. **Legal entity.** Currently invoicing as an individual is fine for the first 2-3 audits. Register an EU LLC (Romania SRL) before crossing €5k in a quarter for VAT + tax cleanliness.
4. **Design-partner IP terms.** Tier 2 engagement funds v0.1 of an OSS tool. Contract needs a clear "policy pack customization is client-owned; the underlying engine is Apache-2.0 OSS" clause. Draft before the first Tier 2 SOW.
5. **Anthropic/OpenAI relationship.** The value prop of a deterministic gate over LLM output is arguably *complementary* to their coding-agent products. Worth exploring co-marketing after 3 real customers exist — not before.

## References

- [Perplexity: initial OSS idea generation](https://www.perplexity.ai/search/e005fde6-f9c0-4544-956d-9272a767b870)
- [Perplexity: graphs and ontologies](https://www.perplexity.ai/search/25aa1fd0-43f5-4540-9548-028b8408b1a8)
- [Perplexity: moat / Change Passport](https://www.perplexity.ai/search/17bfdac7-be06-44ec-9e32-883b63540fa3)
- LoopBudget post-mortem — [memory:projects.loopbudget.domain_correction]
- Screech-v2 workspace map — private local repo, not in this tree
- Emanra / event-catalog / RCA-MCP prior work — [memory:projects.startup.emanra], [memory:work.projects.mcp_server_rca]
