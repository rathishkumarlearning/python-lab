import { Link } from 'react-router-dom';
import { BookOpen, Trophy, Rocket, Code, Zap, Target, ChevronRight, Play } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Learn',
    description: 'Interactive lessons from basics to advanced Python concepts',
    color: 'purple',
    link: '/learn',
  },
  {
    icon: Code,
    title: 'Practice',
    description: 'Write and run real Python code directly in your browser',
    color: 'pink',
    link: '/learn',
  },
  {
    icon: Trophy,
    title: 'Master',
    description: 'Solve coding challenges and build real-world projects',
    color: 'cyan',
    link: '/challenges',
  },
];

const stats = [
  { value: '25+', label: 'Lessons', icon: BookOpen },
  { value: '50+', label: 'Challenges', icon: Target },
  { value: '100%', label: 'Free', icon: Zap },
];

function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-8">
            <Rocket size={16} />
            <span>Learn Python the interactive way</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Master Python</span>
            <br />
            <span className="text-white">By Writing Code</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            An interactive learning platform where you learn by doing. 
            Write real Python code, see instant results, and build your skills step by step.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/learn"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <Play size={20} />
              Start Learning
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/challenges"
              className="flex items-center gap-2 px-8 py-4 glass-card hover:bg-white/10 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              <Trophy size={20} className="text-yellow-400" />
              View Challenges
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="glass-card p-6 text-center">
                <Icon size={24} className="mx-auto mb-2 text-purple-400" />
                <div className="text-3xl font-bold gradient-text">{value}</div>
                <div className="text-gray-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to <span className="gradient-text">become a Python developer</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description, color, link }) => (
              <Link
                key={title}
                to={link}
                className="group glass-card p-8 hover:bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-${color}-500/20`}>
                  <Icon size={28} className={`text-${color}-400`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors">
                  {title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Get started <ChevronRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto glass-card p-12 text-center glow-purple">
          <h2 className="text-3xl font-bold mb-4">Ready to start your Python journey?</h2>
          <p className="text-gray-400 mb-8">
            Jump into your first lesson and start writing Python code in seconds.
          </p>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            <Rocket size={20} />
            Begin Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
