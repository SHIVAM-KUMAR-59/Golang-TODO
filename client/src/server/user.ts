import { useMutation } from '@connectrpc/connect-query'
import { UserManagement } from '../../gen/es/application/models/pb/user_pb'

export function useCreateUser() {
  return useMutation(UserManagement.method.createUser)
}

export function useDeleteUser() {
  return useMutation(UserManagement.method.deleteUser)
}
