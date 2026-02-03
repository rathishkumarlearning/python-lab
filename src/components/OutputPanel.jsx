import { Terminal, Loader2, Trash2, CheckCircle2, XCircle } from 'lucide-react'

export default function OutputPanel({ 
  output, 
  error, 
  isLoading, 
  isRunning,
  executionTime,
  onClear 
}) {
  const hasOutput = output || error
  
  return (
    <div className="h-full flex flex-col bg-[#0d1117] rounded-lg border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2 text-white/60">
          <Terminal size={16} />
          <span className="text-sm font-medium">Output</span>
          {executionTime && (
            <span className="text-xs text-white/40">
              ({executionTime.toFixed(0)}ms)
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasOutput && !isRunning && (
            <button
              onClick={onClear}
              className="p-1 text-white/40 hover:text-white/60 transition-colors"
              title="Clear output"
            >
              <Trash2 size={14} />
            </button>
          )}
          {error && <XCircle size={16} className="text-red-400" />}
          {output && !error && <CheckCircle2 size={16} className="text-green-400" />}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 overflow-auto font-mono text-sm">
        {isLoading && (
          <div className="flex items-center gap-2 text-white/50">
            <Loader2 size={16} className="animate-spin" />
            <span>Loading Python environment...</span>
          </div>
        )}
        
        {isRunning && !isLoading && (
          <div className="flex items-center gap-2 text-white/50">
            <Loader2 size={16} className="animate-spin" />
            <span>Running code...</span>
          </div>
        )}
        
        {!isLoading && !isRunning && error && (
          <div className="text-red-400 whitespace-pre-wrap">{error}</div>
        )}
        
        {!isLoading && !isRunning && output && (
          <div className="text-green-400 whitespace-pre-wrap">{output}</div>
        )}
        
        {!isLoading && !isRunning && !hasOutput && (
          <div className="text-white/30">
            Click "Run" to execute your code...
          </div>
        )}
      </div>
    </div>
  )
}
