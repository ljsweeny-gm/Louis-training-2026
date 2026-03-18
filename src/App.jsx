import { useState } from 'react'
import NavBar from './components/NavBar'
import Section from './components/Section'
import { useLogs } from './hooks/useLogs'
import LogModal from './components/LogModal'
import SummaryDashboard from './components/SummaryDashboard'
import RuckingDetail from './components/RuckingDetail'
import StrengthDetail from './components/StrengthDetail'
import BodyControlDetail from './components/BodyControlDetail'
import NutritionDetail from './components/NutritionDetail'

export default function App() {
  const [logModalOpen, setLogModalOpen] = useState(false)
  const { logs, benchmarks, targets, loading, error, addLog } = useLogs()

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">Loading training data...</div>
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-400">Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <NavBar onLogClick={() => setLogModalOpen(true)} />
      <main>
        <Section id="summary" title="Summary">
          <SummaryDashboard logs={logs} benchmarks={benchmarks} targets={targets} />
        </Section>
        <Section id="rucking" title="Rucking">
          <RuckingDetail logs={logs} benchmarks={benchmarks} />
        </Section>
        <Section id="strength" title="Strength">
          <StrengthDetail logs={logs} />
        </Section>
        <Section id="body-control" title="Body Control">
          <BodyControlDetail logs={logs} />
        </Section>
        <Section id="nutrition" title="Nutrition">
          <NutritionDetail logs={logs} />
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
