import { Check, Edit3, Trash2 } from 'lucide-react'
import { TaskItemProps } from '@/types/task.types'

export const TaskItem = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskItemProps) => (
  <div
    className={`group bg-slate-800/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:bg-slate-800/60 hover:scale-[1.02] hover:shadow-xl ${
      task.isCompleted
        ? 'border-green-500/30 hover:border-green-500/50'
        : 'border-slate-700/50 hover:border-slate-600/60'
    }`}
  >
    <div className="flex items-start gap-4">
      <button
        onClick={() => onToggleComplete(task.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          task.isCompleted
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-slate-500 hover:border-slate-400'
        }`}
        aria-label={
          task.isCompleted ? 'Mark as incomplete' : 'Mark as complete'
        }
      >
        {task.isCompleted && <Check className="w-4 h-4" />}
      </button>

      <div className="flex-1 min-w-0">
        <h3
          className={`text-lg font-semibold mb-2 transition-all duration-300 ${
            task.isCompleted
              ? 'text-slate-400 line-through'
              : 'text-white group-hover:text-blue-100'
          }`}
        >
          {task.name}
        </h3>
        {task.description && (
          <p
            className={`text-sm mb-3 transition-colors duration-300 ${
              task.isCompleted
                ? 'text-slate-500'
                : 'text-slate-300 group-hover:text-slate-200'
            }`}
          >
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 transition-all duration-300">
        <button
          onClick={() => onEdit(task)}
          className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all duration-300 hover:scale-110"
          aria-label="Edit task"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
)
