import { useState } from 'react'
import NavBar from './components/NavBar'
import Section from './components/Section'
import { useLogs } from './hooks/useLogs'
import { MOCK_LOGS, MOCK_BENCHMARKS } from './data/mockLogs'

export default function App() {
  const [logModalOpen, setLogModalOpen] = useState(false)
  const { logs, addLog, deleteLog } = useLogs()

  // Merge localStorage logs with mock data for prototype
  const allLogs = [...MOCK_LOGS, ...logs]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <NavBar onLogClick={() => setLogModalOpen(true)} />
      <main>
        <Section id="summary" title="Summary">
          <p className="text-gray-500">Summary dashboard coming soon</p>
        </Section>
        <Section id="rucking" title="Rucking">
          <p className="text-gray-500">Rucking detail coming soon</p>
        </Section>
        <Section id="strength" title="Strength">
          <p className="text-gray-500">Strength detail coming soon</p>
        </Section>
        <Section id="body-control" title="Body Control">
          <p className="text-gray-500">Body control detail coming soon</p>
        </Section>
        <Section id="nutrition" title="Nutrition">
          <p className="text-gray-500">Nutrition detail coming soon</p>
        </Section>
      </main>
      {logModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <p className="text-gray-500">Log modal coming soon</p>
            <button onClick={() => setLogModalOpen(false)} className="mt-4 text-sm text-gray-400 hover:text-gray-700">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
