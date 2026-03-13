function isDone(done) {
  if (typeof done === 'boolean') return done
  if (typeof done === 'string') return done.toLowerCase() === 'true'
  return !!done
}

// Parse date string to local midnight (avoids UTC timezone shift)
function parseDate(date) {
  const dateStr = typeof date === 'string' ? date.split('T')[0] : String(date)
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function totalMinutes(logs, type = null) {
  return logs
    .filter(l => isDone(l.done) && (type === null || l.type === type))
    .reduce((sum, l) => sum + (Number(l.duration_min) || 0), 0)
}

export function weeklyFidelity(logs, type, target) {
  const completed = logs.filter(l => isDone(l.done) && l.type === type).length
  return { completed, target }
}

function getMondayOf(date) {
  const d = new Date(date)
  const dayOfWeek = d.getDay()
  d.setDate(d.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  d.setHours(0, 0, 0, 0)
  return d
}

export function currentWeekLogs(logs) {
  const monday = getMondayOf(new Date())
  return logs.filter(l => parseDate(l.date) >= monday)
}

export function previousWeekLogs(logs) {
  const thisMonday = getMondayOf(new Date())
  const lastMonday = new Date(thisMonday)
  lastMonday.setDate(thisMonday.getDate() - 7)
  return logs.filter(l => {
    const d = parseDate(l.date)
    return d >= lastMonday && d < thisMonday
  })
}
