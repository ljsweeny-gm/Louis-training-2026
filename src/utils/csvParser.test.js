import { describe, it, expect } from 'vitest'
import { parseCSV } from './csvParser'

const SAMPLE_CSV = `date,type,duration_min,pack_weight_lbs,distance_miles,elevation_ft,rpe,experience,notes
2026-03-04,ruck,90,15,4.2,800,7,4,felt strong
2026-03-03,strength,30,,,, 6,3,legs day
2026-03-02,yoga,25,,,,, 5,good flow`

describe('parseCSV', () => {
  it('parses rows into log objects', () => {
    const result = parseCSV(SAMPLE_CSV)
    expect(result).toHaveLength(3)
  })

  it('parses ruck fields correctly', () => {
    const result = parseCSV(SAMPLE_CSV)
    const ruck = result[0]
    expect(ruck.type).toBe('ruck')
    expect(ruck.distance_miles).toBe(4.2)
    expect(ruck.pack_weight_lbs).toBe(15)
    expect(ruck.elevation_ft).toBe(800)
    expect(ruck.rpe).toBe(7)
    expect(ruck.experience).toBe(4)
    expect(ruck.notes).toBe('felt strong')
  })

  it('handles empty numeric fields as null', () => {
    const result = parseCSV(SAMPLE_CSV)
    expect(result[1].pack_weight_lbs).toBeNull()
    expect(result[1].distance_miles).toBeNull()
  })

  it('returns empty array for empty input', () => {
    expect(parseCSV('')).toEqual([])
    expect(parseCSV('date,type,duration_min\n')).toEqual([])
  })
})
