/**
 * PythonDemo - Test component to verify Python execution works
 */

import React, { useState } from 'react';
import { usePython } from '../hooks/usePython';
import { runFunctionTests } from '../lib/testRunner';
import { TestResults } from './TestResults';
import './TestResults.css';

const DEMO_CODE = `# Welcome to Python Lab! 🐍
# Try editing this code and click "Run"

def greet(name):
    return f"Hello, {name}!"

# Test the function
message = greet("World")
print(message)

# Some math
numbers = [1, 2, 3, 4, 5]
print(f"Sum: {sum(numbers)}")
print(f"Average: {sum(numbers) / len(numbers)}")
`;

const ADD_FUNCTION_CODE = `def add(a, b):
    return a + b
`;

const ADD_TESTS = [
  { args: [1, 2], expected: 3, description: 'Basic addition' },
  { args: [0, 0], expected: 0, description: 'Adding zeros' },
  { args: [-1, 1], expected: 0, description: 'Negative + positive' },
  { args: [100, 200], expected: 300, description: 'Larger numbers' },
];

export function PythonDemo() {
  const { runCode, isLoading, isReady, isRunning, output, error, executionTime, clearOutput } = usePython();
  const [code, setCode] = useState(DEMO_CODE);
  const [testResults, setTestResults] = useState(null);
  const [testMode, setTestMode] = useState(false);

  const handleRun = async () => {
    if (testMode) {
      // Run tests
      const results = await runFunctionTests(code, 'add', ADD_TESTS);
      setTestResults(results);
    } else {
      // Run code normally
      setTestResults(null);
      await runCode(code);
    }
  };

  const switchToTestMode = () => {
    setTestMode(true);
    setCode(ADD_FUNCTION_CODE);
    setTestResults(null);
    clearOutput();
  };

  const switchToPlayground = () => {
    setTestMode(false);
    setCode(DEMO_CODE);
    setTestResults(null);
    clearOutput();
  };

  return (
    <div className="python-demo p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">🐍 Python Lab Demo</h1>
      <p className="text-gray-600 mb-6">
        Testing Pyodide integration - Python running in your browser!
      </p>

      {/* Status */}
      <div className="mb-4 flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          isLoading ? 'bg-yellow-100 text-yellow-800' :
          isReady ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isLoading ? '⏳ Loading Python...' : isReady ? '✅ Python Ready' : '❌ Error'}
        </span>
        {executionTime && (
          <span className="text-sm text-gray-500">
            Executed in {(executionTime / 1000).toFixed(3)}s
          </span>
        )}
      </div>

      {/* Mode Toggle */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={switchToPlayground}
          className={`px-4 py-2 rounded ${!testMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Playground
        </button>
        <button
          onClick={switchToTestMode}
          className={`px-4 py-2 rounded ${testMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Test Mode (add function)
        </button>
      </div>

      {/* Code Editor */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {testMode ? 'Write an add(a, b) function:' : 'Python Code:'}
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm border rounded-lg bg-gray-900 text-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isReady}
          spellCheck={false}
        />
      </div>

      {/* Run Button */}
      <button
        onClick={handleRun}
        disabled={!isReady || isRunning}
        className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isRunning ? (
          <>⏳ Running...</>
        ) : (
          <>▶️ {testMode ? 'Run Tests' : 'Run'}</>
        )}
      </button>

      {/* Test Results */}
      {testMode && (
        <TestResults results={testResults} isRunning={isRunning} />
      )}

      {/* Output */}
      {!testMode && (output || error) && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Output:</h3>
          <pre className={`p-4 rounded-lg font-mono text-sm whitespace-pre-wrap ${
            error ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-gray-100 text-gray-800'
          }`}>
            {error || output || '(no output)'}
          </pre>
        </div>
      )}
    </div>
  );
}

export default PythonDemo;
