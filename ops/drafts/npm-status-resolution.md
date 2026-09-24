# Resolution — human:npm-status (2026-09-24)

**Decision: ignore the npm ghost; ship via GitHub only.**

| Fact | Status |
| --- | --- |
| `package.json` | `"private": true`, `UNLICENSED` |
| README | Documents Action `uses: lucianlature/eda-assurance@main`, not npm install |
| npm registry | `@lucianlature/eda-assurance@0.0.1` still exists (published 2026-09-21) |
| `npm deprecate` | Failed here (auth/404 on PUT) — Lucian can deprecate/unpublish from a logged-in npm when convenient |

No further publish to npm. Action consumers clone/use the GitHub repo. Queue item → `later`.
