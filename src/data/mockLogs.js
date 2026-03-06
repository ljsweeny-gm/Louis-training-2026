// Sample data spanning Feb 24 – Mar 6, 2026 (Phase 1 start)
// Includes a mix of all activity types with some gaps (realistic)
export const MOCK_LOGS = [
  // Week of Feb 24
  { id: 'm1', date: '2026-02-24', type: 'strength', done: true, rpe: 6, experience: 3, notes: 'First session, learning movements', duration_min: 30 },
  { id: 'm2', date: '2026-02-24', type: 'qigong', done: true, rpe: null, experience: 4, notes: '', duration_min: 10 },
  { id: 'm3', date: '2026-02-25', type: 'ruck', done: true, rpe: 6, experience: 4, notes: 'Mt Si baseline — felt steady', duration_min: 180, pack_weight_lbs: 10, distance_miles: 8.0, elevation_ft: 3150 },
  { id: 'm4', date: '2026-02-25', type: 'qigong', done: true, rpe: null, experience: 5, notes: '', duration_min: 10 },
  { id: 'm5', date: '2026-02-26', type: 'yoga', done: true, rpe: null, experience: 4, notes: '', duration_min: 25 },
  { id: 'm6', date: '2026-02-26', type: 'qigong', done: true, rpe: null, experience: 4, notes: '', duration_min: 10 },
  { id: 'm7', date: '2026-02-27', type: 'strength', done: true, rpe: 7, experience: 4, notes: '', duration_min: 30 },
  { id: 'm8', date: '2026-02-27', type: 'qigong', done: true, rpe: null, experience: 3, notes: 'tired', duration_min: 10 },
  { id: 'm9', date: '2026-02-28', type: 'qigong', done: true, rpe: null, experience: 4, notes: '', duration_min: 10 },
  { id: 'm10', date: '2026-03-01', type: 'ruck', done: true, rpe: 5, experience: 4, notes: 'Home to park loop', duration_min: 75, pack_weight_lbs: 12, distance_miles: 6.0, elevation_ft: 200 },
  { id: 'm11', date: '2026-03-01', type: 'qigong', done: true, rpe: null, experience: 4, notes: '', duration_min: 10 },
  { id: 'm12', date: '2026-03-02', type: 'yoga', done: true, rpe: null, experience: 5, notes: 'good session', duration_min: 28 },
  { id: 'm13', date: '2026-03-02', type: 'qigong', done: true, rpe: null, experience: 5, notes: '', duration_min: 10 },
  // Week of Mar 3
  { id: 'm14', date: '2026-03-03', type: 'strength', done: true, rpe: 7, experience: 4, notes: '', duration_min: 32 },
  { id: 'm15', date: '2026-03-03', type: 'qigong', done: true, rpe: null, experience: 4, notes: '', duration_min: 10 },
  { id: 'm16', date: '2026-03-04', type: 'ruck', done: true, rpe: 6, experience: 4, notes: 'Added a hill loop', duration_min: 80, pack_weight_lbs: 12, distance_miles: 5.8, elevation_ft: 350 },
  { id: 'm17', date: '2026-03-04', type: 'qigong', done: true, rpe: null, experience: 4, notes: '', duration_min: 10 },
  { id: 'm18', date: '2026-03-05', type: 'yoga', done: true, rpe: null, experience: 3, notes: 'a bit tired', duration_min: 20 },
  { id: 'm19', date: '2026-03-05', type: 'qigong', done: false, rpe: null, experience: null, notes: 'skipped', duration_min: 0 },
  { id: 'm20', date: '2026-03-06', type: 'nutrition', done: true, rpe: null, experience: 4, notes: 'hit protein target', duration_min: null, protein_met: true, fueling_met: false },
]

// Benchmark history (separate from regular logs)
export const MOCK_BENCHMARKS = [
  { id: 'b1', date: '2026-02-25', route: 'mt-si', pack_weight_lbs: 10, duration_min: 180, elevation_ft: 3150, distance_miles: 8.0, rpe: 6, notes: 'Phase 1 baseline' },
]
