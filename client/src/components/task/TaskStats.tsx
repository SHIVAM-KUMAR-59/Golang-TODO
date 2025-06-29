import { Calendar, CheckCircle2, Circle } from 'lucide-react'
import { TaskStats } from '@/types/task.types'
import { StatCard } from '@/components/ui/StatCard'
import { STAT_CARD_CONFIGS } from '@/constants/task.constants'

interface TaskStatsProps {
  stats: TaskStats
}

export const TaskStatsSection = ({ stats }: TaskStatsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <StatCard
      icon={Calendar}
      title={STAT_CARD_CONFIGS.total.title}
      value={stats.total}
      colorClass={STAT_CARD_CONFIGS.total.colorClass}
    />
    <StatCard
      icon={CheckCircle2}
      title={STAT_CARD_CONFIGS.completed.title}
      value={stats.completed}
      colorClass={STAT_CARD_CONFIGS.completed.colorClass}
    />
    <StatCard
      icon={Circle}
      title={STAT_CARD_CONFIGS.remaining.title}
      value={stats.remaining}
      colorClass={STAT_CARD_CONFIGS.remaining.colorClass}
    />
  </div>
)
