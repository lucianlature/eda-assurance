---
name: night-shift
description: >-
  Run the unattended eda-assurance night cycle: scan fixtures and local
  clones, write the day inbox. Use when the user says night shift, night
  cycle, or leave it running.
---

# Night shift

1. Read `ops/CONTRACT.md`.
2. Run `node src/cli.ts night` from the repo root (or `assurance.night_shift`).
3. Paste the new `ops/INBOX.md` pending items.
4. Prefer work listed in `ops/NIGHT-PLAN.md` when present (article/demo truth over corpus extractors).
5. Do not mark queue items approved.
