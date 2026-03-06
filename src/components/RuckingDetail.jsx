import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function RuckingDetail({ logs, benchmarks = [] }) {
  const rucks = logs
    .filter(l => l.type === 'ruck' && l.done)
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  const chartData = rucks.map(r => ({
    date: r.date.slice(5),
    'Pack (lbs)': r.pack_weight_lbs,
    'Distance (mi)': r.distance_miles,
    RPE: r.rpe,
  }))

  const benchmarkData = benchmarks.map(b => ({
    date: b.date.slice(5),
    route: b.route === 'mt-si' ? 'Mt Si' : 'City Loop',
    duration: b.duration_min,
    pack: b.pack_weight_lbs,
    rpe: b.rpe,
    notes: b.notes,
  }))

  return (
    <div className="space-y-8">
      {/* Pack weight progression */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Pack Weight Progression</h3>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit=" lbs" domain={[0, 35]} />
              <Tooltip />
              <Line type="monotone" dataKey="Pack (lbs)" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-400 mt-2">Target: build from 10–15 lbs → 25–30 lbs by August</p>
      </div>

      {/* Distance and effort */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Distance & Effort</h3>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} unit=" mi" />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="Distance (mi)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="RPE" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Benchmark timeline */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Benchmark History</h3>
        {benchmarkData.length === 0 ? (
          <p className="text-gray-400 text-sm">No benchmarks logged yet</p>
        ) : (
          <div className="space-y-3">
            {benchmarkData.map((b, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                <div className="w-16 text-center">
                  <p className="text-xs text-gray-500">{b.date}</p>
                  <p className="text-sm font-bold text-orange-600">{b.route}</p>
                </div>
                <div className="flex gap-6 text-sm">
                  <div><span className="text-gray-400">Pack:</span> <span className="font-medium">{b.pack} lbs</span></div>
                  <div><span className="text-gray-400">Time:</span> <span className="font-medium">{b.duration} min</span></div>
                  <div><span className="text-gray-400">RPE:</span> <span className="font-medium">{b.rpe}/10</span></div>
                </div>
                {b.notes && <p className="text-xs text-gray-400 ml-auto max-w-xs">{b.notes}</p>}
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-xs text-gray-500">📅 Next Mt Si — date TBD &nbsp;·&nbsp; Target pack: 15 lbs</p>
        </div>
      </div>
    </div>
  )
}
