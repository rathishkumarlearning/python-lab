import { createContext, useContext, useState, useEffect } from 'react'

const ProgressContext = createContext()

const STORAGE_KEY = 'python-lab-progress'

const defaultProgress = {
  completedLessons: [],
  completedChallenges: [],
  xp: 0,
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { ...defaultProgress, ...JSON.parse(saved) } : defaultProgress
    } catch {
      return defaultProgress
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const completeLesson = (lessonId) => {
    if (!progress.completedLessons.includes(lessonId)) {
      setProgress(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        xp: prev.xp + 50,
      }))
    }
  }

  const completeChallenge = (challengeId) => {
    if (!progress.completedChallenges.includes(challengeId)) {
      setProgress(prev => ({
        ...prev,
        completedChallenges: [...prev.completedChallenges, challengeId],
        xp: prev.xp + 100,
      }))
    }
  }

  const isLessonComplete = (lessonId) => progress.completedLessons.includes(lessonId)
  const isChallengeComplete = (challengeId) => progress.completedChallenges.includes(challengeId)

  return (
    <ProgressContext.Provider value={{
      progress,
      completedChallenges: progress.completedChallenges,
      completedLessons: progress.completedLessons,
      completeLesson,
      completeChallenge,
      markChallengeComplete: completeChallenge,
      isLessonComplete,
      isChallengeComplete,
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress must be used within ProgressProvider')
  return context
}
