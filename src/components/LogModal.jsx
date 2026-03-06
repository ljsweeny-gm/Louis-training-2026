import { useState } from 'react'
import FaceScale from './FaceScale'

const ACTIVITY_TYPES = [
  { value: 'ruck', label: 'Ruck', color: 'bg-orange-100 border-orange-400 text-orange-800' },
  { value: 'strength', label: 'Strength', color: 'bg-blue-100 border-blue-400 text-blue-800' },
  { value: 'yoga', label: 'Yoga', color: 'bg-purple-100 border-purple-400 text-purple-800' },
  { value: 'qigong', label: 'Qigong', color: 'bg-teal-100 border-teal-400 text-teal-800' },
  { value: 'nutrition', label: 'Nutrition', color: 'bg-green-100 border-green-400 text-green-800' },
]

function today() {
  return new Date().toISOString().slice(0, 10)
}

export default function LogModal({ onClose, onSave }) {
  const [type, setType] = useState(null)
  const [form, setForm] = useState({
    date: today(),
    done: true,
    rpe: 5,
    experience: 3,
    notes: '',
    duration_min: '',
    pack_weight_lbs: '',
    distance_miles: '',
    elevation_ft: '',
    protein_met: false,
    fueling_met: false,
  })

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSave() {
    if (!type) return
    const entry = {
      ...form,
      type,
      duration_min: form.duration_min === '' ? null : Number(form.duration_min),
      pack_weight_lbs: form.pack_weight_lbs === '' ? null : Number(form.pack_weight_lbs),
      distance_miles: form.distance_miles === '' ? null : Number(form.distance_miles),
      elevation_ft: form.elevation_ft === '' ? null : Number(form.elevation_ft),
    }
    onSave(entry)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Log Activity</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl leading-none">&times;</button>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={e => update('date', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Activity type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity</label>
            <div className="grid grid-cols-3 gap-2">
              {ACTIVITY_TYPES.map(a => (
                <button
                  key={a.value}
                  type="button"
                  onClick={() => setType(a.value)}
                  className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    type === a.value ? a.color : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {type && type !== 'nutrition' && (
            <>
              {/* Done toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => update('done', !form.done)}
                  className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
                    form.done
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-gray-200 text-gray-500'
                  }`}
                >
                  {form.done ? '✓ Completed' : 'Mark Complete'}
                </button>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                  <input
                    type="number"
                    value={form.duration_min}
                    onChange={e => update('duration_min', e.target.value)}
                    placeholder="e.g. 60"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* RPE — only for ruck and strength */}
              {(type === 'ruck' || type === 'strength') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rate of Perceived Exertion: <span className="font-bold text-green-700">{form.rpe}</span>/10
                  </label>
                  <input
                    type="range"
                    min="1" max="10" step="1"
                    value={form.rpe}
                    onChange={e => update('rpe', Number(e.target.value))}
                    className="w-full accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Easy (1)</span><span>Moderate (5)</span><span>Max (10)</span>
                  </div>
                </div>
              )}

              {/* Experience face scale */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How was it?</label>
                <FaceScale value={form.experience} onChange={v => update('experience', v)} />
              </div>

              {/* Ruck-specific fields */}
              {type === 'ruck' && (
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Pack (lbs)</label>
                    <input type="number" value={form.pack_weight_lbs} onChange={e => update('pack_weight_lbs', e.target.value)} placeholder="15" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Distance (mi)</label>
                    <input type="number" step="0.1" value={form.distance_miles} onChange={e => update('distance_miles', e.target.value)} placeholder="4.2" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Elevation (ft)</label>
                    <input type="number" value={form.elevation_ft} onChange={e => update('elevation_ft', e.target.value)} placeholder="800" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Nutrition-specific */}
          {type === 'nutrition' && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => update('protein_met', !form.protein_met)}
                className={`w-full py-3 rounded-lg border-2 font-medium transition-all ${form.protein_met ? 'border-green-500 bg-green-50 text-green-800' : 'border-gray-200 text-gray-600'}`}
              >
                {form.protein_met ? '✓' : '○'} Daily protein target met
              </button>
              <button
                type="button"
                onClick={() => update('fueling_met', !form.fueling_met)}
                className={`w-full py-3 rounded-lg border-2 font-medium transition-all ${form.fueling_met ? 'border-green-500 bg-green-50 text-green-800' : 'border-gray-200 text-gray-600'}`}
              >
                {form.fueling_met ? '✓' : '○'} Activity fueling target met
              </button>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How was it?</label>
                <FaceScale value={form.experience} onChange={v => update('experience', v)} />
              </div>
            </div>
          )}

          {/* Notes */}
          {type && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
              <textarea
                value={form.notes}
                onChange={e => update('notes', e.target.value)}
                rows={2}
                placeholder="How did it feel? Anything notable?"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
              />
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={!type}
            className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium rounded-lg transition-colors"
          >
            Save Activity
          </button>
        </div>
      </div>
    </div>
  )
}
