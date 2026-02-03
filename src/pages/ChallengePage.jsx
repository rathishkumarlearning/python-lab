import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Play, ChevronLeft, CheckCircle2, XCircle, Lightbulb, Eye, Loader2, Trophy } from 'lucide-react'
import CodeEditor from '../components/CodeEditor'
import { getChallenge, challenges } from '../data/challenges'
import { usePython } from '../hooks/usePython'
import { useProgress } from '../context/ProgressContext'

export default function ChallengePage() {
  const { id } = useParams()
  const challenge = getChallenge(id)
  const [code, setCode] = useState(challenge?.starterCode || '')
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [testResults, setTestResults] = useState(null)
  const { isReady, isLoading, isRunning, runCode } = usePython()
  const { isChallengeComplete, completeChallenge } = useProgress()

  useEffect(() => {
    if (challenge) {
      setCode(challenge.starterCode)
      setTestResults(null)
      setShowHints(false)
      setShowSolution(false)
    }
  }, [challenge])

  if (!challenge) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl text-white mb-4">Challenge not found</h1>
        <Link to="/challenges" className="text-purple-400 hover:underline">
          Back to challenges
        </Link>
      </div>
    )
  }

  const isComplete = isChallengeComplete(challenge.id)
  const currentIndex = challenges.findIndex(c => c.id === id)
  const nextChallenge = challenges[currentIndex + 1]

  const runTests = async () => {
    setTestResults(null)
    
    const results = []
    
    for (const testCase of challenge.testCases) {
      const testCode = `${code}\nprint(${testCase.input})`
      const result = await runCode(testCode)
      
      const actual = result.output?.trim() || result.error || ''
      const expected = testCase.expected
      const passed = actual === expected
      
      results.push({
        input: testCase.input,
        expected,
        actual,
        passed,
        error: result.error,
      })
    }
    
    setTestResults(results)
    
    const allPassed = results.every(r => r.passed)
    if (allPassed) {
      completeChallenge(challenge.id)
    }
  }

  const allPassed = testResults?.every(r => r.passed)

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/challenges" className="text-white/50 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              {challenge.title}
              {isComplete && <CheckCircle2 size={18} className="text-green-400" />}
            </h1>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              challenge.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
              challenge.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {challenge.difficulty}
            </span>
          </div>
        </div>
        
        <button
          onClick={runTests}
          disabled={!isReady || isRunning}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          {isRunning ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
          {isLoading ? 'Loading...' : 'Run Tests'}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Description + Editor */}
        <div className="lg:w-1/2 flex flex-col overflow-hidden">
          {/* Challenge Description */}
          <div className="p-4 border-b border-white/10">
            <div className="glass-card p-4">
              <p className="text-white/80 mb-4">{challenge.description}</p>
              
              {/* Hints */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300"
                >
                  <Lightbulb size={16} />
                  {showHints ? 'Hide Hints' : 'Show Hints'}
                </button>
                
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
                >
                  <Eye size={16} />
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
              </div>
              
              {showHints && (
                <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <ul className="text-sm text-yellow-300 space-y-1">
                    {challenge.hints.map((hint, i) => (
                      <li key={i}>💡 {hint}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {showSolution && (
                <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <pre className="text-sm text-purple-300 font-mono whitespace-pre-wrap">
                    {challenge.solution}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 p-4 overflow-hidden">
            <CodeEditor 
              code={code} 
              onChange={setCode}
              height="100%"
            />
          </div>
        </div>

        {/* Right: Test Results */}
        <div className="lg:w-1/2 p-4 border-t lg:border-t-0 lg:border-l border-white/10 overflow-auto">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Trophy size={20} />
            Test Results
          </h3>
          
          {!testResults && (
            <div className="text-white/40 text-center py-12">
              Click "Run Tests" to check your solution
            </div>
          )}
          
          {testResults && (
            <div className="space-y-4">
              {/* Summary */}
              <div className={`p-4 rounded-xl ${allPassed ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                <div className="flex items-center gap-2">
                  {allPassed ? (
                    <>
                      <CheckCircle2 size={24} className="text-green-400" />
                      <span className="text-green-400 font-semibold">All tests passed! 🎉</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={24} className="text-red-400" />
                      <span className="text-red-400 font-semibold">
                        {testResults.filter(r => r.passed).length}/{testResults.length} tests passed
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              {/* Individual Tests */}
              {testResults.map((result, i) => (
                <div 
                  key={i}
                  className={`p-4 rounded-xl ${result.passed ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {result.passed ? (
                      <CheckCircle2 size={16} className="text-green-400" />
                    ) : (
                      <XCircle size={16} className="text-red-400" />
                    )}
                    <span className="font-mono text-sm text-white/80">
                      Test {i + 1}: {result.input}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white/40 text-xs mb-1">Expected:</div>
                      <div className="font-mono text-green-400">{result.expected}</div>
                    </div>
                    <div>
                      <div className="text-white/40 text-xs mb-1">Actual:</div>
                      <div className={`font-mono ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                        {result.error ? `Error: ${result.error}` : result.actual || '(empty)'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Next Challenge */}
              {allPassed && nextChallenge && (
                <Link
                  to={`/challenge/${nextChallenge.id}`}
                  className="block text-center py-4 px-6 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 transition-colors"
                >
                  Next Challenge: {nextChallenge.title} →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
