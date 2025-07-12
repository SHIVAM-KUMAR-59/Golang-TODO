import { ArrowLeft, User, Plus } from 'lucide-react'
import Link from 'next/link'
import { BUTTON_HOVER_CLASSES } from '@/constants/task.constants'

interface TaskHeaderProps {
  onCreateTask: () => void
}
// Header
export const TaskHeader = ({ onCreateTask }: TaskHeaderProps) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-4">
      <Link
        href="/"
        className="group items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 hover:scale-105 hidden md:flex"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        Back to Home
      </Link>
      <div className="h-6 w-px bg-slate-600 hidden md:block"></div>
      <div className="flex items-center gap-3">
        <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
          <User className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Your Tasks</h1>
        </div>
      </div>
    </div>

    <button
      onClick={onCreateTask}
      className={`group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold ${BUTTON_HOVER_CLASSES} shadow-lg hover:shadow-xl hover:shadow-blue-500/25`}
    >
      <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
      New Task
    </button>
  </div>
)
