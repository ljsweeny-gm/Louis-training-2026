# Louis Training Tracker — Design Document
*2026-03-06*

## Goal

A static website hosted on GitHub Pages for tracking Louis's North Cascades backpacking training (March–August 2026). Both Wells and Louis can access it. Louis logs activities directly; data persists in his browser via localStorage. CSV upload feeds ruck/workout data into charts.

## Tech Stack

- **React + Vite** — component-based, builds to static files
- **GitHub Pages** — hosting, accessible to both parties
- **localStorage** — persists Louis's log entries across sessions, no backend needed
- **CSV upload** — for ruck and workout data (pack weight, distance, pace, elevation)
- **Recharts or Chart.js** — for progression charts

## Data Model

### Log Entry (localStorage)
```json
{
  "id": "uuid",
  "date": "2026-03-06",
  "type": "ruck | strength | yoga | qigong | nutrition",
  "done": true,
  "rpe": 7,
  "experience": 4,
  "notes": "optional free text",
  "duration_min": 90
}
```

Ruck extras: `pack_weight_lbs`, `distance_miles`, `elevation_ft`
Nutrition extras: `protein_met` (bool), `fueling_met` (bool)

### CSV Format (for upload)
One row per session. Columns: `date, type, duration_min, pack_weight_lbs, distance_miles, elevation_ft, rpe, experience, notes`

## Page Structure

Single scrolling page. Sticky nav with anchor links and a Log Activity button.

```
[Summary] [Rucking] [Strength] [Body Control] [Nutrition] [+ Log Activity]
```

### Summary Dashboard
- 4 pillar cards (Rucking, Strength, Body Control, Nutrition)
  - Each: this week's fidelity vs target, color indicator (green/yellow/red)
- Total workout time: this week + phase-to-date
- Next benchmark card: days until next Mt Si or city loop, last result

### Rucking Detail
- Pack weight progression chart (over time)
- Distance/duration over time
- Benchmark timeline: past Mt Si + Seattle City Loop attempts, next scheduled

### Strength Detail
- Sessions/week vs target (2x)
- RPE trend over time

### Body Control Detail
- Yoga sessions/week vs target
- Qigong sessions/week vs target

### Nutrition Detail
- Daily protein adherence %
- Fueling compliance on ruck/benchmark days

### Log Activity Modal
Accessible from nav button or any pillar's Log button.
1. Pick activity type
2. Mark done, RPE (1–10 slider), experience face (5-face pediatric scale), optional notes
3. Rucks: additional fields for pack weight, distance, elevation

Note: Nutrition entries omit done toggle and duration; protein_met/fueling_met toggles serve as completion signals.

## Training Context

### Four Pillars
- **Rucking** — 2 hrs/week, start 10–15 lbs, build to 25–30 lbs
- **Strength** — 2×30 min/week
- **Body Control** — Yoga 2–3x/week (60 min total), Qigong ~daily (10 min)
- **Nutrition** — Protein targets, fueling on long days

### Three Phases
- Phase 1: Foundation (March–April)
- Phase 2: Build (May–July)
- Phase 3: Peak + Taper (August)

### Benchmarks
- Seattle City Loop — Phase 1 baseline, Phase 2 progress check
- Mount Si — Phase 1 baseline, repeated through Phase 2, final in Phase 3

## Deployment

- GitHub Pages via `gh-pages` package
- Dev: `npm run dev`
- Deploy: `npm run build && npm run deploy`
