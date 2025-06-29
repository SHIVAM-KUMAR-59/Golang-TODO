import { useMemo } from 'react'
import { Task, TaskStats } from '@/types/task.types'

export const useTaskStats = (tasks: Task[]): TaskStats => {
  return useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.isCompleted).length
    const remaining = total - completed
    const progressPercentage =
      total > 0 ? Math.round((completed / total) * 100) : 0

    return { total, completed, remaining, progressPercentage }
  }, [tasks])
}
