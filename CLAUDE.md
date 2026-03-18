# Louis Training 2026 - Project Instructions

## On every session start
1. Read `todo.md` — current task state
2. Read `FEATURES.md` — master feature request list
3. If either file is missing, recreate from context before doing anything else

## Key files
- `todo.md` — active task state (keep in sync with TodoWrite tool)
- `FEATURES.md` — running list of feature requests (update as things are added/completed)
- `src/hooks/useLogs.js` — fetches logs + benchmarks from Google Sheets API
- `src/utils/stats.js` — pure functions for filtering/aggregating logs
- `src/components/SummaryDashboard.jsx` — main summary view with week table
- `.env` — local env vars (VITE_SHEETS_API_URL) — never commit this

## Important known facts
- Data backend is Google Sheets via Apps Script (doGet/doPost)
- Sheets returns dates as ISO strings (e.g. 2026-03-09T08:00:00.000Z) — use parseDate() in stats.js
- Sheets returns booleans as actual booleans or strings — use isDone() in stats.js
- App is deployed to GitHub Pages at https://ljsweeny-gm.github.io/Louis-training-2026/
- VITE_SHEETS_API_URL must be set as a GitHub repo secret for deployed builds to fetch data
- Project canonical location is C:/Projects/Wells Fitness/Louis-training-2026 — NEVER edit files in H:/My Drive or any Google Drive path. If you find yourself reading/editing files from H:/My Drive, stop and redirect to C:/Projects immediately.

## Git workflow rules
- Before running any git commands, explain what they do and why in plain English
- Group related git actions together and describe them as a unit (e.g. "I'm going to stage these 3 files and commit them as one logical change")
- Always show what files will be committed before committing
- Never push without explicit user confirmation
- Use this as a teaching opportunity — explain concepts like staging, commits, remotes when relevant
- Only commit at logical checkpoints — not after every change. Good triggers: a feature works end-to-end, before deploying, before a major refactor

## Activity types
- ruck, run, strength, yoga, nutrition (qigong was removed)
- All 5 types are active — run was added with distance_miles and elevation_ft fields

## launch.json note
- `.claude/launch.json` has an explicit `cwd` pointing to C:/Projects/Wells Fitness/Louis-training-2026
- NEVER remove the `cwd` field — without it the dev server may run from H:/My Drive/ (Google Drive sync copy) and edits will appear to not take effect
