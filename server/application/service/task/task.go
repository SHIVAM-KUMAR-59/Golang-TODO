package task

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/rs/zerolog"
	xerrors "shivam.com/server/application/errors"
	"shivam.com/server/application/service/internal/types"
	"shivam.com/server/application/service/types/entity"
)

type Service struct {
	logger         *zerolog.Logger
	taskRepository types.TaskRepository
}

func (s *Service) CreateTask(ctx context.Context, task entity.Task) (string, error) {
	
	name := task.Name
	description := task.Description
	userId := task.UserId
	if name == "" || description == "" || userId.String() == "" {
		s.logger.Error().Msg("name, description and userId are required")
		return "", xerrors.BadRequestError(ctx, errors.New("name, description and userId are required"))
	}

	createdTaskId, err := s.taskRepository.CreateTask(ctx, task)
	if err != nil {
		s.logger.Error().Msg("error creating task")
		return "", err
	}

	return createdTaskId, nil
}

func (s *Service) GetTask(ctx context.Context, taskId string) (entity.Task, error) {
	
	id, err := uuid.Parse(taskId)
	if err != nil {
		s.logger.Error().Msg("error parsing task id")
		return entity.Task{}, err
	}

	return s.taskRepository.GetTask(ctx, id)
}

func (s *Service) UpdateTask(ctx context.Context, task entity.Task) (entity.Task, error) {
	
	updatedTask, err := s.taskRepository.UpdateTask(ctx, task)
	if err != nil {
		s.logger.Error().Msg("error updating task")
		return entity.Task{}, err
	}

	return updatedTask, nil
}

func (s *Service) DeleteTask(ctx context.Context, taskId string) (error) {
	
	id, err := uuid.Parse(taskId)
	if err != nil {
		s.logger.Error().Msg("error parsing task id")
		return err
	}

	return s.taskRepository.DeleteTask(ctx, id)
}

func (s *Service) ListTasks(ctx context.Context, userId string) ([]entity.Task, error) {
	
	id, err := uuid.Parse(userId)
	if err != nil {
		s.logger.Error().Msg("error parsing user id")
		return nil, err
	}

	return s.taskRepository.ListTasks(ctx, id)
}


func NewService(ctx context.Context, taskRepository types.TaskRepository) *Service {
	return &Service{
		taskRepository: taskRepository,
		logger:         zerolog.Ctx(ctx),
	}
}