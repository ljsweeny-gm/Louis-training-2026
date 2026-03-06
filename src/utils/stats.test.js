import { describe, it, expect } from 'vitest'
import { totalMinutes, weeklyFidelity, currentWeekLogs } from './stats'

const LOGS = [
  { date: '2026-03-02', type: 'strength', done: true, duration_min: 30 },
  { date: '2026-03-03', type: 'ruck', done: true, duration_min: 90 },
  { date: '2026-03-04', type: 'yoga', done: true, duration_min: 25 },
  { date: '2026-03-05', type: 'qigong', done: true, duration_min: 10 },
  { date: '2026-03-05', type: 'qigong', done: false, duration_min: 0 },
]

describe('totalMinutes', () => {
  it('sums duration for done logs of a type', () => {
    expect(totalMinutes(LOGS, 'ruck')).toBe(90)
    expect(totalMinutes(LOGS, 'qigong')).toBe(10)
  })

  it('sums all types when no type given', () => {
    expect(totalMinutes(LOGS)).toBe(155)
  })
})

describe('weeklyFidelity', () => {
  it('counts completed sessions vs target', () => {
    const result = weeklyFidelity(LOGS, 'strength', 2)
    expect(result.completed).toBe(1)
    expect(result.target).toBe(2)
  })
})
