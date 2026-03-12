import { currentWeekLogs, previousWeekLogs, totalMinutes, weeklyFidelity } from '../utils/stats'

const TARGETS = {
  ruck: 2,
  strength: 2,
  yoga: 2,
}

const PILLAR_CONFIG = [
  { key: 'ruck', label: 'Rucking', emoji: '🎒', color: 'orange' },
  { key: 'strength', label: 'Strength', emoji: '💪', color: 'blue' },
  { key: 'yoga', label: 'Yoga', emoji: '🧘', color: 'purple' },
]

const COLOR_MAP = {
  orange: { card: 'bg-orange-50 border-orange-200', label: 'text-orange-700', bar: 'bg-orange-400' },
  blue: { card: 'bg-blue-50 border-blue-200', label: 'text-blue-700', bar: 'bg-blue-400' },
  purple: { card: 'bg-purple-50 border-purple-200', label: 'text-purple-700', bar: 'bg-purple-400' },
}

function fidelityColor(completed, target) {
  const pct = completed / target
  if (pct >= 1) return 'text-green-600'
  if (pct >= 0.5) return 'text-yellow-600'
  return 'text-red-500'
}

function getDayLabels(logs, type) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const days = []
  logs
    .filter(l => l.type === type && l.done)
    .forEach(l => {
      const dateStr = typeof l.date === 'string' ? l.date.split('T')[0] : l.date
      const [y, m, d] = dateStr.split('-').map(Number)
      const date = new Date(y, m - 1, d)
      const name = dayNames[date.getDay()]
      if (!days.includes(name)) days.push(name)
    })
  return days.join(', ') || 'none'
}

function getWeekStart() {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  return monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function getNextBenchmark(benchmarks) {
  if (!benchmarks.length) return null
  const now = new Date()
  const future = benchmarks
    .filter(b => new Date(b.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
  if (future.length) return future[0]
  return benchmarks.sort((a, b) => new Date(b.date) - new Date(a.date))[0]
}

function formatBenchmarkDate(dateStr) {
  const d = typeof dateStr === 'string' ? dateStr.split('T')[0] : dateStr
  const [y, m, day] = d.split('-').map(Number)
  const date = new Date(y, m - 1, day)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function SummaryDashboard({ logs, benchmarks = [] }) {
  const weekLogs = currentWeekLogs(logs)
  const prevWeekLogs = previousWeekLogs(logs)
  const totalMins = totalMinutes(weekLogs)
  const phaseMins = totalMinutes(logs)
  const nextBm = getNextBenchmark(benchmarks)

  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">This Week ({getWeekStart()})</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{Math.round(totalMins / 60 * 10) / 10}<span className="text-base font-normal text-gray-500 ml-1">hrs</span></p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Phase Total</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{Math.round(phaseMins / 60 * 10) / 10}<span className="text-base font-normal text-gray-500 ml-1">hrs</span></p>
        </div>
      </div>

      {/* Week comparison table */}
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-medium">Week Comparison</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-1 px-2 font-medium text-gray-700">Pillar</th>
              <th className="text-center py-1 px-2 font-medium text-gray-700">This Week</th>
              <th className="text-center py-1 px-2 font-medium text-gray-700">Last Week</th>
            </tr>
          </thead>
          <tbody>
            {PILLAR_CONFIG.map(pillar => {
              const curr = weeklyFidelity(weekLogs, pillar.key, TARGETS[pillar.key])
              const prev = weeklyFidelity(prevWeekLogs, pillar.key, TARGETS[pillar.key])
              const currDays = getDayLabels(weekLogs, pillar.key)
              return (
                <tr key={pillar.key} className="border-b last:border-0">
                  <td className="py-1 px-2 text-gray-700">{pillar.emoji} {pillar.label}</td>
                  <td className="text-center py-1 px-2 text-gray-800 font-medium">{curr.completed}/{curr.target} ({currDays})</td>
                  <td className="text-center py-1 px-2 text-gray-600">{prev.completed}/{prev.target}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Next benchmark */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-xs text-amber-700 uppercase tracking-wide font-medium">Next Benchmark</p>
        {nextBm ? (
          <>
            <p className="text-gray-700 mt-1 font-medium">
              {(nextBm.route || 'TBD').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} — {formatBenchmarkDate(nextBm.date)}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              Last: {formatBenchmarkDate(nextBm.date)} · {nextBm.pack_weight_lbs} lbs · {nextBm.duration_min} min · RPE {nextBm.rpe}
            </p>
          </>
        ) : (
          <p className="text-gray-700 mt-1 font-medium">No benchmarks yet</p>
        )}
      </div>

      {/* Pillar cards */}
      <div className="grid grid-cols-2 gap-4">
        {PILLAR_CONFIG.map(pillar => {
          const { completed, target } = weeklyFidelity(weekLogs, pillar.key, TARGETS[pillar.key])
          const pct = Math.min(completed / target, 1)
          const c = COLOR_MAP[pillar.color]
          return (
            <div key={pillar.key} className={`${c.card} border rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{pillar.emoji} {pillar.label}</span>
                <span className={`text-sm font-bold ${fidelityColor(completed, target)}`}>
                  {completed}/{target}
                </span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <div className={`h-full ${c.bar} rounded-full transition-all`} style={{ width: `${pct * 100}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
