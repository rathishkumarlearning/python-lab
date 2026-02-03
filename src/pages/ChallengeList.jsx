import { Link } from 'react-router-dom'
import { Trophy, CheckCircle2, Star, Zap, Flame } from 'lucide-react'
import { challenges } from '../data/challenges'
import { useProgress } from '../context/ProgressContext'

const difficultyConfig = {
  easy: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: Star, label: 'Easy' },
  medium: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Zap, label: 'Medium' },
  hard: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: Flame, label: 'Hard' },
}

export default function ChallengeList() {
  const { isChallengeComplete, progress } = useProgress()
  
  const completedCount = progress.completedChallenges.length
  const totalXP = progress.xp

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm mb-6">
          <Trophy size={16} />
          <span>{completedCount}/{challenges.length} Completed • {totalXP} XP</span>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">
          Coding Challenges
        </h1>
        <p className="text-white/60 max-w-xl mx-auto">
          Test your Python skills with these challenges. Each one you complete earns you XP!
        </p>
      </div>

      {/* Difficulty Sections */}
      {['easy', 'medium', 'hard'].map(difficulty => {
        const config = difficultyConfig[difficulty]
        const Icon = config.icon
        const filteredChallenges = challenges.filter(c => c.difficulty === difficulty)
        
        return (
          <section key={difficulty} className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Icon size={20} className={config.color.split(' ')[1]} />
              {config.label} ({filteredChallenges.filter(c => isChallengeComplete(c.id)).length}/{filteredChallenges.length})
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredChallenges.map(challenge => {
                const isComplete = isChallengeComplete(challenge.id)
                
                return (
                  <Link
                    key={challenge.id}
                    to={`/challenge/${challenge.id}`}
                    className={`glass-card p-5 hover:bg-white/10 transition-all group ${
                      isComplete ? 'border-green-500/30' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs border ${config.color}`}>
                        {config.label}
                      </span>
                      {isComplete && (
                        <CheckCircle2 size={20} className="text-green-400" />
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {challenge.title}
                    </h3>
                    
                    <p className="text-white/50 text-sm line-clamp-2">
                      {challenge.description}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                      <span>{challenge.testCases.length} test cases</span>
                      <span>•</span>
                      <span>+100 XP</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
