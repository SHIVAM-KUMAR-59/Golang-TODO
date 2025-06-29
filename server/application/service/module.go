package service

import (
	"context"

	"shivam.com/server/application/service/internal/repository"
	"shivam.com/server/application/service/task"
	"shivam.com/server/application/service/types"
	"shivam.com/server/application/service/user"
)

func NewUserService(ctx context.Context) types.UserService {
	return user.NewService(ctx, repository.NewUserRepository(ctx))
}

func NewTaskService(ctx context.Context) types.TaskService {
	return task.NewService(ctx, repository.NewTaskRepository(ctx))
}