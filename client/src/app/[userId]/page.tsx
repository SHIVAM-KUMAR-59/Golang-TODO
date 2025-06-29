'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import {
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  Save,
  ArrowLeft,
  CheckCircle2,
  Circle,
  Calendar,
  User,
} from 'lucide-react'
import Link from 'next/link'
import {
  useCreateTask,
  useDeleteTasks,
  useListTasks,
  useUpdateTask,
} from '@/server/task'

interface Task {
  id: string
  name: string
  description: string
  isCompleted: boolean
}

export default function UserTasksPage() {
  const params = useParams()
  const userId = params.userId as string
  console.log('userId', userId)

  const [tasks, setTasks] = useState<Task[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })
  const { mutateAsync: createTask } = useCreateTask()
  const { data } = useListTasks(userId)
  const { mutateAsync: updateTask } = useUpdateTask()
  const { mutateAsync: deleteTask } = useDeleteTasks()

  // Mock data - in real app this would come from API
  useEffect(() => {
    if (data) {
      console.log('data', data.tasks)
      setTasks(data.tasks)
    }
  }, [data])

  const handleCreateTask = async () => {
    if (!formData.name.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      isCompleted: false,
    }

    try {
      const response = await createTask({
        userId: userId,
        name: newTask.name,
        description: newTask.description,
      })

      if (!response) {
        throw new Error('Failed to create task')
      }

      setTasks((prev) => [newTask, ...prev])
      setFormData({ name: '', description: '' })
      setIsCreateModalOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setFormData({
      name: task.name,
      description: task.description,
    })
  }

  const handleUpdateTask = async () => {
    if (!editingTask || !formData.name.trim()) return
    const updatedTask: Task = {
      ...editingTask,
      name: formData.name,
      description: formData.description,
    }
    try {
      const response = await updateTask({
        id: updatedTask.id,
        name: updatedTask.name,
        description: updatedTask.description,
      })

      if (!response) {
        throw new Error('Failed to update task')
      }
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                name: formData.name,
                description: formData.description,
                updatedAt: new Date(),
              }
            : task,
        ),
      )
      setEditingTask(null)
      setFormData({ name: '', description: '' })
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await deleteTask({ id: taskId })
      if (!response) {
        throw new Error('Failed to delete task')
      }
      setTasks((prev) => prev.filter((task) => task.id !== taskId))
    } catch (err) {
      console.log(err)
    }
  }

  const handleToggleComplete = (taskId: string) => {
    try {
      const response = updateTask({
        id: taskId,
        name: tasks.find((task) => task.id === taskId)?.name,
        description: tasks.find((task) => task.id === taskId)?.description,
        isCompleted: !tasks.find((task) => task.id === taskId)?.isCompleted,
      })
      if (!response) {
        throw new Error('Failed to update task')
      }
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? {
                ...task,
                isCompleted: !task.isCompleted,
                updatedAt: new Date(),
              }
            : task,
        ),
      )
    } catch (err) {
      console.log(err)
    }
  }

  const completedCount = tasks.filter((task) => task.isCompleted).length
  const totalCount = tasks.length

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
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
            onClick={() => setIsCreateModalOpen(true)}
            className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            New Task
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/60 hover:border-slate-600/60 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/30">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Tasks</p>
                <p className="text-2xl font-bold text-white">{totalCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/60 hover:border-slate-600/60 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-white">
                  {completedCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/60 hover:border-slate-600/60 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500/20 p-3 rounded-lg border border-orange-500/30">
                <Circle className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Remaining</p>
                <p className="text-2xl font-bold text-white">
                  {totalCount - completedCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-8 hover:bg-slate-800/60 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">Progress</h3>
            <span className="text-slate-400 text-sm">
              {totalCount > 0
                ? Math.round((completedCount / totalCount) * 100)
                : 0}
              %
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${
                  totalCount > 0 ? (completedCount / totalCount) * 100 : 0
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 max-w-md mx-auto">
                <div className="bg-slate-700/50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No tasks yet
                </h3>
                <p className="text-slate-400 mb-6">
                  Create your first task to get started on your journey!
                </p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  Create First Task
                </button>
              </div>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`group bg-slate-800/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:bg-slate-800/60 hover:scale-[1.02] hover:shadow-xl ${
                  task.isCompleted
                    ? 'border-green-500/30 hover:border-green-500/50'
                    : 'border-slate-700/50 hover:border-slate-600/60'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggleComplete(task.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      task.isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-slate-500 hover:border-slate-400'
                    }`}
                  >
                    {task.isCompleted && <Check className="w-4 h-4" />}
                  </button>

                  {/* Task Content */}
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

                  {/* Actions */}
                  <div className="flex items-center gap-2 transition-all duration-300">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all duration-300 hover:scale-110"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Create New Task</h3>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false)
                  setFormData({ name: '', description: '' })
                }}
                className="text-slate-400 hover:text-slate-200 transition-all duration-300 hover:rotate-90 hover:scale-110 p-1 rounded-full hover:bg-slate-700/50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Task Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 placeholder-slate-400 hover:bg-slate-600/80 focus:scale-105"
                  placeholder="Enter task name"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 placeholder-slate-400 hover:bg-slate-600/80 focus:scale-105 resize-none"
                  placeholder="Enter task description (optional)"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateTask}
                  disabled={!formData.name.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 disabled:hover:scale-100"
                >
                  Create Task
                </button>
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false)
                    setFormData({ name: '', description: '' })
                  }}
                  className="px-6 py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Edit Task</h3>
              <button
                onClick={() => {
                  setEditingTask(null)
                  setFormData({ name: '', description: '' })
                }}
                className="text-slate-400 hover:text-slate-200 transition-all duration-300 hover:rotate-90 hover:scale-110 p-1 rounded-full hover:bg-slate-700/50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Task Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 placeholder-slate-400 hover:bg-slate-600/80 focus:scale-105"
                  placeholder="Enter task name"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 placeholder-slate-400 hover:bg-slate-600/80 focus:scale-105 resize-none"
                  placeholder="Enter task description (optional)"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleUpdateTask}
                  disabled={!formData.name.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditingTask(null)
                    setFormData({ name: '', description: '' })
                  }}
                  className="px-6 py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
