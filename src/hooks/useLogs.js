import { useState, useEffect, useCallback } from 'react'

const API_URL = import.meta.env.VITE_SHEETS_API_URL

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function useLogs() {
  const [logs, setLogs] = useState([])
  const [benchmarks, setBenchmarks] = useState([])
  const [targets, setTargets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!API_URL) {
      setError('No API URL configured')
      setLoading(false)
      return
    }

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setLogs(data.logs || [])
        setBenchmarks(data.benchmarks || [])
        setTargets(data.targets || [])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const addLog = useCallback(async (entry) => {
    const newLog = { id: generateId(), ...entry }
    setLogs(prev => [...prev, newLog])

    try {
      await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(newLog),
      })
    } catch (err) {
      console.error('Failed to save log:', err)
    }
  }, [])

  const deleteLog = useCallback((id) => {
    setLogs(prev => prev.filter(log => log.id !== id))
  }, [])

  return { logs, benchmarks, targets, loading, error, addLog, deleteLog }
}
