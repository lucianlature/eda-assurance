# Interview tracker — event-contract validation

Update after every call. Sync to Google Sheets / Airtable / Notion if you prefer — the columns below map 1:1 (paste the table into Sheets, first row becomes headers).

## Scoring rubric

Each interview gets 5 scores (0-2 each). Total 0-10.

| Score | Question | 0 | 1 | 2 |
| --- | --- | --- | --- | --- |
| **PAIN** | Q1 — real recent incident? | Can't name one in 3 min | Vague, "sort of" | Specific, painful, cost real time/money |
| **GAP** | Q2 — existing tooling? | Solved by existing tools they trust | Partially covered | Nothing catches it today |
| **FIT** | Q4 — would a CI gate matter? | "Meh, we handle it in review" | "Nice to have" | "That would have saved us [X]" |
| **AUTHORITY** | Q5 — buying power? | No say + can't refer up | Can influence | Can buy or has direct line to buyer |
| **COMMIT** | Q6 — pilot in 30 days? | Won't or hedges | "Maybe if you build X" | "Yes send me the link when ready" |

**Interpretation**
- **0-4** — Wrong ICP or wrong wedge. Don't pursue.
- **5-7** — Warm. Nurture with content, revisit month 2.
- **8-10** — Hot. Send SOW within 4 hours. Ask directly about audit.

## Tracker table

Copy this block into Sheets/Airtable (tab-separated). Add rows as calls happen.

```
name	company	role	stack	source	outreach_date	call_date	PAIN	GAP	FIT	AUTHORITY	COMMIT	TOTAL	pilot_commit	audit_interest	referral	next_action	notes
																	
																	
																	
```

## Live tally (update daily)

Copy this section into a doc; recompute at end of each day.

```
Total conversations:     ___ / 15
"Real incident" (PAIN≥1): ___
Score ≥ 8 (hot):          ___
Score 5-7 (warm):         ___
Pilot commits:            ___
Paid-audit interest:      ___
Referrals given:          ___
```

## Go/no-go decision (day 10)

Compute from tally above:

| If... | Then... |
| --- | --- |
| `hot ≥ 3` AND `pilot_commits ≥ 3` | **BUILD v0.1 weeks 2-4** · pick top 3 as design partners |
| `PAIN ≥ 1 count ≥ 5` AND `pilot_commits = 0` | **AUDIT-ONLY** · ship consulting, park OSS |
| `PAIN ≥ 1 count < 5` OR `hot = 0` | **KILL the wedge** · repick |
| `audit_interest ≥ 2` AND revenue-urgent | **CONSULTING FIRST** · take the money, OSS becomes marketing |

## Notes column — what to capture

For every call, log:

1. **The one-line incident** they described in Q1 (verbatim if possible — content marketing gold)
2. **Their current tooling stack** for schema/contract review
3. **The specific evidence** they'd need to trust a CI gate
4. **Buying context** — budget owner, procurement threshold, fiscal year
5. **Referrals** — who else should I talk to?
6. **Follow-up hooks** — did they mention an upcoming migration? A postmortem? A conference?

## Referral tracking

Anyone who says "you should talk to X" goes here immediately — highest-conversion source in the whole plan.

```
referrer	referred_to	their_role	their_company	intro_asked?	intro_made?	call_scheduled?	notes
											
											
```

**Rule:** ask for the intro *on the call*, not in follow-up. "Would you mind emailing them right now while we're on?" converts 5x vs "could you send an intro email later?"

## Objection log (research asset)

Every objection you hear goes here — this is how you refine the pitch and later build the FAQ page.

```
date	objection	from_whom	your_response	worked?	better_response
					
					
```

## What "kill the wedge" actually means

If day 10 says kill: repick from these three alternatives (from the strategy conversation):

1. **Broader "AI change intelligence"** — wider surface, wider competition, but reuses the same policy engine
2. **Architecture consulting for AI-assisted delivery** — no OSS, pure services, fastest revenue
3. **Something else entirely** — schedule a strategy re-think, don't sunk-cost into a bad wedge

Don't rationalize into "let me try 10 more interviews." If the pain isn't sharp in 15 calls, it isn't sharp.
