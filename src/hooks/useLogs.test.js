import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useLogs } from './useLogs'

beforeEach(() => {
  localStorage.clear()
})

describe('useLogs', () => {
  it('starts with empty logs', () => {
    const { result } = renderHook(() => useLogs())
    expect(result.current.logs).toEqual([])
  })

  it('adds a log entry', () => {
    const { result } = renderHook(() => useLogs())
    act(() => {
      result.current.addLog({
        date: '2026-03-06',
        type: 'ruck',
        done: true,
        rpe: 7,
        experience: 4,
        notes: 'felt good',
        duration_min: 90,
        pack_weight_lbs: 15,
        distance_miles: 4.2,
        elevation_ft: 800,
      })
    })
    expect(result.current.logs).toHaveLength(1)
    expect(result.current.logs[0].type).toBe('ruck')
    expect(result.current.logs[0].id).toBeDefined()
  })

  it('persists logs to localStorage', () => {
    const { result } = renderHook(() => useLogs())
    act(() => {
      result.current.addLog({ date: '2026-03-06', type: 'strength', done: true, rpe: 6, experience: 3, notes: '', duration_min: 30 })
    })
    const stored = JSON.parse(localStorage.getItem('louis-training-logs'))
    expect(stored).toHaveLength(1)
  })

  it('loads logs from localStorage on mount', () => {
    const existing = [{ id: 'abc', date: '2026-03-01', type: 'yoga', done: true, rpe: null, experience: 5, notes: '', duration_min: 25 }]
    localStorage.setItem('louis-training-logs', JSON.stringify(existing))
    const { result } = renderHook(() => useLogs())
    expect(result.current.logs).toHaveLength(1)
    expect(result.current.logs[0].id).toBe('abc')
  })

  it('deletes a log entry', () => {
    const { result } = renderHook(() => useLogs())
    act(() => {
      result.current.addLog({ date: '2026-03-06', type: 'qigong', done: true, rpe: null, experience: 4, notes: '', duration_min: 10 })
    })
    const id = result.current.logs[0].id
    act(() => {
      result.current.deleteLog(id)
    })
    expect(result.current.logs).toHaveLength(0)
  })
})
