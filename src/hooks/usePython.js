import { useState, useEffect, useCallback } from 'react'
import { loadPyodide, runPython, isPyodideReady, isPyodideLoading } from '../lib/pythonRunner'

export function usePython() {
  const [isReady, setIsReady] = useState(isPyodideReady())
  const [isLoading, setIsLoading] = useState(isPyodideLoading())
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState('')
  const [error, setError] = useState(null)
  const [executionTime, setExecutionTime] = useState(null)

  useEffect(() => {
    if (!isReady && !isLoading) {
      setIsLoading(true)
      loadPyodide()
        .then(() => {
          setIsReady(true)
          setIsLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setIsLoading(false)
        })
    }
  }, [isReady, isLoading])

  const runCode = useCallback(async (code) => {
    if (!code.trim()) {
      setOutput('')
      setError(null)
      return { success: true, output: '' }
    }

    setIsRunning(true)
    setError(null)
    setOutput('')
    setExecutionTime(null)

    try {
      const result = await runPython(code)
      
      if (result.success) {
        setOutput(result.output)
        setError(null)
      } else {
        setOutput('')
        setError(result.error)
      }
      
      setExecutionTime(result.executionTime)
      return result
    } catch (err) {
      const errorMsg = err.message || 'Unknown error occurred'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsRunning(false)
    }
  }, [])

  const clearOutput = useCallback(() => {
    setOutput('')
    setError(null)
    setExecutionTime(null)
  }, [])

  return {
    isReady,
    isLoading,
    isRunning,
    output,
    error,
    executionTime,
    runCode,
    clearOutput,
  }
}
