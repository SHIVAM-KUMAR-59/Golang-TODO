import { TaskStats } from '@/types/task.types'

interface ProgressBarProps {
  stats: TaskStats
}

export const ProgressBar = ({ stats }: ProgressBarProps) => (
  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-8 hover:bg-slate-800/60 transition-all duration-300">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-lg font-semibold text-white">Progress</h3>
      <span className="text-slate-400 text-sm">
        {stats.progressPercentage}%
      </span>
    </div>
    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${stats.progressPercentage}%` }}
      />
    </div>
  </div>
)
