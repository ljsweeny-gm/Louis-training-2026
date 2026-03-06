const NUMERIC_FIELDS = ['duration_min', 'pack_weight_lbs', 'distance_miles', 'elevation_ft', 'rpe', 'experience']

export function parseCSV(text) {
  const lines = text.trim().split('\n').filter(Boolean)
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim())

  return lines.slice(1).map((line, i) => {
    const values = line.split(',').map(v => v.trim())
    const entry = { id: `csv-${i}-${Date.now()}` }
    headers.forEach((header, idx) => {
      const raw = values[idx] ?? ''
      if (NUMERIC_FIELDS.includes(header)) {
        entry[header] = raw === '' ? null : Number(raw)
      } else {
        entry[header] = raw
      }
    })
    entry.done = true
    return entry
  })
}
