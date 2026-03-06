import { useState, useEffect } from 'react'

const STORAGE_KEY = 'louis-training-logs'

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function useLogs() {
  const [logs, setLogs] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
  }, [logs])

  function addLog(entry) {
    const newLog = { id: generateId(), ...entry }
    setLogs(prev => [...prev, newLog])
  }

  function deleteLog(id) {
    setLogs(prev => prev.filter(log => log.id !== id))
  }

  return { logs, addLog, deleteLog }
}
