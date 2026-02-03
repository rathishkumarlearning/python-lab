import { Link } from 'react-router-dom';
import { Trophy, Star, Clock, ChevronRight, Filter, Search } from 'lucide-react';
import { useState } from 'react';
import { challenges } from '../data/challenges';
import { useProgress } from '../context/ProgressContext';

const difficultyColors = {
  easy: 'text-green-400 bg-green-500/10 border-green-500/20',
  medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  hard: 'text-red-400 bg-red-500/10 border-red-500/20',
};

const difficultyStars = {
  easy: 1,
  medium: 2,
  hard: 3,
};

function ChallengesPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { completedChallenges, progress, isChallengeComplete } = useProgress();

  const filteredChallenges = challenges.filter(challenge => {
    const matchesFilter = filter === 'all' || challenge.difficulty === filter;
    const matchesSearch = challenge.title.toLowerCase().includes(search.toLowerCase()) ||
                          challenge.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: challenges.length,
    completed: progress.completedChallenges.length,
    easy: challenges.filter(c => c.difficulty === 'easy').length,
    medium: challenges.filter(c => c.difficulty === 'medium').length,
    hard: challenges.filter(c => c.difficulty === 'hard').length,
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Trophy className="text-yellow-400" />
            Coding Challenges
          </h1>
          <p className="text-gray-400">
            Put your Python skills to the test with these coding challenges
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-gray-400">Total</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
            <div className="text-xs text-gray-400">Completed</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.easy}</div>
            <div className="text-xs text-gray-400">Easy</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.medium}</div>
            <div className="text-xs text-gray-400">Medium</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{stats.hard}</div>
            <div className="text-xs text-gray-400">Hard</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search challenges..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            {['all', 'easy', 'medium', 'hard'].map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  filter === level
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Challenge List */}
        <div className="grid gap-4">
          {filteredChallenges.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Trophy size={48} className="mx-auto mb-4 text-gray-500" />
              <p className="text-gray-400">No challenges found matching your criteria</p>
            </div>
          ) : (
            filteredChallenges.map((challenge) => {
              const isCompleted = isChallengeComplete(challenge.id);
              return (
                <Link
                  key={challenge.id}
                  to={`/challenge/${challenge.id}`}
                  className={`group glass-card p-5 hover:bg-white/5 transition-all duration-300 ${
                    isCompleted ? 'border-green-500/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold group-hover:text-purple-400 transition-colors">
                          {challenge.title}
                        </h3>
                        {isCompleted && (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{challenge.description}</p>
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 rounded border text-xs font-medium capitalize ${
                          difficultyColors[challenge.difficulty]
                        }`}>
                          <span className="flex items-center gap-1">
                            {Array.from({ length: difficultyStars[challenge.difficulty] }).map((_, i) => (
                              <Star key={i} size={10} fill="currentColor" />
                            ))}
                            <span className="ml-1">{challenge.difficulty}</span>
                          </span>
                        </span>
                        {challenge.tags?.map(tag => (
                          <span key={tag} className="text-xs text-gray-500">
                            #{tag}
                          </span>
                        ))}
                        {challenge.timeEstimate && (
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock size={12} />
                            {challenge.timeEstimate}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={24} className="text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ChallengesPage;
