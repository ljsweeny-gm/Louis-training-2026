import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function groupByWeek(logs, types) {
  const weeks = {}
  logs.filter(l => types.includes(l.type) && l.done).forEach(l => {
    const d = new Date(l.date)
    const monday = new Date(d)
    monday.setDate(d.getDate() - (d.getDay() === 0 ? 6 : d.getDay() - 1))
    const key = monday.toISOString().slice(5, 10)
    if (!weeks[key]) weeks[key] = { week: key, yoga: 0, qigong: 0 }
    weeks[key][l.type]++
  })
  return Object.values(weeks).sort((a, b) => a.week.localeCompare(b.week))
}

export default function BodyControlDetail({ logs }) {
  const weeklyData = groupByWeek(logs, ['yoga', 'qigong'])

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Sessions per Week</h3>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="yoga" fill="#a855f7" radius={[4, 4, 0, 0]} name="Yoga" />
              <Bar dataKey="qigong" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Qigong" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-400 mt-2">Targets: Yoga 2–3x/week · Qigong daily</p>
      </div>
    </div>
  )
}
