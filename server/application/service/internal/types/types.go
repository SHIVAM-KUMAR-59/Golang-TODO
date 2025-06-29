package types

import (
	"context"

	"github.com/google/uuid"
	"shivam.com/server/application/service/types/entity"
)

type UserRepository interface {
	CreateUser(ctx context.Context, user entity.User) (string, error)
	DeleteUser(ctx context.Context, userId uuid.UUID) (error)
}

type TaskRepository interface {
	CreateTask(ctx context.Context, task entity.Task) (string, error)
	GetTask(ctx context.Context, taskId uuid.UUID) (entity.Task, error)
	UpdateTask(ctx context.Context, task entity.Task) (string, error)
	DeleteTask(ctx context.Context, taskId uuid.UUID) (error)
	ListTasks(ctx context.Context, userId uuid.UUID) ([]entity.Task, error)
}