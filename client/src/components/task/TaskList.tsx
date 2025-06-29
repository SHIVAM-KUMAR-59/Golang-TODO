import { Task } from '@/types/task.types'
import { TaskItem } from './TaskItem'
import { EmptyState } from '@/components/ui/EmptyState'

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (taskId: string) => void
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onCreateTask: () => void
}

export const TaskList = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  onCreateTask,
}: TaskListProps) => (
  <div className="space-y-4">
    {tasks.length === 0 ? (
      <EmptyState onCreateTask={onCreateTask} />
    ) : (
      tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))
    )}
  </div>
)
