export interface Task {
  id: string
  name: string
  description: string
  isCompleted: boolean
  updatedAt?: Date
}

export interface FormData {
  name: string
  description: string
}

export interface TaskStats {
  total: number
  completed: number
  remaining: number
  progressPercentage: number
}

export interface TaskModalProps {
  isOpen: boolean
  title: string
  formState: ReturnType<typeof useFormState>
  onSubmit: () => void
  onClose: () => void
  submitLabel: string
  submitIcon?: React.ComponentType<{ className?: string }>
}

export interface TaskItemProps {
  task: Task
  onToggleComplete: (taskId: string) => void
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
}

export interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  value: number
  colorClass: string
}
