import { useCallback } from 'react'
import { Task } from '@/types/task.types'
import { useFormState } from './useFormState'
import { useCreateTask, useUpdateTask, useDeleteTasks } from '@/server/task'

export const useTaskHandlers = (
  userId: string,
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  createFormState: ReturnType<typeof useFormState>,
  editFormState: ReturnType<typeof useFormState>,
  editingTask: Task | null,
  setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>,
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { mutateAsync: createTask } = useCreateTask()
  const { mutateAsync: updateTask } = useUpdateTask()
  const { mutateAsync: deleteTask } = useDeleteTasks()

  const handleCreateTask = useCallback(async () => {
    if (!createFormState.isValid) return

    try {
      const response = await createTask({
        userId,
        name: createFormState.formData.name,
        description: createFormState.formData.description,
      })

      if (!response) throw new Error('Failed to create task')

      const newTask: Task = {
        id: Date.now().toString(),
        name: createFormState.formData.name,
        description: createFormState.formData.description,
        isCompleted: false,
      }

      setTasks((prev) => [newTask, ...prev])
      createFormState.resetForm()
      setIsCreateModalOpen(false)
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }, [createTask, userId, createFormState, setTasks, setIsCreateModalOpen])

  const handleEditTask = useCallback(
    (task: Task) => {
      setEditingTask(task)
      editFormState.setFormData({
        name: task.name,
        description: task.description,
      })
    },
    [editFormState, setEditingTask],
  )

  const handleUpdateTask = useCallback(async () => {
    if (!editingTask || !editFormState.isValid) return

    try {
      const response = await updateTask({
        id: editingTask.id,
        name: editFormState.formData.name,
        description: editFormState.formData.description,
      })

      if (!response) throw new Error('Failed to update task')

      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                name: editFormState.formData.name,
                description: editFormState.formData.description,
                updatedAt: new Date(),
              }
            : task,
        ),
      )
      setEditingTask(null)
      editFormState.resetForm()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }, [editingTask, editFormState, updateTask, setTasks, setEditingTask])

  const handleDeleteTask = useCallback(
    async (taskId: string) => {
      try {
        const response = await deleteTask({ id: taskId })
        if (!response) throw new Error('Failed to delete task')

        setTasks((prev) => prev.filter((task) => task.id !== taskId))
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    },
    [deleteTask, setTasks],
  )

  const handleToggleComplete = useCallback(
    async (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId)
      if (!task) return

      try {
        const response = updateTask({
          id: taskId,
          name: task.name,
          description: task.description,
          isCompleted: !task.isCompleted,
        })

        if (!response) throw new Error('Failed to update task')

        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId
              ? { ...t, isCompleted: !t.isCompleted, updatedAt: new Date() }
              : t,
          ),
        )
      } catch (error) {
        console.error('Error toggling task completion:', error)
      }
    },
    [tasks, updateTask, setTasks],
  )

  return {
    handleCreateTask,
    handleEditTask,
    handleUpdateTask,
    handleDeleteTask,
    handleToggleComplete,
  }
}
