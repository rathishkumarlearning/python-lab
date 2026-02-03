let pyodide = null
let isLoading = false
let loadPromise = null

export async function loadPyodide() {
  if (pyodide) return pyodide
  if (loadPromise) return loadPromise

  isLoading = true
  loadPromise = (async () => {
    try {
      // eslint-disable-next-line no-undef
      pyodide = await globalThis.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
      })
      
      // Setup stdout/stderr capture
      pyodide.runPython(`
import sys
from io import StringIO

class OutputCapture:
    def __init__(self):
        self.stdout = StringIO()
        self.stderr = StringIO()
        
    def reset(self):
        self.stdout = StringIO()
        self.stderr = StringIO()
        
    def get_output(self):
        return self.stdout.getvalue()
        
    def get_error(self):
        return self.stderr.getvalue()

_output_capture = OutputCapture()
      `)
      
      return pyodide
    } catch (error) {
      console.error('Failed to load Pyodide:', error)
      throw error
    } finally {
      isLoading = false
    }
  })()

  return loadPromise
}

export async function runPython(code, timeout = 5000) {
  const py = await loadPyodide()
  
  const startTime = performance.now()
  
  try {
    // Reset output capture
    py.runPython('_output_capture.reset()')
    
    // Redirect stdout/stderr
    py.runPython(`
import sys
sys.stdout = _output_capture.stdout
sys.stderr = _output_capture.stderr
    `)
    
    // Run the user code with timeout
    const runWithTimeout = new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Execution timed out (5 seconds limit)'))
      }, timeout)
      
      try {
        py.runPython(code)
        clearTimeout(timeoutId)
        resolve()
      } catch (error) {
        clearTimeout(timeoutId)
        reject(error)
      }
    })
    
    await runWithTimeout
    
    // Get output
    const output = py.runPython('_output_capture.get_output()')
    const executionTime = performance.now() - startTime
    
    return {
      success: true,
      output: output || '',
      error: null,
      executionTime,
    }
  } catch (error) {
    const executionTime = performance.now() - startTime
    
    // Format Python error nicely
    let errorMessage = error.message || String(error)
    
    // Remove Pyodide internal stack traces
    if (errorMessage.includes('PythonError:')) {
      errorMessage = errorMessage.split('PythonError:')[1]?.trim() || errorMessage
    }
    
    return {
      success: false,
      output: '',
      error: errorMessage,
      executionTime,
    }
  } finally {
    // Restore stdout/stderr
    py.runPython(`
import sys
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
    `)
  }
}

export function isPyodideReady() {
  return pyodide !== null
}

export function isPyodideLoading() {
  return isLoading
}
