import { useMutation, useQuery } from '@connectrpc/connect-query'
import { TaskManagement } from '../../gen/es/application/models/pb/task_pb'

export function useCreateTask() {
  return useMutation(TaskManagement.method.createTask)
}

export function useListTasks(userId: string) {
  const response = useQuery(TaskManagement.method.listTasks, { userId: userId })
  return response
}

export function useDeleteTasks() {
  return useMutation(TaskManagement.method.deleteTask)
}

export function useUpdateTask() {
  return useMutation(TaskManagement.method.updateTask)
}
