package user

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"shivam.com/server/application/service/internal/types"
	"shivam.com/server/application/service/types/entity"
)

type Service struct {
	userRepository types.UserRepository
}

func (s *Service) CreateUser(ctx context.Context, user entity.User) (string, error) {
	email := user.Email
	if email == "" {
		return "", errors.New("email is required")
	}

	password := user.Password
	if password == "" {
		return "", errors.New("password is required")
	}

	newUser := entity.User{
		ID:       uuid.New(),
		Name:     user.Name,
		Email:    email,
		Password: password,
	}

	userId, err := s.userRepository.CreateUser(ctx, newUser)
	if err != nil {
		return "", err
	}

	return userId, nil
}

func (s *Service) DeleteUser(ctx context.Context, userId string) (error) {
	if userId == "" {
		return errors.New("user id is required")
	}

	id, err := uuid.Parse(userId)
	if err != nil {
		return err
	}

	return s.userRepository.DeleteUser(ctx, id)
}

func NewService(userRepository types.UserRepository) *Service {
	return &Service{
		userRepository: userRepository,
	}
}