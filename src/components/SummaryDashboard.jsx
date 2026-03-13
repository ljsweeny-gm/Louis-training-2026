import { currentWeekLogs, totalMinutes, weeklyFidelity } from '../utils/stats'

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
  const dayIndices = new Set()
  logs
    .filter(l => l.type === type && l.done)
    .forEach(l => {
      const dateStr = typeof l.date === 'string' ? l.date.split('T')[0] : l.date
      const date = new Date(dateStr)
      dayIndices.add(date.getDay())
    })
  if (dayIndices.size === 0) return 'none'
  return Array.from(dayIndices)
    .sort((a, b) => a - b)
    .map(i => dayNames[i])
    .join(', ')
}

export default function SummaryDashboard({ logs, benchmarks = [] }) {
  const weekLogs = currentWeekLogs(logs)
  const totalMins = totalMinutes(weekLogs)
  const phaseMins = totalMinutes(logs)

  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">This Week</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{Math.round(totalMins / 60 * 10) / 10}<span className="text-base font-normal text-gray-500 ml-1">hrs</span></p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Phase Total</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{Math.round(phaseMins / 60 * 10) / 10}<span className="text-base font-normal text-gray-500 ml-1">hrs</span></p>
        </div>
      </div>

      {/* Week activity summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3 font-medium">This Week</p>
        <div className="space-y-2">
          {PILLAR_CONFIG.map(pillar => {
            const { completed, target } = weeklyFidelity(weekLogs, pillar.key, TARGETS[pillar.key])
            const days = getDayLabels(weekLogs, pillar.key)
            return (
              <div key={pillar.key} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 font-medium">{pillar.emoji} {pillar.label}</span>
                <span className="text-gray-600">{completed}/{target} ({days})</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Next benchmark */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-xs text-amber-700 uppercase tracking-wide font-medium">Next Benchmark</p>
        <p className="text-gray-700 mt-1 font-medium">Mount Si — date TBD</p>
        <p className="text-sm text-gray-500 mt-0.5">Last: Feb 25 · 10 lbs · 180 min · RPE 6</p>
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
