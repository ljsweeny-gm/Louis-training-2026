const FACES = [
  { value: 1, emoji: '😢', label: 'Very Hard' },
  { value: 2, emoji: '😟', label: 'Hard' },
  { value: 3, emoji: '😐', label: 'OK' },
  { value: 4, emoji: '😊', label: 'Good' },
  { value: 5, emoji: '😄', label: 'Great' },
]

export default function FaceScale({ value, onChange }) {
  return (
    <div className="flex gap-2 justify-between">
      {FACES.map(face => (
        <button
          key={face.value}
          type="button"
          onClick={() => onChange(face.value)}
          className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all flex-1 ${
            value === face.value
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-2xl">{face.emoji}</span>
          <span className="text-xs text-gray-500 mt-1">{face.label}</span>
        </button>
      ))}
    </div>
  )
}
