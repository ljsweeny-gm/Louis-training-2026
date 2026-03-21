import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const API_URL = import.meta.env.VITE_SHEETS_API_URL

const ZONE_COLORS = ['#9ca3af', '#60a5fa', '#4ade80', '#fb923c', '#f87171']
const ZONE_LABELS = ['Z1 Recovery', 'Z2 Aerobic', 'Z3 Tempo', 'Z4 Threshold', 'Z5 Max']

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatPace(mpm) {
  if (!mpm) return '--'
  const mins = Math.floor(mpm)
  const secs = Math.round((mpm - mins) * 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function RunDetail() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)
  const [streams, setStreams] = useState(null)
  const [streamsLoading, setStreamsLoading] = useState(false)

  useEffect(() => {
    if (!API_URL) { setError('No API URL'); setLoading(false); return }
    fetch(`${API_URL}?action=strava_activities`)
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setActivities(data.activities || [])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  function selectActivity(activity) {
    setSelected(activity)
    setStreams(null)
    setStreamsLoading(true)
    fetch(`${API_URL}?action=strava_streams&id=${activity.id}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setStreams(data)
      })
      .catch(err => console.error('Streams error:', err))
      .finally(() => setStreamsLoading(false))
  }

  if (loading) return <p className="text-sm text-gray-400">Loading runs from Strava...</p>
  if (error) return <p className="text-sm text-red-400">Error: {error}</p>

  return (
    <div className="space-y-4">
      {/* Activity list */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {activities.map(a => (
          <button
            key={a.id}
            onClick={() => selectActivity(a)}
            className={`w-full text-left px-4 py-3 border-b last:border-0 flex items-center justify-between transition-colors ${
              selected?.id === a.id ? 'bg-red-50' : 'hover:bg-gray-50'
            }`}
          >
            <div>
              <p className="text-sm font-medium text-gray-800">{formatDate(a.date)}</p>
              <p className="text-xs text-gray-500">{a.distance_miles} mi · {a.duration_min} min · {a.elevation_ft} ft</p>
            </div>
            <div className="text-right">
              {a.avg_hr && (
                <p className="text-sm font-medium text-gray-700">{Math.round(a.avg_hr)} bpm avg</p>
              )}
              <p className="text-xs text-gray-400">{formatPace(a.duration_min / a.distance_miles)} /mi</p>
            </div>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="space-y-4">
          {/* Summary stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Distance', value: `${selected.distance_miles} mi` },
              { label: 'Time', value: `${selected.duration_min} min` },
              { label: 'Avg HR', value: selected.avg_hr ? `${Math.round(selected.avg_hr)} bpm` : '--' },
              { label: 'Elevation', value: `${selected.elevation_ft} ft` },
            ].map(s => (
              <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{s.label}</p>
                <p className="text-lg font-bold text-gray-800 mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>

          {streamsLoading && <p className="text-sm text-gray-400 text-center py-4">Loading HR data...</p>}

          {streams && (
            <>
              {/* HR chart */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-3">Heart Rate (bpm)</p>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={streams.chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <XAxis dataKey="t" hide />
                    <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(v) => [`${Math.round(v)} bpm`, 'HR']}
                      labelFormatter={() => ''}
                    />
                    <Line type="monotone" dataKey="hr" stroke="#f87171" dot={false} strokeWidth={1.5} connectNulls />
                    {streams.zones?.map((z, i) => (
                      <ReferenceLine key={i} y={z.min} stroke={ZONE_COLORS[i]} strokeDasharray="3 3" strokeOpacity={0.5} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Zone breakdown */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-3">HR Zones</p>
                <div className="space-y-2">
                  {[...streams.zoneBreakdown].reverse().map((z) => (
                    <div key={z.zone} className="flex items-center gap-3">
                      <span className="text-xs font-medium w-16 text-gray-600">{ZONE_LABELS[z.zone - 1]}</span>
                      <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${z.pct}%`, backgroundColor: ZONE_COLORS[z.zone - 1] }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-16 text-right">{z.pct}% · {formatTime(z.seconds)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pace chart */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-3">Pace (min/mi)</p>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={streams.chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <XAxis dataKey="t" hide />
                    <YAxis reversed domain={['auto', 'auto']} tick={{ fontSize: 11 }} tickFormatter={formatPace} />
                    <Tooltip
                      formatter={(v) => [formatPace(v), 'Pace']}
                      labelFormatter={() => ''}
                    />
                    <Line type="monotone" dataKey="pace" stroke="#60a5fa" dot={false} strokeWidth={1.5} connectNulls />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
