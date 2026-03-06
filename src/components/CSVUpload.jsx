import { useRef } from 'react'
import { parseCSV } from '../utils/csvParser'

export default function CSVUpload({ onImport }) {
  const inputRef = useRef()

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const logs = parseCSV(ev.target.result)
      onImport(logs)
      e.target.value = ''
    }
    reader.readAsText(file)
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 border border-dashed border-gray-300 rounded-xl">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-700">Import workout data</p>
        <p className="text-xs text-gray-400 mt-0.5">CSV columns: date, type, duration_min, pack_weight_lbs, distance_miles, elevation_ft, rpe, experience, notes</p>
      </div>
      <button
        onClick={() => inputRef.current.click()}
        className="px-4 py-2 bg-white border border-gray-300 hover:border-gray-400 text-sm text-gray-700 rounded-lg transition-colors whitespace-nowrap"
      >
        Choose CSV
      </button>
      <input ref={inputRef} type="file" accept=".csv" onChange={handleFile} className="hidden" />
    </div>
  )
}
