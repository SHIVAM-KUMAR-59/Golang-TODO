package task

import (
	"context"

	"github.com/google/uuid"
	"github.com/rs/zerolog"
	xerrors "shivam.com/server/application/errors"
	"shivam.com/server/application/service/types/entity"
	"shivam.com/server/infra/database/postgres"
	"shivam.com/server/infra/database/postgres/gen"
)

type Repository struct {
	logger *zerolog.Logger
	db *gen.Queries
}

func (r *Repository) CreateTask(ctx context.Context, task entity.Task) (string, error) {
	taskId := uuid.New()
	createTaskParams := gen.CreateTaskParams {
		ID: taskId,
		Title: task.Name,
		Description: task.Description,
		UserID: task.UserId,
	}

	createdTask, err := r.db.CreateTask(ctx, createTaskParams)
	if err != nil {
		r.logger.Error().Msg("Error creating task")
		return "", err
	}

	return createdTask.ID.String(), nil
}

func (r *Repository) GetTask(ctx context.Context, taskId uuid.UUID) (entity.Task, error) {
	
	task, err := r.db.GetTask(ctx, taskId)
	if err != nil {
		r.logger.Error().Msg("Error fetching task")
		return entity.Task{}, xerrors.NotFoundError(ctx, err)
	}

	return r.mapToTaskEntity(task), nil
}

func (r *Repository) UpdateTask(ctx context.Context, task entity.Task) (entity.Task, error) {
	
	updateTaskParams := gen.UpdateTaskParams {
		ID: task.ID,
		Title: task.Name,
		Description: task.Description,
		IsCompleted: task.IsCompleted,
	}

	updatedTask, err := r.db.UpdateTask(ctx, updateTaskParams)
	if err != nil {
		r.logger.Error().Msg("Error updating task")
		return entity.Task{}, err
	}

	return r.mapToTaskEntity(updatedTask), nil
}

func (r *Repository) DeleteTask(ctx context.Context, taskId uuid.UUID) (error) {
	
	err := r.db.DeleteTask(ctx, taskId)
	if err != nil {
		r.logger.Error().Msg("Error deleting task")
		return err
	}

	return nil
}

func (r *Repository) ListTasks(ctx context.Context, userId uuid.UUID) ([]entity.Task, error) {
	
	tasks, err := r.db.ListTasks(ctx, userId)
	if err != nil {
		r.logger.Error().Msg("Error listing tasks")
		return nil, err
	}

	taskEntities := make([]entity.Task, len(tasks))
	for i, task := range tasks {
		taskEntities[i] = r.mapToTaskEntity(task)
	}

	return taskEntities, nil
}

func NewRepository(ctx context.Context) *Repository {
	return &Repository{
		logger: zerolog.Ctx(ctx),
		db:     gen.New(postgres.Ctx(ctx)),
	}
}