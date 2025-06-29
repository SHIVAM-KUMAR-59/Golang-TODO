import { StatCardProps } from '@/types/task.types'
import { CARD_HOVER_CLASSES } from '@/constants/task.constants'

export const StatCard = ({
  icon: Icon,
  title,
  value,
  colorClass,
}: StatCardProps) => (
  <div
    className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/60 hover:border-slate-600/60 ${CARD_HOVER_CLASSES}`}
  >
    <div className="flex items-center gap-3">
      <div className={`${colorClass} p-3 rounded-lg border`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-slate-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </div>
)
