import { Calendar } from 'lucide-react'
import { BUTTON_HOVER_CLASSES } from '@/constants/task.constants'

interface EmptyStateProps {
  onCreateTask: () => void
}

export const EmptyState = ({ onCreateTask }: EmptyStateProps) => (
  <div className="text-center py-16">
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 max-w-md mx-auto">
      <div className="bg-slate-700/50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <Calendar className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No tasks yet</h3>
      <p className="text-slate-400 mb-6">
        Create your first task to get started on your journey!
      </p>
      <button
        onClick={onCreateTask}
        className={`bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold ${BUTTON_HOVER_CLASSES}`}
      >
        Create First Task
      </button>
    </div>
  </div>
)
