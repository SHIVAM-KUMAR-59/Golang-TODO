'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Save } from 'lucide-react'
import { useListTasks } from '@/server/task'

// Types
import { Task } from '@/types/task.types'

// Hooks
import { useTaskStats } from '@/hooks/useTaskStats'
import { useFormState } from '@/hooks/useFormState'
import { useTaskHandlers } from '@/hooks/useTaskHandlers'

// Components
import { BackgroundElements } from '@/components/ui/BackgroundElements'
import { TaskHeader } from '@/components/task/TaskHeader'
import { TaskStatsSection } from '@/components/task/TaskStats'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { TaskList } from '@/components/task/TaskList'
import { TaskModal } from '@/components/task/TaskModal'

export default function UserTasksPage() {
  const params = useParams()
  const userId = params.userId as string

  // State
  const [tasks, setTasks] = useState<Task[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Hooks
  const createFormState = useFormState()
  const editFormState = useFormState()
  const stats = useTaskStats(tasks)

  // API hooks
  const { data } = useListTasks(userId)

  // Task handlers
  const {
    handleCreateTask,
    handleEditTask,
    handleUpdateTask,
    handleDeleteTask,
    handleToggleComplete,
  } = useTaskHandlers(
    userId,
    tasks,
    setTasks,
    createFormState,
    editFormState,
    editingTask,
    setEditingTask,
    setIsCreateModalOpen,
  )

  // Effects
  useEffect(() => {
    if (data?.tasks) {
      setTasks(data.tasks)
    }
  }, [data])

  // Modal handlers
  const closeCreateModal = useCallback(() => {
    setIsCreateModalOpen(false)
    createFormState.resetForm()
  }, [createFormState])

  const closeEditModal = useCallback(() => {
    setEditingTask(null)
    editFormState.resetForm()
  }, [editFormState])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      <BackgroundElements />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <TaskHeader onCreateTask={() => setIsCreateModalOpen(true)} />
        <TaskStatsSection stats={stats} />
        <ProgressBar stats={stats} />
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onCreateTask={() => setIsCreateModalOpen(true)}
        />
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={isCreateModalOpen}
        title="Create New Task"
        formState={createFormState}
        onSubmit={handleCreateTask}
        onClose={closeCreateModal}
        submitLabel="Create Task"
      />

      <TaskModal
        isOpen={!!editingTask}
        title="Edit Task"
        formState={editFormState}
        onSubmit={handleUpdateTask}
        onClose={closeEditModal}
        submitLabel="Save Changes"
        submitIcon={Save}
      />
    </main>
  )
}
