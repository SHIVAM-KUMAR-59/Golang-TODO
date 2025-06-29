package types

import (
	"context"

	"shivam.com/server/application/service/types/entity"
)

type UserService interface {
	CreateUser(ctx context.Context, user entity.User) (string, error)
	DeleteUser(ctx context.Context, userId string) (error)
}

type TaskService interface {
	CreateTask(ctx context.Context, task entity.Task) (string, error)
	GetTask(ctx context.Context, taskId string) (entity.Task, error)
	UpdateTask(ctx context.Context, task entity.Task) (string, error)
	DeleteTask(ctx context.Context, taskId string) (error)
	ListTasks(ctx context.Context, userId string) ([]entity.Task, error)
}