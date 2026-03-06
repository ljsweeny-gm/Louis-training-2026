import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

function groupByWeek(logs, type) {
  const weeks = {}
  logs.filter(l => l.type === type && l.done).forEach(l => {
    const d = new Date(l.date)
    const monday = new Date(d)
    monday.setDate(d.getDate() - (d.getDay() === 0 ? 6 : d.getDay() - 1))
    const key = monday.toISOString().slice(5, 10)
    weeks[key] = (weeks[key] || []).concat(l)
  })
  return Object.entries(weeks).sort().map(([week, entries]) => ({
    week,
    sessions: entries.length,
    avgRpe: entries.filter(e => e.rpe).length
      ? Math.round(entries.filter(e => e.rpe).reduce((s, e) => s + e.rpe, 0) / entries.filter(e => e.rpe).length * 10) / 10
      : null,
  }))
}

export default function StrengthDetail({ logs }) {
  const weeklyData = groupByWeek(logs, 'strength')

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Sessions per Week</h3>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 3]} ticks={[0, 1, 2, 3]} />
              <Tooltip />
              <Bar dataKey="sessions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-400 mt-2">Target: 2 sessions/week</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">RPE Trend</h3>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[1, 10]} />
              <Tooltip />
              <Line type="monotone" dataKey="avgRpe" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} name="Avg RPE" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
