import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function NutritionDetail({ logs }) {
  const nutritionLogs = logs
    .filter(l => l.type === 'nutrition')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-14)

  const chartData = nutritionLogs.map(l => ({
    date: l.date.slice(5),
    Protein: l.protein_met ? 1 : 0,
    Fueling: l.fueling_met ? 1 : 0,
  }))

  const proteinDays = nutritionLogs.filter(l => l.protein_met).length
  const total = nutritionLogs.length || 1

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-green-700">{Math.round(proteinDays / total * 100)}%</p>
          <p className="text-sm text-green-600 mt-1">Protein Target Adherence</p>
          <p className="text-xs text-gray-400 mt-0.5">last {nutritionLogs.length} logged days</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-blue-700">{nutritionLogs.filter(l => l.fueling_met).length}</p>
          <p className="text-sm text-blue-600 mt-1">Activity Fueling Days Met</p>
          <p className="text-xs text-gray-400 mt-0.5">this phase</p>
        </div>
      </div>
      {chartData.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Daily Adherence (last 14 days)</h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={false} domain={[0, 1]} />
                <Tooltip formatter={v => v === 1 ? 'Yes' : 'No'} />
                <Legend />
                <Bar dataKey="Protein" fill="#22c55e" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Fueling" fill="#3b82f6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
        <p className="font-medium mb-2">Phase 1 Nutrition Focus</p>
        <ul className="space-y-1 text-gray-500 text-sm">
          <li>· Daily protein target (amount TBD — to be set with Louis)</li>
          <li>· Fueling rehearsal on all rucks</li>
          <li>· Hydration + electrolyte strategy in development</li>
        </ul>
      </div>
    </div>
  )
}
