import { useState } from 'react'
import NavBar from './components/NavBar'
import Section from './components/Section'
import { useLogs } from './hooks/useLogs'
import { MOCK_LOGS, MOCK_BENCHMARKS } from './data/mockLogs'
import LogModal from './components/LogModal'
import SummaryDashboard from './components/SummaryDashboard'
import RuckingDetail from './components/RuckingDetail'
import StrengthDetail from './components/StrengthDetail'
import BodyControlDetail from './components/BodyControlDetail'
import NutritionDetail from './components/NutritionDetail'

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
          <SummaryDashboard logs={allLogs} benchmarks={MOCK_BENCHMARKS} />
        </Section>
        <Section id="rucking" title="Rucking">
          <RuckingDetail logs={allLogs} benchmarks={MOCK_BENCHMARKS} />
        </Section>
        <Section id="strength" title="Strength">
          <StrengthDetail logs={allLogs} />
        </Section>
        <Section id="body-control" title="Body Control">
          <BodyControlDetail logs={allLogs} />
        </Section>
        <Section id="nutrition" title="Nutrition">
          <NutritionDetail logs={allLogs} />
        </Section>
      </main>
      {logModalOpen && (
        <LogModal
          onClose={() => setLogModalOpen(false)}
          onSave={addLog}
        />
      )}
    </div>
  )
}
