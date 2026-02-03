/**
 * LearnPage - Python learning lessons with interactive examples
 */

import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Play, ChevronLeft, ChevronRight, CheckCircle2, BookOpen, Loader2 } from 'lucide-react'
import { usePython } from '../hooks/usePython'
import { useProgress } from '../context/ProgressContext'
import CodeEditor from '../components/CodeEditor'
import OutputPanel from '../components/OutputPanel'
import { lessons } from '../data/lessons'

export default function LearnPage() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { runCode, isLoading, isReady, isRunning, output, error, executionTime, clearOutput } = usePython()
  const { isLessonComplete, completeLesson } = useProgress()
  
  // Find current lesson
  const currentIndex = lessonId 
    ? lessons.findIndex(l => l.id === lessonId)
    : 0
  const currentLesson = lessons[currentIndex] || lessons[0]
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  
  const [code, setCode] = useState(currentLesson?.starterCode || '')

  useEffect(() => {
    if (currentLesson) {
      setCode(currentLesson.starterCode || '')
      clearOutput()
    }
  }, [currentLesson, clearOutput])

  // Navigate to first lesson if no lessonId
  useEffect(() => {
    if (!lessonId && lessons.length > 0) {
      navigate(`/learn/${lessons[0].id}`, { replace: true })
    }
  }, [lessonId, navigate])

  const handleRun = async () => {
    const result = await runCode(code)
    if (result.success) {
      completeLesson(currentLesson.id)
    }
  }

  if (!currentLesson) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl text-white mb-4">Lesson not found</h1>
        <Link to="/learn" className="text-purple-400 hover:underline">
          Back to lessons
        </Link>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Sidebar - Lesson List */}
      <aside className="w-72 border-r border-white/10 overflow-y-auto hidden lg:block">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <BookOpen size={20} />
            Lessons
          </h2>
        </div>
        <nav className="p-2">
          {lessons.map((lesson, index) => {
            const isActive = lesson.id === currentLesson.id
            const completed = isLessonComplete(lesson.id)
            
            return (
              <Link
                key={lesson.id}
                to={`/learn/${lesson.id}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                  isActive 
                    ? 'bg-purple-500/20 border border-purple-500/30 text-white' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  completed 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-white/10 text-white/60'
                }`}>
                  {completed ? <CheckCircle2 size={14} /> : index + 1}
                </span>
                <span className="truncate">{lesson.title}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/learn" className="lg:hidden text-white/50 hover:text-white">
              <ChevronLeft size={24} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                {currentLesson.title}
                {isLessonComplete(currentLesson.id) && (
                  <CheckCircle2 size={18} className="text-green-400" />
                )}
              </h1>
              <span className="text-sm text-white/50">
                Lesson {currentIndex + 1} of {lessons.length}
              </span>
            </div>
          </div>
          
          <button
            onClick={handleRun}
            disabled={!isReady || isRunning}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold disabled:opacity-50 hover:opacity-90 transition-opacity"
          >
            {isRunning ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
            {isLoading ? 'Loading...' : 'Run Code'}
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left: Lesson Content */}
          <div className="lg:w-1/2 p-4 overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/10">
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: currentLesson.content }}
            />
            
            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
              {prevLesson ? (
                <Link
                  to={`/learn/${prevLesson.id}`}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                  <ChevronLeft size={20} />
                  <span>{prevLesson.title}</span>
                </Link>
              ) : <div />}
              
              {nextLesson ? (
                <Link
                  to={`/learn/${nextLesson.id}`}
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <span>{nextLesson.title}</span>
                  <ChevronRight size={20} />
                </Link>
              ) : (
                <Link
                  to="/challenges"
                  className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                >
                  <span>Try Challenges</span>
                  <ChevronRight size={20} />
                </Link>
              )}
            </div>
          </div>

          {/* Right: Code Editor + Output */}
          <div className="lg:w-1/2 flex flex-col overflow-hidden">
            {/* Code Editor */}
            <div className="flex-1 p-4 min-h-0">
              <CodeEditor 
                code={code} 
                onChange={setCode}
                disabled={!isReady}
                height="100%"
              />
            </div>
            
            {/* Output Panel */}
            <div className="h-48 p-4 pt-0">
              <OutputPanel 
                output={output} 
                error={error} 
                isLoading={isLoading}
                isRunning={isRunning}
                executionTime={executionTime}
                onClear={clearOutput}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
