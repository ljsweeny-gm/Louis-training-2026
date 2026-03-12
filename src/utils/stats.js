function isDone(done) {
  if (typeof done === 'boolean') return done
  if (typeof done === 'string') return done.toLowerCase() === 'true'
  return !!done
}

function parseDate(date) {
  const dateStr = typeof date === 'string' ? date.split('T')[0] : date
  return new Date(dateStr)
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

export function currentWeekLogs(logs) {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  monday.setHours(0, 0, 0, 0)
  return logs.filter(l => parseDate(l.date) >= monday)
}
